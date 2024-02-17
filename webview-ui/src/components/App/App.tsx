import { PackageList } from "../PackageList"
import { PackageMetadata } from "../PackageMetadata"
import { ProjectList } from "../ProjectList"
import { Search } from "../Search"
import { useProjects } from "./useProjects"
import { useSearchState } from "./useSearchState"
import { useSelectedPackage } from "./useSelectedPackage"
import { useSourceState } from "./useSourceState"

import "./App.scss"
import { useNugetService } from "../../clients/nuget"

function App() {
  const { includePrerelease, searchText, updateIncludePrerelease, updateSearchText } =
    useSearchState()
  const { sources, currentSource, updateCurrentSource } = useSourceState()
  const { projects } = useProjects()
  const { selectedPackage, selectedVersion, updateSelectedPackage } = useSelectedPackage()
  const {
    data: pagedPackages,
    status: packagesStatus,
    fetchNextPage: loadMorePackages
  } = useNugetService(currentSource, searchText, includePrerelease)

  const packages =
    pagedPackages && packagesStatus === "success" ? pagedPackages.pages.flatMap((x) => x) : []

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
      <PackageList
        packages={packages}
        loadMorePackages={loadMorePackages}
        selectedPackage={selectedPackage}
        updateSelectedPackage={updateSelectedPackage}
      />
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
