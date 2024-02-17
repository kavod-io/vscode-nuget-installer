import { useEffect, useState } from "react"
import { PackageSource } from "../../contracts"
import { fetchSources } from "../../clients/extension"

const useSourceState = () => {
  const [currentSource, setCurrentSource] = useState<PackageSource | null>(null)
  const [sources, setSources] = useState<PackageSource[]>([])

  useEffect(() => {
    const initializeSources = async () => {
      const sources = await fetchSources()
      setSources(sources)
    }
    initializeSources()
  }, [])

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
