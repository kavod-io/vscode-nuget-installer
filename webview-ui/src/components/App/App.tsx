import { PackageList } from "../PackageList"
import { PackageMetadata } from "../PackageMetadata"
import { ProjectList } from "../ProjectList"
import { Search } from "../Search"
import { useProjects } from "./useProjects"
import { useSearchState } from "./useSearchState"
import { useSelectedPackage } from "./useSelectedPackage"
import { useSourceState } from "./useSourceState"

import "./App.scss"

function App() {
  const { includePrerelease, searchText, updateIncludePrerelease, updateSearchText } =
    useSearchState()
  const { sources, currentSource, updateCurrentSource } = useSourceState()
  const { projects } = useProjects()
  const { selectedPackage, selectedVersion } = useSelectedPackage()

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
      <div className="project-metadata-container">
        <ProjectList
          projects={projects}
          selectedPackage={selectedPackage}
          selectedVersion={selectedVersion}
        />
        <PackageMetadata />
      </div>
    </main>
  )
}

export { App }
