import Loader from "../../Loader"
import { CatalogEntry } from "../../clients/nuget"
import { Dependency, DependencyGroup } from "../../clients/nuget/types"
import { Status } from "../../types"

type PackageMetadataProps = {
  statusPackageMetadata: Status
  packageMetadata: CatalogEntry | null
}

const PackageMetadata = ({ statusPackageMetadata, packageMetadata }: PackageMetadataProps) => {
  if (statusPackageMetadata === "pending") {
    return <Loader className="flex items-center justify-center" />
  }

  if (statusPackageMetadata === "error") {
    console.log({ statusPackageMetadata, packageMetadata })
    return (
      <div>
        <h4>Error loading package metadata</h4>
      </div>
    )
  }

  if (packageMetadata === null) {
    return (
      <div>
        <h4>No package metadata found.</h4>
      </div>
    )
  }

  const License = () => {
    const text =
      packageMetadata.license !== undefined && packageMetadata.license !== ""
        ? packageMetadata.license
        : "View license"

    return (
      <a
        className="m-0 text-[var(--vscode-editorLink-activeForeground)] hover:bg-[var(--vscode-editor-hoverHighlightBackground)] hover:cursor-pointer"
        target="_blank"
        href={packageMetadata.licenseUrl}
        rel="noreferrer">
        {text}
      </a>
    )
  }

  const Project = () => {
    if (packageMetadata.projectUrl !== undefined && packageMetadata.projectUrl !== "") {
      return (
        <a
          className="m-0 text-[var(--vscode-editorLink-activeForeground)] hover:bg-[var(--vscode-editor-hoverHighlightBackground)] hover:cursor-pointer"
          target="_blank"
          href={packageMetadata.projectUrl}
          rel="noreferrer">
          {packageMetadata.projectUrl.slice(0, 85)}
        </a>
      )
    }
    return <span>Not available</span>
  }

  const Dependencies = () => {
    if (!packageMetadata.dependencyGroups || packageMetadata.dependencyGroups.length === 0) {
      return (
        <ul>
          <li>No dependencies</li>
        </ul>
      )
    }

    const Dep = ({ dependency }: { dependency: Dependency }) => {
      return (
        <li key={dependency.id}>
          {dependency.id} {dependency.range}
        </li>
      )
    }

    const Group = ({ group }: { group: DependencyGroup }) => {
      const dependencies = group.dependencies ? (
        group.dependencies.map((d) => <Dep dependency={d} key={d.id} />)
      ) : (
        <li>No dependencies</li>
      )

      return (
        <li key={group.targetFramework}>
          {group.targetFramework}
          <ul>{dependencies}</ul>
        </li>
      )
    }

    const groups = packageMetadata.dependencyGroups.map((g) => (
      <Group group={g} key={g.targetFramework} />
    ))
    return <ul>{groups}</ul>
  }

  return (
    <>
      <h2 className="mt-0">Description</h2>
      <p>{packageMetadata.description}</p>
      <table className="table">
        <tbody>
          <tr>
            <td>Open in:</td>
            <td>
              <a
                className="m-0 text-[var(--vscode-editorLink-activeForeground)] hover:bg-[var(--vscode-editor-hoverHighlightBackground)] hover:cursor-pointer"
                target="_blank"
                href="packageMetadata.nugetUrl">
                nuget.org
              </a>
            </td>
          </tr>
          <tr>
            <td>Version:</td>
            <td>{packageMetadata.version}</td>
          </tr>
          <tr>
            <td>Date Published:</td>
            <td>{packageMetadata.datePublished}</td>
          </tr>
          <tr>
            <td>Author(s):</td>
            <td>{packageMetadata.authors}</td>
          </tr>
          <tr>
            <td>License:</td>
            <td>
              <License />
            </td>
          </tr>
          <tr>
            <td>Project Url:</td>
            <td>
              <Project />
            </td>
          </tr>
          <tr>
            <td className="align-top">Tags:</td>
            <td>
              <ul className="list-none p-0 m-0">
                {packageMetadata.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
      <h2 className="title-description">Dependencies</h2>
      <Dependencies />
    </>
  )
}

export { PackageMetadata }
