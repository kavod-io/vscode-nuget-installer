import { Project } from "@kavod-io/vscode-nuget-installer-api"
import { useCallback, useEffect, useState } from "react"
import { fetchProjects, installPackage, uninstallPackage } from "../../clients/extension"
import { PackageInfo } from "../../clients/nuget"

const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [selectedProjectIds, setSelectedProjectIds] = useState<string[]>([])

  const refreshProjects = useCallback(async () => {
    const results = await fetchProjects()
    setProjects(results)
  }, [])

  useEffect(() => {
    refreshProjects()
  }, [refreshProjects])

  const updateSelectedProject = useCallback(
    (projectToUpdate: Project) => {
      setSelectedProjectIds((ids) => {
        const newValue = ids.some((id) => id === projectToUpdate.projectName)
          ? ids.filter((p) => p !== projectToUpdate.projectName)
          : [
              ...ids,
              projects.find((p) => p.projectName === projectToUpdate.projectName)!.projectName,
            ]

        console.log({
          message: "updating selected projects",
          projectToUpdate,
          oldValue: ids,
          newValue,
        })

        return newValue
      })
    },
    [projects]
  )

  const handleInstall = useCallback(
    async (source: string, projects: Project[], nuget: PackageInfo, version: string) => {
      await installPackage(source, projects, nuget.id, version)
      await refreshProjects()
    },
    [refreshProjects]
  )

  const handleUninstall = useCallback(
    async (projects: Project[], nuget: PackageInfo) => {
      await uninstallPackage(projects, nuget.id)
      await refreshProjects()
    },
    [refreshProjects]
  )

  const selectedProjects = projects.filter((p) =>
    selectedProjectIds.some((sp) => sp === p.projectName)
  )

  return {
    projects,
    selectedProjects,
    updateSelectedProject,
    installPackage: handleInstall,
    uninstallPackage: handleUninstall,
  }
}

export { useProjects }
