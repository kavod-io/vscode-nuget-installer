import { CompositeProjectHandler } from "./CompositeProjectHandler"
import { dotNetProjectHandler } from "./DotNetProjectHandler"

const projectManager = new CompositeProjectHandler()

// register the internal .Net Project Handler.
projectManager.addHandler(dotNetProjectHandler)

export { projectManager }
