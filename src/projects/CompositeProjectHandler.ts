import { AddPackagesCommand, RemovePackagesCommand } from "@kavod-io/vscode-nuget-installer-api"
import { ProjectHandler } from "."

class CompositeProjectHandler implements ProjectHandler {
  private handlers: ProjectHandler[] = []

  public addHandler(handler: ProjectHandler) {
    this.handlers.push(handler)
  }

  public async loadProjects() {
    const result = await Promise.all(this.handlers.map((x) => x.loadProjects()))
    return result.flatMap((x) => x)
  }

  public async addPackage(message: AddPackagesCommand) {
    this.handlers.forEach((x) => {
      // find the projects that belong to the current handler.
      x.addPackage(message)
    })
  }

  public async removePackage(message: RemovePackagesCommand) {
    this.handlers.forEach((x) => {
      // find the projects that belong to the current handler.
      x.removePackage(message)
    })
  }

  public dispose() {
    this.handlers.forEach((x) => {
      try {
        x.dispose()
      } catch (error) {
        console.error("Failed to dispose of child project handler", error)
      }
    })
  }
}

export { CompositeProjectHandler }
