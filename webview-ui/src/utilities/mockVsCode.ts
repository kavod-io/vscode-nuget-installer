import { AddPackagesCommand, Command, Message, Project, RemovePackagesCommand } from "../contracts"

let projectData: Project[] = [
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
]

const mockPostMessage = (message: Command) => {
  console.log({ text: "mock VS Code API called", message })
  switch (message.command) {
    case "getSources":
      dispatchSetSourcesEvent(message.commandId)
      break

    case "getProjects":
      dispatchSetProjectsEvent(message.commandId)
      break

    case "add":
      handleAddPackage(message)
      break

    case "remove":
      handleRemovePackage(message)
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
    payload: projectData,
  })
}

// Note: React will perform a shallow comparison of our projectData so we need to update it immutably
const handleAddPackage = ({ projects, packageId, version, commandId }: AddPackagesCommand) => {
  projectData = projectData.map((p) => {
    if (projects.some((x) => x.projectName === p.projectName)) {
      return {
        ...p,
        packages: [
          ...p.packages,
          {
            id: packageId,
            version: version,
          },
        ],
      }
    }
    return p
  })

  setTimeout(() => {
    dispatchCustomEvent({
      command: "addCompleted",
      commandId,
    })
  }, 1000)
}

// Note: React will perform a shallow comparison of our projectData so we need to update it immutably
const handleRemovePackage = ({ projects, packageId, commandId }: RemovePackagesCommand) => {
  projectData = projectData.map((p) => {
    if (projects.some((x) => x.projectName === p.projectName)) {
      return {
        ...p,
        packages: p.packages.filter((x) => x.id !== packageId),
      }
    }
    return p
  })

  setTimeout(() => {
    dispatchCustomEvent({
      command: "removeCompleted",
      commandId,
    })
  }, 1000)
}

const dispatchCustomEvent = (payload: Message) => {
  const event = new CustomEvent("message")
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ;(event as any).data = payload
  window.dispatchEvent(event)
}

export { mockPostMessage }
