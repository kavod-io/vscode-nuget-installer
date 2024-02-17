import { PackageInfo } from "../../clients/nuget"
import { Project } from "../../contracts"

type ProjectListProps = {
  projects: Project[]
  selectedPackage: PackageInfo | null
  selectedVersion: string | null
}

const ProjectList = ({ selectedPackage, selectedVersion, projects }: ProjectListProps) => {
  if (!selectedPackage) {
    return null
  }

  const ProjectItem = ({ project: { projectName, packages } }: { project: Project }) => {
    const installed = packages.some(
      (p) => p.id === selectedPackage.id && p.version === selectedVersion
    ) ? (
      <a>Uninstall</a>
    ) : (
      <a>Install</a>
    )

    return (
      <div className="project-item">
        <input type="checkbox" />
        <span>{projectName}</span>
        <span>{installed}</span>
      </div>
    )
  }

  const packageName = "**Package Name**"
  const author = "**Author**"
  return (
    <>
      <div className="header">
        <span className="package-name">{packageName}</span>
        <span className="author">{` by ${author}`}</span>
      </div>

      <div className="project-list">
        {projects.map((p) => (
          <ProjectItem project={p} key={p.projectName} />
        ))}
      </div>
    </>
  )
}

export { ProjectList }
