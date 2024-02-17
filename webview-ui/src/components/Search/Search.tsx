import { ChangeEventHandler } from "react"
import { PackageSource } from "../../contracts"

type SearchProps = {
  includePrerelease: boolean
  updateIncludePrerelease: (newValue: boolean) => void

  searchText: string
  updateSearchText: (newValue: string) => void

  sources: PackageSource[]
  currentSource: PackageSource | null
  updateCurrentSource: (source: PackageSource | null) => void
}

const Search = ({
  includePrerelease,
  updateIncludePrerelease,
  searchText,
  updateSearchText,
  sources,
  currentSource,
  updateCurrentSource
}: SearchProps) => {
  const handleTextChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    updateSearchText(e.target.value)
  }

  const handlePrereleaseChange: ChangeEventHandler<HTMLInputElement> = () => {
    updateIncludePrerelease(!includePrerelease)
  }

  const handleSourceChanged: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const source = sources.find((s) => s.name === e.target.value) ?? null
    updateCurrentSource(source)
  }

  const selectedValue = currentSource ? currentSource.name : ""

  return (
    <>
      <div className="package-search">
        <input type="text" id="search-text" value={searchText} onChange={handleTextChange} />
        <input
          type="checkbox"
          id="include-prerelease"
          checked={includePrerelease}
          onChange={handlePrereleaseChange}
        />
        <label htmlFor="include-prerelease">Include Pre-release</label>
      </div>
      <div className="source-select">
        <select value={selectedValue} onChange={handleSourceChanged}>
          {sources.map((x) => (
            <option key={x.name} value={x.name}>
              {x.name}
            </option>
          ))}
        </select>
      </div>
    </>
  )
}

export { Search }
