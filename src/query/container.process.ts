import { RestEndpointMethodTypes } from "@octokit/plugin-rest-endpoint-methods/dist-types/generated/parameters-and-response-types"
import { Package } from "../types"

type ContainerResponse =
  | RestEndpointMethodTypes["packages"]["getAllPackageVersionsForPackageOwnedByOrg"]["response"]
  | RestEndpointMethodTypes["packages"]["getAllPackageVersionsForPackageOwnedByUser"]["response"]

export function processContainerResponse(name: string, response: ContainerResponse): Package {
  return {
    name,
    versions: response.data
      .map((version) => ({
        id: version.id.toString(),
        names: version.metadata?.container?.tags?.map((it) => it as string) ?? [],
      }))
      .filter((it) => it.names.length >= 1),
  }
}
