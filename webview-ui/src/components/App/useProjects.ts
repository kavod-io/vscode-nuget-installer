import { useEffect, useState } from "react"
import { Project } from "../../contracts"
import { fetchProjects } from "../../clients/extension"

const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [selectedProjects, setSelectedProjects] = useState<Project[]>([])

  useEffect(() => {
    const initializeSources = async () => {
      const sources = await fetchProjects()
      setProjects(sources)
    }
    initializeSources()
  }, [])

  const updateSelectedProjects = (updatedProjects: Project[]) => {
    setSelectedProjects(updatedProjects)
  }

  return {
    projects,
    selectedProjects,
    updateSelectedProjects
  }
}

export { useProjects }
