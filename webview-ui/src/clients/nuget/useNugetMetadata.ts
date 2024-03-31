import { PackageSource } from "@kavod-io/vscode-nuget-installer-api"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { fetchPackageVersionMetadata } from "./api"
import { useNugetServiceIndex } from "./useNugetServiceIndex"
import { useRegistrationIndex } from "./useRegistrationIndex"

export const useNugetMetadata = (
  source: PackageSource | null,
  packageName: string | null,
  selectedVersion: string | null
) => {
  const searchUrl = useNugetServiceIndex(source)
  const { status, data } = useRegistrationIndex(source, packageName, searchUrl)
  const client = useQueryClient()
  return useQuery({
    queryKey: ["nuget", "package-metadata", source?.url, packageName, selectedVersion],
    enabled: status === "success",
    staleTime: 10 * 60 * 1000, // 10min
    queryFn: () =>
      data && selectedVersion && source
        ? fetchPackageVersionMetadata(source, client, data, selectedVersion)
        : null,
  })
}
