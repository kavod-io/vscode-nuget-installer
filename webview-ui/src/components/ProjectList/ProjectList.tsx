import { FC } from "react"
import { PackageInfo } from "../../clients/nuget"
import { Project } from "../../contracts"
import { ProjectItem } from "./ProjectItem"

interface ProjectListProps {
  projects: Project[]
  selectedProjects: Project[]
  updateSelectedProjects: (projectToUpdate: Project, select: boolean) => void

  selectedPackage: PackageInfo | null
  selectedVersion: string | null

  install: (projects: Project[]) => Promise<void>
  uninstall: (projects: Project[]) => Promise<void>
}

const ProjectList: FC<ProjectListProps> = ({
  projects,
  selectedProjects,
  updateSelectedProjects,
  selectedPackage,
  selectedVersion,
  install,
  uninstall,
}) => {
  if (!selectedPackage || !selectedVersion) {
    return null
  }

  const isSelected = (project: Project): boolean => {
    return selectedProjects.some((p) => projectsEqual(p, project))
  }

  return (
    <div className="border-solid border-x-0 border-y-[1px] border-y-[var(--vscode-sideBar-border)]">
      {projects.map((p) => (
        <ProjectItem
          project={p}
          selectedPackage={selectedPackage}
          selectedVersion={selectedVersion}
          isSelected={isSelected(p)}
          updateSelectedProjects={updateSelectedProjects}
          key={p.projectName}
          install={install}
          uninstall={uninstall}
        />
      ))}
    </div>
  )
}

// TODO this may not be the best way to match projects going forward.
export const projectsEqual = (project1: Project, project2: Project): boolean =>
  project1.projectName === project2.projectName

export { ProjectList }
