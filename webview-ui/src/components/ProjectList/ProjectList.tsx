import { PackageInfo } from "../../clients/nuget"
import { Project } from "../../contracts"

type ProjectListProps = {
  projects: Project[]
  selectedPackage: PackageInfo | null
  selectedVersion: string | null
}

const ProjectList = ({ selectedPackage, selectedVersion, projects }: ProjectListProps) => {
  if (!selectedPackage || !selectedVersion) {
    return null
  }

  return (
    <div className="project-list">
      {projects.map((p) => (
        <ProjectItem
          project={p}
          key={p.projectName}
          selectedPackage={selectedPackage}
          selectedVersion={selectedVersion}
        />
      ))}
    </div>
  )
}

type ProjectItemProps = {
  project: Project
  selectedPackage: PackageInfo
  selectedVersion: string
}

const ProjectItem = ({
  selectedPackage,
  selectedVersion,
  project: { packages, projectName }
}: ProjectItemProps) => {
  const installedPackage = packages.find((p) => p.id === selectedPackage.id)
  const versionBadge = installedPackage ? (
    <span className="version-badge">{installedPackage?.version}</span>
  ) : null

  const installed =
    installedPackage && installedPackage.version === selectedVersion ? (
      <a>
        <u>Uninstall</u>
      </a>
    ) : (
      <a>
        <u>Install</u>
      </a>
    )

  return (
    <div className="project-item">
      <input type="checkbox" />
      <span>{projectName}</span>
      {versionBadge}
      <span>{installed}</span>
    </div>
  )
}

export { ProjectList }
