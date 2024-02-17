import { useCallback, useState } from "react"

const useSearchState = () => {
  const [includePrerelease, setIncludePrerelease] = useState<boolean>(false)
  const [searchText, setSearchText] = useState<string>("")

  const updateIncludePrerelease = useCallback((newValue: boolean) => {
    setIncludePrerelease(newValue)
  }, [])

  const updateSearchText = useCallback((newValue: string) => {
    setSearchText(newValue)
  }, [])

  return {
    includePrerelease,
    searchText,
    updateIncludePrerelease,
    updateSearchText
  }
}

export { useSearchState }
