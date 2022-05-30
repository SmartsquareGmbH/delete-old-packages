import semverCoerce from "semver/functions/coerce"
import semverSatisfies from "semver/functions/satisfies"
import { Input, Package, PackageVersion } from "./types"

export function processPackages(input: Input, packages: Package[]): Package[] {
  return packages
    .map(({ name, versions }) => ({ name, versions: findVersionsToDelete(input, versions).slice(input.keep) }))
    .filter((it) => it.versions.length >= 1)
}

export function findVersionsToDelete(input: Input, versions: PackageVersion[]): PackageVersion[] {
  if (input.semverPattern) {
    return versions.filter((version) => {
      const semver = semverCoerce(version.version)

      return input.semverPattern && semver != null && semverSatisfies(semver, input.semverPattern)
    })
  } else if (input.versionPattern) {
    return versions.filter((version) => input.versionPattern?.test(version.version))
  } else {
    return versions
  }
}
