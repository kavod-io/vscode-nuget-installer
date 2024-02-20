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

  const classNames = isSelected
    ? "bg-[var(--vscode-list-activeSelectionBackground)] text-[var(--vscode-list-activeSelectionForeground)]"
    : ""

  return (
    <div
      className={`grid grid-cols-[60px,auto,60px] grid-rows-[20px,auto] gap-1 h-[60px] m-[3px] overflow-hidden hover:cursor-pointer hover:bg-[var(--vscode-list-hoverBackground)] hover:text-[var(--vscode-list-hoverForeground)] ${classNames}`}
      onClick={handleClick}>
      <img className="row-start-1 row-end-3 h-[50px] w-[50px] m-1" src={nuget.iconUrl} />

      <div className="header">
        <span className="col-start-2 col-end-3 overflow-hidden">{nuget.id}</span>
        <span> by {nuget.authors}</span>
      </div>

      <div className="col-start-3 mr-1 text-right overflow-hidden overflow-ellipsis">
        <span>{nuget.version}</span>
      </div>
      <div className="description">{nuget.description}</div>
    </div>
  )
}

export { PackageItem }
