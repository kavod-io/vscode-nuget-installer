import { useCallback, useMemo } from "react"
import { useNugetMetadata, useNugetService } from "../../clients/nuget"
import { Project } from "../../contracts"
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
  const { projects, selectedProjects, updateSelectedProject, installPackage, uninstallPackage } =
    useProjects()

  const {
    data: pagedPackages,
    status: packageStatus,
    fetchNextPage: loadMorePackages,
  } = useNugetService(currentSource, searchText, includePrerelease)

  const packages = useMemo(
    () =>
      pagedPackages && packageStatus === "success" ? pagedPackages.pages.flatMap((x) => x) : [],
    [pagedPackages, packageStatus]
  )

  const { selectedPackage, selectedVersion, updateSelectedPackage, updateSelectedVersion } =
    useSelectedPackage(packages)

  const { data: packageMetadata, status: statusPackageMetadata } = useNugetMetadata(
    currentSource,
    selectedPackage?.id ?? null,
    selectedVersion
  )

  const handleInstallToProjects = useCallback(
    async (projectsToInstall: Project[]) => {
      if (!currentSource || !selectedPackage || !selectedVersion) {
        return
      }
      await installPackage(currentSource.url, projectsToInstall, selectedPackage, selectedVersion)
    },
    [currentSource, installPackage, selectedPackage, selectedVersion]
  )

  const handleUninstallToProjects = useCallback(
    async (projectsToUninstall: Project[]) => {
      if (!currentSource || !selectedPackage || !selectedVersion) {
        return
      }
      await uninstallPackage(projectsToUninstall, selectedPackage)
    },
    [currentSource, selectedPackage, selectedVersion, uninstallPackage]
  )

  return (
    <main className="h-dvh grid gap-x-2 grid-cols-[60%,40%] grid-rows-[50px,auto]">
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

      <div className="row-start-2 col-start-2 flex flex-col gap-3 max-h-full">
        <div className="w-full flex-none">
          <ProjectHeader selectedPackage={selectedPackage} />
        </div>

        <div className="w-full flex-none max-h-[150px]">
          <ProjectList
            projects={projects}
            selectedPackage={selectedPackage}
            selectedVersion={selectedVersion}
            selectedProjects={selectedProjects}
            updateSelectedProjects={updateSelectedProject}
            install={handleInstallToProjects}
            uninstall={handleUninstallToProjects}
          />
        </div>

        <div className="w-full flex-none flex gap-3">
          <VersionSelector
            selectedPackage={selectedPackage}
            selectedVersion={selectedVersion}
            updateSelectedVersion={updateSelectedVersion}
          />
          <InstallButton
            selectedProjects={selectedProjects}
            selectedPackage={selectedPackage}
            selectedVersion={selectedVersion}
            install={handleInstallToProjects}
          />
          <UninstallButton
            selectedProjects={selectedProjects}
            selectedPackage={selectedPackage}
            uninstall={handleUninstallToProjects}
          />
        </div>

        <div className="w-full flex-1 basis-1 overflow-y-auto">
          <PackageMetadata
            packageMetadata={packageMetadata?.catalogEntry ?? null}
            statusPackageMetadata={statusPackageMetadata}
          />
        </div>
      </div>
    </main>
  )
}

export { App }
