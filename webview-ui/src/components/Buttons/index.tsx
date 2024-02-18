import { PackageInfo } from "../../clients/nuget"
import { Project } from "../../contracts"

type ButtonProps = {
  selectedProjects: Project[] | null
  selectedPackage: PackageInfo | null
  selectedVersion: string | null
}

const InstallButton = ({ selectedProjects, selectedPackage, selectedVersion }: ButtonProps) => {
  const canInstall =
    selectedProjects &&
    selectedProjects.length > 0 &&
    selectedProjects.every((p) => {
      const version = p.packages.find((p) => p.id === selectedPackage?.id)?.version
      return !version || (selectedVersion !== null && version !== selectedVersion)
    })

  return (
    <button
      disabled={!canInstall}
      onClick={() => {
        //install(selectedProjects)
      }}
    >
      Install
    </button>
  )
}

const UninstallButton = ({ selectedProjects, selectedPackage, selectedVersion }: ButtonProps) => {
  const canUninstall =
    selectedProjects &&
    selectedProjects.length > 0 &&
    selectedProjects.every((p) => {
      const version = p.packages.find((p) => p.id === selectedPackage?.id)?.version
      return version && version === selectedVersion
    })

  return (
    <button
      disabled={!canUninstall}
      onClick={() => {
        //uninstall(selectedProjects)
      }}
    >
      Uninstall
    </button>
  )
}

export { InstallButton, UninstallButton }
