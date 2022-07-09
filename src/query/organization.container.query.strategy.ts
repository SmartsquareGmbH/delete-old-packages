import { getOctokit } from "@actions/github"
import { Input, Package, QueryStrategy } from "../types"

export default class OrganizationContainerQueryStrategy implements QueryStrategy {
  async queryPackages(input: Input): Promise<Package[]> {
    return await Promise.all(
      input.names.map(async (name) => {
        const response = await this.queryPackage(input, name)

        const result: Package = {
          name,
          versions: response.data
            .map((version) => ({
              id: version.id.toString(),
              names: version.metadata?.container?.tags?.map((it) => it as string) ?? [],
            }))
            .filter((it) => it.names.length >= 1),
        }

        return result
      })
    )
  }

  private async queryPackage(input: Input, name: string) {
    try {
      return await getOctokit(input.token).rest.packages.getAllPackageVersionsForPackageOwnedByOrg({
        package_name: name,
        package_type: "container",
        org: input.organization,
        per_page: 100,
      })
    } catch (e) {
      throw new Error(`Failed to query package ${name}: ${e}`)
    }
  }
}
