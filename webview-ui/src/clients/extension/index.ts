import {
  AddPackagesCommand,
  Command,
  GetProjectCommand,
  GetSourcesCommand,
  Message,
  PackageSource,
  Project,
  RemovePackagesCommand,
} from "../../contracts"
import { vscode } from "../../utilities/vscode"

// TODO we could probably do this better...
let commandCounter = 0
const sourcesCache: Record<string, Callbacks<PackageSource[]>> = {}
const projectsCache: Record<string, Callbacks<Project[]>> = {}
const installCache: Record<string, Callbacks<void>> = {}
const uninstallCache: Record<string, Callbacks<void>> = {}

type Callbacks<T> = {
  resolve: (value: T) => void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  reject: (reason?: any) => void
}

const fetchSources = () =>
  createPromise<PackageSource[]>(sourcesCache, { command: "getSources" } as GetSourcesCommand)

const fetchProjects = () =>
  createPromise<Project[]>(projectsCache, { command: "getProjects" } as GetProjectCommand)

const installPackage = (source: string, projects: Project[], packageId: string, version: string) =>
  createPromise<void>(uninstallCache, {
    command: "add",
    source,
    projects,
    packageId,
    version,
  } as AddPackagesCommand)

const uninstallPackage = (projects: Project[], packageId: string) =>
  createPromise<void>(installCache, {
    command: "remove",
    projects,
    packageId,
  } as RemovePackagesCommand)

const createPromise = <T>(
  cache: Record<string, Callbacks<T>>,
  command: Exclude<Command, "commandId">
): Promise<T> => {
  console.log(cache)
  const commandId = `${commandCounter++}`

  const promise = new Promise<T>((res, rej) => {
    cache[commandId] = {
      resolve: (x) => {
        delete cache[commandId]
        res(x)
      },
      reject: (err) => {
        delete cache[commandId]
        rej(err)
      },
    }

    // TODO add timeout which calls reject function
  })

  vscode.postMessage({
    ...command,
    commandId,
  })

  return promise
}

let eventListenerAdded = false

if (!eventListenerAdded) {
  window.addEventListener("message", (event: MessageEvent<Message>) => {
    const message = event.data
    switch (message.command) {
      case "setProjects": {
        const cb = projectsCache[message.commandId]
        if (cb) {
          cb.resolve(message.payload)
        }
        break
      }

      case "setSources": {
        const cb = sourcesCache[message.commandId]
        if (cb) {
          cb.resolve(message.payload)
        }
        break
      }
    }
  })
  eventListenerAdded = true
}

export { fetchSources, fetchProjects, installPackage, uninstallPackage }
