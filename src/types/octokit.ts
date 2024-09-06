import { GitHub } from "@actions/github/lib/utils.js"

type OctokitPackageCall = InstanceType<typeof GitHub>["rest"]["packages"]["getAllPackageVersionsForPackageOwnedByOrg"]

export type OctokitPackageResponse = Awaited<ReturnType<OctokitPackageCall>>
export type OctokitPackageVersion = OctokitPackageResponse["data"][number]
