import { PackageInfo } from "../../clients/nuget"
import { Project } from "../../contracts"

type InstallButtonProps = {
  selectedProjects: Project[] | null
  selectedPackage: PackageInfo | null
  selectedVersion: string | null
  install: () => void
}

const InstallButton = ({
  selectedProjects,
  selectedPackage,
  selectedVersion,
  install,
}: InstallButtonProps) => {
  const canInstall =
    selectedProjects &&
    selectedProjects.length > 0 &&
    selectedProjects.every((p) => {
      const version = p.packages.find((p) => p.id === selectedPackage?.id)?.version
      return !version || (selectedVersion !== null && version !== selectedVersion)
    })

  return (
    <button disabled={!canInstall} onClick={install}>
      Install
    </button>
  )
}

type UninstallButtonProps = {
  selectedProjects: Project[] | null
  selectedPackage: PackageInfo | null
  selectedVersion: string | null
  uninstall: () => void
}

const UninstallButton = ({
  selectedProjects,
  selectedPackage,
  selectedVersion,
  uninstall,
}: UninstallButtonProps) => {
  const canUninstall =
    selectedProjects &&
    selectedProjects.length > 0 &&
    selectedProjects.every((p) => {
      const version = p.packages.find((p) => p.id === selectedPackage?.id)?.version
      return version && version === selectedVersion
    })

  return (
    <button disabled={!canUninstall} onClick={uninstall}>
      Uninstall
    </button>
  )
}

export { InstallButton, UninstallButton }
