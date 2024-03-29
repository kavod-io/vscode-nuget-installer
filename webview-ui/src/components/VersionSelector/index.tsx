import { PackageInfo } from "../../clients/nuget"

type VersionSelectorProps = {
  selectedPackage: PackageInfo | null
  selectedVersion: string | null
  updateSelectedVersion: (newVersion: string | null) => void
}

const VersionSelector = ({
  selectedPackage,
  selectedVersion,
  updateSelectedVersion,
}: VersionSelectorProps) => {
  if (!selectedPackage) {
    return null
  }

  const options = selectedPackage.versions.reverse().map((v) => (
    <option key={v.version} value={v.version}>
      {v.version}
    </option>
  ))

  return (
    <select
      className="p-1 text-[var(--vscode-dropdown-foreground)] bg-[var(--vscode-dropdown-background)]"
      onChange={(e) => updateSelectedVersion(e.target.value)}
      value={selectedVersion ?? ""}>
      {options}
    </select>
  )
}

export { VersionSelector }
