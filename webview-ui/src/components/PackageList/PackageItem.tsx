import { useCallback } from "react"
import { PackageInfo } from "../../clients/nuget"

type PackageItemProps = {
  nuget: PackageInfo
  selectedPackage: PackageInfo | null
  updateSelectedPackage: (info: PackageInfo | null) => void
}

const PackageItem = ({ nuget, selectedPackage, updateSelectedPackage }: PackageItemProps) => {
  const handleClick = useCallback(() => {
    updateSelectedPackage(nuget)
  }, [nuget, updateSelectedPackage])

  const isSelected = nuget.id === selectedPackage?.id
  const classNames = isSelected ? "package-item selected" : "package-item"

  return (
    <div className={classNames} onClick={handleClick}>
      <img src={nuget.iconUrl} />
      <div className="header">
        <span className="title">{nuget.id}</span>
        <span> by {nuget.authors}</span>
      </div>
      <div className="version">
        <span>{nuget.version}</span>
      </div>
      <div className="description">{nuget.description}</div>
    </div>
  )
}

export { PackageItem }
