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
    <div>
      <input type="text" value={searchText} onChange={handleTextChange} />
      <input type="checkbox" checked={includePrerelease} onChange={handlePrereleaseChange} />
      <select value={selectedValue} onChange={handleSourceChanged}>
        {sources.map((x) => (
          <option key={x.name} value={x.name}>
            {x.name}
          </option>
        ))}
      </select>
    </div>
  )
}

export { Search }
