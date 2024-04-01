import { PackageSource } from "@kavod-io/vscode-nuget-installer-api"
import { useQuery } from "@tanstack/react-query"
import { fetchSearchQueryServiceUrl } from "./api"

// TODO there are actually multiple urls of each type for high availability.  We should fail over
// when necessary.
interface Services {
  queryServiceUrl: string | undefined
  metadataUrl: string | undefined
  autocompleteUrl: string | undefined
}

export const useNugetServiceIndex = (source: PackageSource | null): Services | null => {
  const { data, status, isFetched } = useQuery({
    queryKey: ["nuget", "metadata", source?.url],
    queryFn: () => (source ? fetchSearchQueryServiceUrl(source) : null),
    staleTime: 10 * 60 * 1000, // 10min
  })
  if (data && status === "success" && isFetched) {
    return data
  }
  return null
}
