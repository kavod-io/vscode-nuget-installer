import { Project } from "@kavod-io/vscode-nuget-installer-api"
import { PackageInfo } from "../../clients/nuget"

type InstallButtonProps = {
  selectedProjects: Project[] | null
  selectedPackage: PackageInfo | null
  selectedVersion: string | null
  install: (projects: Project[]) => void
}

const InstallButton = ({
  selectedProjects,
  selectedPackage,
  selectedVersion,
  install,
}: InstallButtonProps) => {
  if (!selectedPackage || !selectedVersion) {
    return null
  }

  if (!selectedProjects) {
    return (
      <button
        className="bg-[var(--vscode-button-background)] text-[var(--vscode-button-foreground)] px-1 py-2 border-0 hover:cursor-pointer hover:bg-[var(--vscode-button-hoverBackground)] disabled:pointer-events-none disabled:bg-[var(--vscode-activityBar-background)] disabled:text-[var(--vscode-activityBar-inactiveForeground)]"
        disabled>
        Install
      </button>
    )
  }

  const projectsToInstallTo = selectedProjects.filter((p) => {
    const existing = p.packages.find((p) => p.id === selectedPackage.id)
    return !existing || existing.version !== selectedVersion
  })

  return (
    <button
      className="bg-[var(--vscode-button-background)] text-[var(--vscode-button-foreground)] px-1 py-2 border-0 hover:cursor-pointer hover:bg-[var(--vscode-button-hoverBackground)] disabled:pointer-events-none disabled:bg-[var(--vscode-activityBar-background)] disabled:text-[var(--vscode-activityBar-inactiveForeground)]"
      disabled={projectsToInstallTo.length === 0}
      onClick={() => install(projectsToInstallTo)}>
      Install
    </button>
  )
}

type UninstallButtonProps = {
  selectedProjects: Project[] | null
  selectedPackage: PackageInfo | null
  uninstall: (projects: Project[]) => void
}

const UninstallButton = ({
  selectedProjects,
  selectedPackage,
  uninstall,
}: UninstallButtonProps) => {
  if (!selectedPackage) {
    return null
  }

  if (!selectedProjects) {
    return (
      <button
        className="bg-[var(--vscode-button-background)] text-[var(--vscode-button-foreground)] px-1 py-2 border-0 hover:cursor-pointer hover:bg-[var(--vscode-button-hoverBackground)] disabled:pointer-events-none disabled:bg-[var(--vscode-activityBar-background)] disabled:text-[var(--vscode-activityBar-inactiveForeground)]"
        disabled>
        Install
      </button>
    )
  }

  const projectsToUninstall = selectedProjects.filter((p) => {
    const existing = p.packages.find((p) => p.id === selectedPackage.id)
    return existing
  })

  return (
    <button
      className="bg-[var(--vscode-button-background)] text-[var(--vscode-button-foreground)] px-1 py-2 border-0 hover:cursor-pointer hover:bg-[var(--vscode-button-hoverBackground)] disabled:pointer-events-none disabled:bg-[var(--vscode-activityBar-background)] disabled:text-[var(--vscode-activityBar-inactiveForeground)]"
      disabled={projectsToUninstall.length === 0}
      onClick={() => uninstall(projectsToUninstall)}>
      Uninstall
    </button>
  )
}

export { InstallButton, UninstallButton }
