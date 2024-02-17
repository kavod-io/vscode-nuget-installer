import { useEffect, useState } from "react"
import { Project } from "../../contracts"
import { fetchProjects } from "../../clients/extension"

const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    const initializeSources = async () => {
      const sources = await fetchProjects()
      setProjects(sources)
    }
    initializeSources()
  }, [])

  return {
    projects
  }
}

export { useProjects }
