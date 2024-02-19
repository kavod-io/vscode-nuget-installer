import { FC } from "react"
import { PackageInfo } from "../../clients/nuget"
import { Project } from "../../contracts"

interface ProjectItemProps {
  project: Project
  isSelected: boolean
  updateSelectedProjects: (projectToUpdate: Project, select: boolean) => void

  selectedPackage: PackageInfo
  selectedVersion: string

  install: (projects: Project[]) => Promise<void>
  uninstall: (projects: Project[]) => Promise<void>
}

const ProjectItem: FC<ProjectItemProps> = ({
  selectedPackage,
  selectedVersion,
  project,
  isSelected,
  updateSelectedProjects,
  install,
  uninstall,
}) => {
  const { packages, projectName } = project
  const installedPackage = packages.find((p) => p.id === selectedPackage.id)
  const versionBadge = installedPackage ? (
    <span className="version-badge">{installedPackage?.version}</span>
  ) : null

  const installed =
    installedPackage && installedPackage.version === selectedVersion ? (
      <a onClick={() => uninstall([project])}>
        <u>Uninstall</u>
      </a>
    ) : (
      <a onClick={() => install([project])}>
        <u>Install</u>
      </a>
    )

  return (
    <div className="project-item">
      <input
        type="checkbox"
        checked={isSelected}
        onChange={() => updateSelectedProjects(project, !isSelected)}
      />
      <span>{projectName}</span>
      {versionBadge}
      <span>{installed}</span>
    </div>
  )
}

export { ProjectItem }
