import { PackageInfo } from "../../clients/nuget"

type ProjectHeaderProps = {
  selectedPackage: PackageInfo | null
}

const ProjectHeader = ({ selectedPackage }: ProjectHeaderProps) => {
  if (!selectedPackage) {
    return null
  }

  return (
    <>
      <span className="text-xl">{selectedPackage.id}</span>
      <span className="author">{` by ${selectedPackage.authors}`}</span>
    </>
  )
}

export { ProjectHeader }
