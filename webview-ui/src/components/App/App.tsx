import { useNugetMetadata, useNugetService } from "../../clients/nuget"
import { InstallButton, UninstallButton } from "../Buttons"
import { PackageList } from "../PackageList"
import { PackageMetadata } from "../PackageMetadata"
import { ProjectHeader } from "../ProjectHeader"
import { ProjectList } from "../ProjectList"
import { Search } from "../Search"
import { VersionSelector } from "../VersionSelector"
import { useProjects } from "./useProjects"
import { useSearchState } from "./useSearchState"
import { useSelectedPackage } from "./useSelectedPackage"
import { useSourceState } from "./useSourceState"

import "./App.scss"

function App() {
  const { includePrerelease, searchText, updateIncludePrerelease, updateSearchText } =
    useSearchState()
  const { sources, currentSource, updateCurrentSource } = useSourceState()
  const { projects, selectedProjects } = useProjects()
  const { selectedPackage, selectedVersion, updateSelectedPackage, updateSelectedVersion } =
    useSelectedPackage()
  const {
    data: pagedPackages,
    status: packageStatus,
    fetchNextPage: loadMorePackages
  } = useNugetService(currentSource, searchText, includePrerelease)

  const packages =
    pagedPackages && packageStatus === "success" ? pagedPackages.pages.flatMap((x) => x) : []

  const { data: packageMetadata, status: statusPackageMetadata } = useNugetMetadata(
    currentSource,
    selectedPackage?.id ?? null,
    selectedVersion
  )

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
        packageStatus={packageStatus}
        loadMorePackages={loadMorePackages}
        selectedPackage={selectedPackage}
        updateSelectedPackage={updateSelectedPackage}
      />

      <div className="project-metadata-container">
        <ProjectHeader selectedPackage={selectedPackage} />

        <ProjectList
          projects={projects}
          selectedPackage={selectedPackage}
          selectedVersion={selectedVersion}
        />

        <div className="package-version-container">
          <VersionSelector
            selectedPackage={selectedPackage}
            selectedVersion={selectedVersion}
            updateSelectedVersion={updateSelectedVersion}
          />
          <InstallButton
            selectedProjects={selectedProjects}
            selectedPackage={selectedPackage}
            selectedVersion={selectedVersion}
          />
          <UninstallButton
            selectedProjects={selectedProjects}
            selectedPackage={selectedPackage}
            selectedVersion={selectedVersion}
          />
        </div>

        <PackageMetadata
          packageMetadata={packageMetadata?.catalogEntry ?? null}
          statusPackageMetadata={statusPackageMetadata}
        />
      </div>
    </main>
  )
}

export { App }
