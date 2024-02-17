import { PackageList } from "../PackageList"
import { PackageMetadata } from "../PackageMetadata"
import { ProjectList } from "../ProjectList"
import { Search } from "../Search"
import { useSearchState } from "./useSearchState"
import { useSourceState } from "./useSourceState"

import "./App.css"
import { useProjects } from "./useProjects"

function App() {
  const { includePrerelease, searchText, updateIncludePrerelease, updateSearchText } =
    useSearchState()

  const { sources, currentSource, updateCurrentSource } = useSourceState()

  const { projects } = useProjects()

  return (
    <main>
      <Search
        includePrerelease={includePrerelease}
        searchText={searchText}
        updateIncludePrerelease={updateIncludePrerelease}
        updateSearchText={updateSearchText}
        sources={sources}
        currentSource={currentSource}
        updateCurrentSource={updateCurrentSource}
      />
      <PackageList />
      <ProjectList projects={projects} />
      <PackageMetadata />
    </main>
  )
}

export { App }
