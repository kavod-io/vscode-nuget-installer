import { PackageList } from "../PackageList"
import { PackageMetadata } from "../PackageMetadata"
import { ProjectList } from "../ProjectList"
import { Search } from "../Search"
import { useSearchState } from "./useSearchState"

import "./App.css"

function App() {
  const { includePrerelease, searchText, updateIncludePrerelease, updateSearchText } =
    useSearchState()

  return (
    <main>
      <Search
        includePrerelease={includePrerelease}
        searchText={searchText}
        updateIncludePrerelease={updateIncludePrerelease}
        updateSearchText={updateSearchText}
      />
      <PackageList />
      <ProjectList />
      <PackageMetadata />
    </main>
  )
}

export { App }
