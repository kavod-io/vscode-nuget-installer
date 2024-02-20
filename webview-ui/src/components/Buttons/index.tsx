import { PackageInfo } from "../../clients/nuget"
import { Project } from "../../contracts"

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
    return <button disabled>Install</button>
  }

  const projectsToInstallTo = selectedProjects.filter((p) => {
    const existing = p.packages.find((p) => p.id === selectedPackage.id)
    return !existing || existing.version !== selectedVersion
  })

  return (
    <button
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
    return <button disabled>Install</button>
  }

  const projectsToUninstall = selectedProjects.filter((p) => {
    const existing = p.packages.find((p) => p.id === selectedPackage.id)
    return existing
  })

  return (
    <button
      disabled={projectsToUninstall.length === 0}
      onClick={() => uninstall(projectsToUninstall)}>
      Uninstall
    </button>
  )
}

export { InstallButton, UninstallButton }
