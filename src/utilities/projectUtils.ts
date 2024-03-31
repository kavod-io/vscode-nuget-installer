import { DOMParser } from "@xmldom/xmldom"
import * as fs from "fs"
import * as path from "path"
import * as vscode from "vscode"
import * as xpath from "xpath"
import { AddPackagesCommand, Project, RemovePackagesCommand } from "../contracts"

const loadProjects = async () => {
  const files = await vscode.workspace.findFiles("**/*.{csproj,fsproj,vbproj}")
  const projects: Project[] = files.map((x) => parseProject(x))
  projects.sort((a, b) => (a.path < b.path ? -1 : a.path > b.path ? 1 : 0))
  return projects
}

const parseProject = (projectUri: vscode.Uri): Project => {
  const projectContent = fs.readFileSync(projectUri.fsPath, "utf8")
  const document = new DOMParser().parseFromString(projectContent)
  const packagesReferences = xpath.select("//ItemGroup/PackageReference", document) as Node[]
  const project: Project = {
    path: projectUri.fsPath,
    projectName: path.basename(projectUri.fsPath),
    packages: [],
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  packagesReferences.forEach((p: any) => {
    let version = p.attributes.getNamedItem("Version")
    if (version) {
      version = version.value
    } else {
      version = xpath.select("string(Version)", p)
      if (!version) {
        version = "not specifed"
      }
    }
    const projectPackage = {
      id: p.attributes.getNamedItem("Include").value,
      version: version,
    }
    project.packages.push(projectPackage)
  })
  return project
}

const addPackage = (message: AddPackagesCommand) => addOrRemovePackages(message)

const removePackage = (message: RemovePackagesCommand) => addOrRemovePackages(message)

const addOrRemovePackages = async (message: AddPackagesCommand | RemovePackagesCommand) => {
  for (let i = 0; i < message.projects.length; i++) {
    const project = message.projects[i]
    const args = [message.command, project.path.replace(/\\/g, "/"), "package", message.packageId]

    if (message.command === "add") {
      args.push("-v")
      args.push(message.version)
      args.push("-s")
      args.push(message.source)
    }

    const task = new vscode.Task(
      { type: "dotnet", task: `dotnet ${message.command}` },
      vscode.TaskScope.Workspace,
      "nuget-project-installer",
      "dotnet",
      new vscode.ShellExecution("dotnet", args)
    )

    await executeBuildTask(task)
  }
}

/**
 * Executes a given task and returns a Promise that resolves when the task has completed.
 * See: https://stackoverflow.com/a/61703141/2301065
 */
const executeBuildTask = async (task: vscode.Task) => {
  const execution = await vscode.tasks.executeTask(task)

  return new Promise<void>((resolve) => {
    const disposable = vscode.tasks.onDidEndTask((e) => {
      if (e.execution === execution) {
        disposable.dispose()
        resolve()
      }
    })
  })
}

export { addPackage, loadProjects, removePackage }
