import semverCoerce from "semver/functions/coerce"
import semverSatisfies from "semver/functions/satisfies"
import { Input, Package, PackageType, PackageVersion } from "../types"
import { RestEndpointMethodTypes } from "@octokit/plugin-rest-endpoint-methods/dist-types/generated/parameters-and-response-types"
import { components } from "@octokit/openapi-types"

type RestResponse =
  | RestEndpointMethodTypes["packages"]["getAllPackageVersionsForPackageOwnedByOrg"]["response"]
  | RestEndpointMethodTypes["packages"]["getAllPackageVersionsForPackageOwnedByUser"]["response"]

type RestVersion = components["schemas"]["package-version"]

export function processPackages(input: Input, packages: Package[]): Package[] {
  return packages
    .map(({ name, versions, totalVersions }) => ({
      name,
      versions: findVersionsToDelete(input, versions).slice(input.keep),
      totalVersions,
    }))
    .filter((it) => it.versions.length >= 1)
}

export function findVersionsToDelete(input: Input, versions: PackageVersion[]): PackageVersion[] {
  if (input.semverPattern) {
    return versions.filter((version) => {
      return version.names.some((name) => {
        const semver = semverCoerce(name)

        return semver && input.semverPattern && semverSatisfies(semver, input.semverPattern)
      })
    })
  } else if (input.versionPattern) {
    return versions.filter((version) => {
      return version.names.some((name) => input.versionPattern?.test(name))
    })
  } else {
    return versions
  }
}

export function processResponse(name: string, response: RestResponse): Package {
  const versions = response.data.map((version) => processVersion(version)).filter((it) => it.names.length >= 1)
  return {
    name,
    versions: versions,
    totalVersions: versions.length,
  }
}

function processVersion(version: RestVersion): PackageVersion {
  if (version.metadata?.package_type === PackageType.Container) {
    return {
      id: version.id.toString(),
      names: version.metadata?.container?.tags ?? [],
    }
  } else {
    return {
      id: version.id.toString(),
      names: [version.name],
    }
  }
}
