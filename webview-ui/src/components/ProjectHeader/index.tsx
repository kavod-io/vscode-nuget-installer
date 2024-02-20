import { PackageInfo } from "../../clients/nuget"

type ProjectHeaderProps = {
  selectedPackage: PackageInfo | null
}

const ProjectHeader = ({ selectedPackage }: ProjectHeaderProps) => {
  if (!selectedPackage) {
    return null
  }

  return (
    <div className="w-full pb-2">
      <span className="text-xl">{selectedPackage.id}</span>
      <span className="author">{` by ${selectedPackage.authors}`}</span>
    </div>
  )
}

export { ProjectHeader }
