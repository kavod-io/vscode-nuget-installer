import { Command, Message } from "../contracts"

const mockPostMessage = (message: Command) => {
  console.log({ text: "mock VS Code API called", message })
  switch (message.command) {
    case "getSources":
      dispatchSetSourcesEvent(message.commandId)
      break

    case "getProjects":
      dispatchSetProjectsEvent(message.commandId)
      break

    default:
      break
  }
}

const dispatchSetSourcesEvent = (commandId: string) => {
  dispatchCustomEvent({
    command: "setSources",
    commandId,
    payload: [
      {
        name: "Nuget.org",
        url: "https://api.nuget.org/v3/index.json",
        credentials: null,
      },
      {
        name: "Other",
        url: "TODO",
        credentials: {
          username: "",
          password: "",
        },
      },
    ],
  })
}

const dispatchSetProjectsEvent = (commandId: string) => {
  dispatchCustomEvent({
    command: "setProjects",
    commandId,
    payload: [
      {
        projectName: "My Project1",
        path: "c:/users/loser",
        packages: [],
      },
      {
        projectName: "My Project2",
        path: "c:/users/loser",
        packages: [],
      },
      {
        projectName: "My Project3",
        path: "c:/users/loser",
        packages: [],
      },
      {
        projectName: "My Project4",
        path: "c:/users/loser",
        packages: [],
      },
    ],
  })
}

const dispatchCustomEvent = (payload: Message) => {
  const event = new CustomEvent("message")
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ;(event as any).data = payload
  window.dispatchEvent(event)
}

export { mockPostMessage }
