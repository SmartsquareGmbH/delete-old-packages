import { Endpoints } from "@octokit/types"
import { coerce as semverCoerce, satisfies as semverSatisfies } from "semver"
import { Input, Package, PackageType, PackageVersion } from "../types.js"

type OctokitPackageResponse =
  Endpoints["GET /users/{username}/packages/{package_type}/{package_name}/versions"]["response"]

type OctokitPackageVersion = OctokitPackageResponse["data"][number]

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

export function processResponse(name: string, response: OctokitPackageResponse): Package {
  const versions = response.data.map((version) => processVersion(version)).filter((it) => it.names.length >= 1)
  return {
    name,
    versions: versions,
    totalVersions: versions.length,
  }
}

function processVersion(version: OctokitPackageVersion): PackageVersion {
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
