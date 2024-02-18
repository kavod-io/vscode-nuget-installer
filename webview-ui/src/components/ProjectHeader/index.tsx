import React from "react"
import { PackageInfo } from "../../clients/nuget"

type ProjectHeaderProps = {
  selectedPackage: PackageInfo | null
}

const ProjectHeader = ({ selectedPackage }: ProjectHeaderProps) => {
  if (!selectedPackage) {
    return null
  }

  return (
    <div className="header">
      <span className="package-name">{selectedPackage.id}</span>
      <span className="author">{` by ${selectedPackage.authors}`}</span>
    </div>
  )
}

export { ProjectHeader }
