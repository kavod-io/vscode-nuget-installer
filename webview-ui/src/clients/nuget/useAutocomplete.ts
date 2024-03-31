import { PackageSource } from "@kavod-io/vscode-nuget-installer-api"
import { useQuery } from "@tanstack/react-query"
import { fetchAutocomplete } from "./api"
import { useNugetServiceIndex } from "./useNugetServiceIndex"

// we are permanently disabling this for now until the UI is correctly implemented.
const DISABLED = true

const useAutocomplete = (
  source: PackageSource | null,
  query: string,
  includePrerelease: boolean
) => {
  const index = useNugetServiceIndex(source)
  return useQuery({
    queryKey: ["nuget", "autocomplete", source?.url, query, includePrerelease],
    enabled: !!index?.autocompleteUrl && DISABLED,
    staleTime: 10 * 60 * 1000,
    queryFn: () =>
      source && index?.autocompleteUrl
        ? fetchAutocomplete(source, index.autocompleteUrl, query, includePrerelease)
        : null,
  })
}

export { useAutocomplete }
