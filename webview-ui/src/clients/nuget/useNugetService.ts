import { PackageSource } from "@kavod-io/vscode-nuget-installer-api"
import { useInfiniteQuery } from "@tanstack/react-query"
import { fetchNugetPackages } from "./api"
import { useNugetServiceIndex } from "./useNugetServiceIndex"

export const pageSize = 20

const useNugetService = (
  source: PackageSource | null,
  query: string,
  includePrerelease: boolean
) => {
  const services = useNugetServiceIndex(source)
  return useInfiniteQuery({
    queryKey: ["nuget", "packages", source?.url, query, includePrerelease],
    initialPageParam: 0,
    enabled: !!services,
    staleTime: 10 * 60 * 1000, // 10min
    queryFn: ({ pageParam }) =>
      source && services?.queryServiceUrl
        ? fetchNugetPackages(source, services?.queryServiceUrl, query, includePrerelease, pageParam)
        : [],
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      if (lastPage.length === 0) {
        return undefined
      }
      return lastPageParam + 1
    },
    getPreviousPageParam: (_firstPage, _allPages, firstPageParam) => {
      if (firstPageParam <= 1) {
        return undefined
      }
      return firstPageParam - 1
    },
  })
}

export { useNugetService }
