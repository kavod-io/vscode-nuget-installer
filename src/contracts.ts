/**
 * This is a definition for a Nuget source.  These are defined in the extension settings.
 */
export interface PackageSource {
  name: string

  /**
   * Service Index URL e.g. https://api.nuget.org/v3/index.json
   */
  url: string

  credentials: Credentials | null
}

export interface Credentials {
  username: string
  password: string
}

export type Message =
  | SetProjectsMessage
  | SetSourcesMessage
  | AddCompleteMessage
  | RemoveCompleteMessage

export interface SetProjectsMessage {
  command: "setProjects"
  payload: Project[]
  commandId: string
}

export interface SetSourcesMessage {
  command: "setSources"
  payload: PackageSource[]
  commandId: string
}

export interface AddCompleteMessage {
  command: "addCompleted"
  commandId: string
}

export interface RemoveCompleteMessage {
  command: "removeCompleted"
  commandId: string
}

export interface Project {
  path: string
  projectName: string
  packages: ProjectPackage[]
}

export interface ProjectPackage {
  id: string
  version: string
}

export type Command =
  | GetProjectCommand
  | GetSourcesCommand
  | AddPackagesCommand
  | RemovePackagesCommand

export interface GetProjectCommand {
  command: "getProjects"
  commandId: string
}

export interface GetSourcesCommand {
  command: "getSources"
  commandId: string
}

export interface AddPackagesCommand {
  command: "add"
  commandId: string
  source: string
  projects: Project[]
  packageId: string
  version: string
}

export interface RemovePackagesCommand {
  command: "remove"
  commandId: string
  projects: Project[]
  packageId: string
}
