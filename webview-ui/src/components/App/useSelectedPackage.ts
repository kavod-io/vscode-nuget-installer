import { useCallback, useState } from "react"
import { PackageInfo } from "../../clients/nuget"

const useSelectedPackage = () => {
  const [selectedPackage, setSelectedPackage] = useState<PackageInfo | null>(null)
  const [selectedVersion /* , setSelectedVersion*/] = useState<string | null>(null)

  const updateSelectedPackage = useCallback((nuget: PackageInfo | null) => {
    setSelectedPackage(nuget)
  }, [])

  return {
    selectedPackage,
    updateSelectedPackage,
    selectedVersion
  }
}

export { useSelectedPackage }
