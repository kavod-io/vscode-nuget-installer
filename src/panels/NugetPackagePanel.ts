import { Disposable, Uri, ViewColumn, Webview, WebviewPanel, window } from "vscode"
import { Command, Message } from "../contracts"
import { getNonce } from "../utilities/getNonce"
import { getSources } from "../utilities/getSources"
import { getUri } from "../utilities/getUri"
import { addPackage, loadProjects, removePackage } from "../utilities/projectUtils"

export class NugetPackagePanel {
  public static currentPanel: NugetPackagePanel | undefined
  private readonly _panel: WebviewPanel
  private _disposables: Disposable[] = []

  /**
   * The NugetPackagePanel class private constructor (called only from the render method).
   *
   * @param panel A reference to the webview panel
   * @param extensionUri The URI of the directory containing the extension
   */
  private constructor(panel: WebviewPanel, extensionUri: Uri) {
    this._panel = panel

    // Set an event listener to listen for when the panel is disposed (i.e. when the user closes
    // the panel or when the panel is closed programmatically)
    this._panel.onDidDispose(() => this.dispose(), null, this._disposables)

    // Set the HTML content for the webview panel
    this._panel.webview.html = this._getWebviewContent(this._panel.webview, extensionUri)

    // Set an event listener to listen for messages passed from the webview context
    this._setWebviewMessageListener(this._panel.webview)

    panel.iconPath = Uri.joinPath(extensionUri, "src", "resources", "favicon-32x32.png")
  }

  /**
   * Renders the current webview panel if it exists otherwise a new webview panel
   * will be created and displayed.
   *
   * @param extensionUri The URI of the directory containing the extension.
   */
  public static render(extensionUri: Uri) {
    if (NugetPackagePanel.currentPanel) {
      // If the webview panel already exists reveal it
      NugetPackagePanel.currentPanel._panel.reveal(ViewColumn.One)
    } else {
      const panel = window.createWebviewPanel(
        "showNugetPackageManager",
        "Nuget Package Manager",
        ViewColumn.One,
        {
          enableScripts: true,
          localResourceRoots: [
            Uri.joinPath(extensionUri, "out"),
            Uri.joinPath(extensionUri, "webview-ui/build"),
          ],
        }
      )

      NugetPackagePanel.currentPanel = new NugetPackagePanel(panel, extensionUri)
    }
  }

  /**
   * Cleans up and disposes of webview resources when the webview panel is closed.
   */
  public dispose() {
    NugetPackagePanel.currentPanel = undefined

    this._panel.dispose()

    while (this._disposables.length) {
      const disposable = this._disposables.pop()
      if (disposable) {
        disposable.dispose()
      }
    }
  }

  /**
   * Defines and returns the HTML that should be rendered within the webview panel.
   *
   * @remarks This is also the place where references to the React webview build files
   * are created and inserted into the webview HTML.
   *
   * @param webview A reference to the extension webview
   * @param extensionUri The URI of the directory containing the extension
   * @returns A template string literal containing the HTML that should be
   * rendered within the webview panel
   */
  private _getWebviewContent(webview: Webview, extensionUri: Uri) {
    const stylesUri = getUri(webview, extensionUri, ["webview-ui", "build", "assets", "index.css"])
    const scriptUri = getUri(webview, extensionUri, ["webview-ui", "build", "assets", "index.js"])
    const nonce = getNonce()

    return /*html*/ `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource}; script-src 'nonce-${nonce}';connect-src *; img-src *;">
          <link rel="stylesheet" type="text/css" href="${stylesUri}">
          <title>Nuget Package Manager</title>
        </head>
        <body>
          <div id="root"></div>
          <script type="module" nonce="${nonce}" src="${scriptUri}"></script>
        </body>
      </html>
    `
  }

  /**
   * Sets up an event listener to listen for messages passed from the webview context and
   * executes code based on the message that is recieved.
   *
   * @param webview A reference to the extension webview
   * @param context A reference to the extension context
   */
  private _setWebviewMessageListener(webview: Webview) {
    webview.onDidReceiveMessage(
      async (command: Command) => {
        console.log({ message: "received command from frontend", command })
        const { commandId } = command
        switch (command.command) {
          case "getProjects": {
            // TODO load projects from multiple providers.
            const projects = await loadProjects()
            postMessage(webview, {
              command: "setProjects",
              commandId,
              payload: projects.sort((a, b) => (a.path < b.path ? -1 : a.path > b.path ? 1 : 0)),
            })
            break
          }

          case "getSources": {
            const payload = await getSources()
            postMessage(webview, {
              command: "setSources",
              commandId,
              payload,
            })
            break
          }

          case "add": {
            await addPackage(command)
            postMessage(webview, {
              command: "addCompleted",
              commandId,
            })
            break
          }

          case "remove": {
            await removePackage(command)
            postMessage(webview, {
              command: "removeCompleted",
              commandId,
            })
            break
          }

          default:
            break
        }
      },
      undefined,
      this._disposables
    )
  }
}

const postMessage = (panel: Webview, message: Message) => {
  panel.postMessage(message)
}
