import { Message, PackageSource, Project } from "../../contracts"
import { vscode } from "../../utilities/vscode"

// TODO we could probably do this better...
let commandCounter = 0
const sourcesCache: Record<string, Callbacks<PackageSource[]>> = {}
const projectsCache: Record<string, Callbacks<Project[]>> = {}

type Callbacks<T> = {
  resolve: (value: T) => void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  reject: (reason?: any) => void
}

const fetchSources = () => {
  return createPromise<PackageSource[]>(sourcesCache)
}

const createPromise = <T>(cache: Record<string, Callbacks<T>>): Promise<T> => {
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
      }
    }

    // TODO add timeout which calls reject function
  })

  vscode.postMessage({
    command: "getSources",
    commandId
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

export { fetchSources }
