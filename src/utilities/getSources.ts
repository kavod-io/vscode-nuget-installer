import * as vscode from "vscode"
import { Credentials } from "../contracts"
import { promisify } from "util"
import { exec } from "child_process"

/**
 * A definition for the Nuget sources configured in this extension's settings.
 */
interface NugetSourceExtensionSettings {
  name: string
  url: string
  requiresAuth: boolean | undefined
}

const getSources = async () => {
  const configuration = vscode.workspace.getConfiguration("NugetPackageInstaller")

  return await Promise.all(
    (configuration.sources as NugetSourceExtensionSettings[]).map(
      async ({ requiresAuth, name, url }) => {
        const credentials = requiresAuth ? await getCredentialsFromStore(configuration, url) : null

        return {
          name,
          url,
          credentials,
        }
      }
    )
  )
}

const getCredentialsFromStore = async (
  configuration: vscode.WorkspaceConfiguration,
  source: string
): Promise<Credentials | null> => {
  let command =
    process.platform === "win32"
      ? `"${configuration.credentialProviderFolder}/CredentialProvider.Microsoft.exe"`
      : `dotnet "${configuration.credentialProviderFolder}/CredentialProvider.Microsoft.dll"`
  command += " -C -F Json -U " + source

  try {
    const { stdout, stderr } = await promisify(exec)(command)
    return JSON.parse(stdout) as Credentials
  } catch (error) {
    console.error({ message: "failed to retrieve credentials", error, source })
    return null
  }
}

export { getSources }
