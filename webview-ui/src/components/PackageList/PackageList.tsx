import Loader from "../../Loader"
import { PackageInfo } from "../../clients/nuget"
import { Status } from "../../types"
import { PackageItem } from "./PackageItem"

type PackageListProps = {
  packages: PackageInfo[]
  packageStatus: Status
  loadMorePackages: () => void
  selectedPackage: PackageInfo | null
  updateSelectedPackage: (info: PackageInfo | null) => void
}

const PackageList = ({
  packages,
  packageStatus,
  //loadMorePackages,
  selectedPackage,
  updateSelectedPackage,
}: PackageListProps) => {
  if (packageStatus === "pending") {
    return <Loader className="flex items-center justify-center" />
  }

  if (packageStatus === "error") {
    return (
      <div>
        <h4>Error</h4>
      </div>
    )
  }

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
    <div className="col-start-1 row-start-2 overflow-y-auto">
      {packageItems}
      {/* TODO show load more button or item. */}
    </div>
  )
}

export { PackageList }
