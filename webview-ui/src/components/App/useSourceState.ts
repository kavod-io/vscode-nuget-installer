import { useState } from "react"
import { PackageSource } from "../../contracts"

const useSourceState = () => {
  const [currentSource, setCurrentSource] = useState<PackageSource | null>(null)
  const [sources /*setSources*/] = useState<PackageSource[]>([])

  const updateCurrentSource = (source: PackageSource | null) => {
    setCurrentSource(source)
  }

  return {
    sources,
    currentSource,
    updateCurrentSource
  }
}

export { useSourceState }
