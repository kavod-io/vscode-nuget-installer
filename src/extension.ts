import { ProjectHandler, NugetInstallerExtension } from "@kavod-io/vscode-nuget-installer-api"
import { commands, ExtensionContext } from "vscode"
import { NugetPackagePanel } from "./panels/NugetPackagePanel"
import { projectManager } from "./projects"

export function activate(context: ExtensionContext) {
  const showNugetGuiCommand = commands.registerCommand("vscode-nuget-installer.showGui", () => {
    NugetPackagePanel.render(context.extensionUri)
  })

  context.subscriptions.push(showNugetGuiCommand)

  // return an object with methods that can be accessed by other extensions
  return {
    registerProjectHandler: (handler: ProjectHandler) => projectManager.addHandler(handler),
  } as NugetInstallerExtension
}
