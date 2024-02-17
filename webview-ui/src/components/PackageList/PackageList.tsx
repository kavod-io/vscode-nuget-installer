import { PackageInfo } from "../../clients/nuget"
import { PackageItem } from "./PackageItem"

type PackageListProps = {
  packages: PackageInfo[]
  loadMorePackages: () => void
  selectedPackage: PackageInfo | null
  updateSelectedPackage: (info: PackageInfo | null) => void
}

const PackageList = ({
  packages,
  //loadMorePackages,
  selectedPackage,
  updateSelectedPackage
}: PackageListProps) => {
  if (!packages || packages.length === 0) {
    return <h3>No packages found</h3>
  }

  // TODO handle other states

  const packageItems = packages.map((p) => (
    <PackageItem
      nuget={p}
      key={p.id}
      updateSelectedPackage={updateSelectedPackage}
      selectedPackage={selectedPackage}
    />
  ))

  return (
    <div className="package-list">
      {packageItems}
      {/* TODO show load more button or item. */}
    </div>
  )
}

export { PackageList }
