import { useCallback, useState } from "react"
import { PackageInfo } from "../../clients/nuget"

const useSelectedPackage = () => {
  const [selectedPackage, setSelectedPackage] = useState<PackageInfo | null>(null)
  const [selectedVersion, setSelectedVersion] = useState<string | null>(null)

  const updateSelectedPackage = useCallback((nuget: PackageInfo | null) => {
    const newSelectedVersion = nuget?.version ?? null
    console.log({ message: "package changed", package: nuget, newSelectedVersion })
    setSelectedPackage(nuget)
    setSelectedVersion(newSelectedVersion)
  }, [])

  const updateSelectedVersion = useCallback((newVersion: string | null) => {
    setSelectedVersion(newVersion)
  }, [])

  return {
    selectedPackage,
    updateSelectedPackage,
    selectedVersion,
    updateSelectedVersion
  }
}

export { useSelectedPackage }
