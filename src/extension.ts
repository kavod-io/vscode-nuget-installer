import { commands, ExtensionContext } from "vscode"
import { NugetPackagePanel } from "./panels/NugetPackagePanel"

export function activate(context: ExtensionContext) {
  // Create the show hello world command
  const showNugetGuiCommand = commands.registerCommand(
    "vscode-nuget-package-manager.showGui",
    () => {
      NugetPackagePanel.render(context.extensionUri)
    }
  )

  // Add command to the extension context
  context.subscriptions.push(showNugetGuiCommand)
}
