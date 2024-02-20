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
    <span className="text-xs font-bold py-0 px-[2px] ml-1 bg-[var(--vscode-badge-background)] text-[var(--vscode-badge-foreground)]">
      {installedPackage?.version}
    </span>
  ) : null

  const installed =
    installedPackage && installedPackage.version === selectedVersion ? (
      <a
        className="m-1 text-[var(--vscode-editorLink-activeForeground)] hover:bg-[var(--vscode-editor-hoverHighlightBackground)] hover:cursor-pointer"
        onClick={() => uninstall([project])}>
        <u>Uninstall</u>
      </a>
    ) : (
      <a
        className="m-1 text-[var(--vscode-editorLink-activeForeground)] hover:bg-[var(--vscode-editor-hoverHighlightBackground)] hover:cursor-pointer"
        onClick={() => install([project])}>
        <u>Install</u>
      </a>
    )

  return (
    <div className="mb-1">
      <input
        className="p-1 border-[var(--vscode-input-border)] text-[var(--vscode-input-foreground)] bg-[var(--vscode-input-background)]"
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
