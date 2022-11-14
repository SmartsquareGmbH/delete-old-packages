import { components } from "@octokit/openapi-types"
import { RestEndpointMethodTypes } from "@octokit/plugin-rest-endpoint-methods/dist-types/generated/parameters-and-response-types"
import { Package, PackageType, PackageVersion } from "../types"

type RestResponse =
  | RestEndpointMethodTypes["packages"]["getAllPackageVersionsForPackageOwnedByOrg"]["response"]
  | RestEndpointMethodTypes["packages"]["getAllPackageVersionsForPackageOwnedByUser"]["response"]

type RestVersion = components["schemas"]["package-version"]

export function processRestResponse(name: string, response: RestResponse): Package {
  return {
    name,
    versions: response.data.map((version) => processVersion(version)).filter((it) => it.names.length >= 1),
  }
}

function processVersion(version: RestVersion): PackageVersion {
  if (version.metadata?.package_type === PackageType.Container) {
    return {
      id: version.id.toString(),
      names: version.metadata?.container?.tags?.map((it) => it as string) ?? [],
    }
  } else {
    return {
      id: version.id.toString(),
      names: [version.name],
    }
  }
}
