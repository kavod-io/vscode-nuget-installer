import { useCallback, useEffect, useState } from "react"
import { fetchProjects, installPackage, uninstallPackage } from "../../clients/extension"
import { PackageInfo } from "../../clients/nuget"
import { Project } from "../../contracts"

const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [selectedProjects, setSelectedProjects] = useState<Project[]>([])

  const refreshProjects = useCallback(async () => {
    const results = await fetchProjects()
    setProjects(results)
  }, [])

  useEffect(() => {
    refreshProjects()
  }, [refreshProjects])

  const updateSelectedProject = useCallback((projectToUpdate: Project) => {
    setSelectedProjects((x) => {
      const newValue = x.some((p) => p.projectName === projectToUpdate.projectName)
        ? x.filter((p) => p.projectName !== projectToUpdate.projectName)
        : [...x, projectToUpdate]

      console.log({
        message: "updating selected projects",
        projectToUpdate,
        oldValue: x,
        newValue,
      })

      return newValue
    })
  }, [])

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

  return {
    projects,
    selectedProjects,
    updateSelectedProject,
    installPackage: handleInstall,
    uninstallPackage: handleUninstall,
  }
}

export { useProjects }
