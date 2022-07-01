import { Range } from "semver"

export type Input = {
  names: string[]
  versionPattern?: RegExp
  semverPattern?: Range
  keep: number
  type: string
  token: string
  dryRun: boolean
  user: string
  organization: string
  owner: string
  repo: string
}

export type Package = {
  name: string
  versions: PackageVersion[]
}

export type PackageVersion = {
  id: string
  version: string
}

export interface QueryStrategy {
  queryPackages(input: Input): Promise<Package[]>
}

export interface DeleteStrategy {
  deletePackageVersion(input: Input, id: string): Promise<void>
}
