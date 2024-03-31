import {
  AddPackagesCommand,
  Project,
  RemovePackagesCommand,
} from "@kavod-io/vscode-nuget-installer-api"
import { CompositeProjectHandler } from "./CompositeProjectHandler"
import { dotNetProjectHandler } from "./DotNetProjectHandler"

// TODO consider an event emitter that can notify of project changes.
export interface ProjectHandler {
  loadProjects: () => Promise<Project[]>
  addPackage: (message: AddPackagesCommand) => Promise<void>
  removePackage: (message: RemovePackagesCommand) => Promise<void>
  dispose: () => void
}

const projectManager = new CompositeProjectHandler()

// register the internal .Net Project Handler.
projectManager.addHandler(dotNetProjectHandler)

export { projectManager }
