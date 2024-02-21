import { useCallback } from "react"
import { PackageInfo } from "../../clients/nuget"

type PackageItemProps = {
  nuget: PackageInfo
  selectedPackage: PackageInfo | null
  updateSelectedPackage: (info: PackageInfo | null) => void
}

const defaultIconUrl = "https://www.nuget.org/Content/gallery/img/default-package-icon.svg"

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
      className={`grid grid-cols-[60px,auto,60px] grid-rows-[20px,auto] gap-x-1 h-14 my-1 overflow-hidden hover:cursor-pointer hover:bg-[var(--vscode-list-hoverBackground)] hover:text-[var(--vscode-list-hoverForeground)] ${classNames}`}
      onClick={handleClick}>
      <img className="row-start-1 row-end-3 h-14 w-14" src={nuget.iconUrl ?? defaultIconUrl} />

      <div className="header">
        <span className="text-base font-bold col-start-2 col-end-3 overflow-ellipsis">
          {nuget.id}
        </span>
        <span> by {nuget.authors}</span>
      </div>

      <div className="col-start-3 mr-1 text-right overflow-hidden overflow-ellipsis">
        <span>{nuget.version}</span>
      </div>
      <div className="overflow-ellipsis">{nuget.description}</div>
    </div>
  )
}

export { PackageItem }
