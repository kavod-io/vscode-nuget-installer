import { useState } from "react"
import { PackageInfo } from "../../clients/nuget"

const useSelectedPackage = () => {
  const [selectedPackage /* , setSelectedPackage*/] = useState<PackageInfo | null>(null)
  const [selectedVersion /* , setSelectedVersion*/] = useState<string | null>(null)

  return {
    selectedPackage,
    selectedVersion
  }
}

export { useSelectedPackage }
