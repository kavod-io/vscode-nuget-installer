import { PackageSource } from "@kavod-io/vscode-nuget-installer-api"
import { ChangeEventHandler } from "react"

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
  updateCurrentSource,
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
      <div className="self-center">
        <input
          type="text"
          className="mr-1 w-[300px] p-1 text-[var(--vscode-input-foreground)] bg-[var(--vscode-input-background)] border-solid border-[1px] border-[var(--vscode-dropdown-border)]"
          id="search-text"
          value={searchText}
          onChange={handleTextChange}
        />
        <input
          type="checkbox"
          className="p-1 border-[var(--vscode-input-border)] text-[var(--vscode-input-foreground)] bg-[var(--vscode-input-background)]"
          id="include-prerelease"
          checked={includePrerelease}
          onChange={handlePrereleaseChange}
        />
        <label htmlFor="include-prerelease">Include Pre-release</label>
      </div>

      <div className="col-start-2 justify-self-end self-center">
        <select
          className="p-1 min-w-full text-[var(--vscode-dropdown-foreground)] bg-[var(--vscode-dropdown-background)] border-solid border-[1px] border-[var(--vscode-dropdown-border)]"
          value={selectedValue}
          onChange={handleSourceChanged}>
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
