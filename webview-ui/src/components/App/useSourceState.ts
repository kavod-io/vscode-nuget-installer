import { useCallback, useEffect, useState } from "react"
import { PackageSource } from "../../contracts"
import { fetchSources } from "../../clients/extension"

const useSourceState = () => {
  const [currentSource, setCurrentSource] = useState<PackageSource | null>(null)
  const [sources, setSources] = useState<PackageSource[]>([])

  useEffect(() => {
    const initializeSources = async () => {
      const sources = await fetchSources()
      setSources(sources)
      if (sources && sources.length > 0) {
        setCurrentSource(sources[0])
      }
    }
    initializeSources()
  }, [])

  const updateCurrentSource = useCallback((source: PackageSource | null) => {
    setCurrentSource(source)
  }, [])

  return {
    sources,
    currentSource,
    updateCurrentSource
  }
}

export { useSourceState }
