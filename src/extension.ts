import { commands, ExtensionContext } from "vscode"
import { NugetPackagePanel } from "./panels/NugetPackagePanel"

export function activate(context: ExtensionContext) {
  const showNugetGuiCommand = commands.registerCommand("vscode-nuget-installer.showGui", () => {
    NugetPackagePanel.render(context.extensionUri)
  })

  context.subscriptions.push(showNugetGuiCommand)
}
