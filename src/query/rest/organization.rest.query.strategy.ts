import { getOctokit } from "@actions/github"
import { processRestResponse } from "../../process/rest.process"
import { Package, QueryStrategy, RestInput } from "../../types"

export default class OrganizationRestQueryStrategy implements QueryStrategy {
  async queryPackages(input: RestInput): Promise<Package[]> {
    return await Promise.all(
      input.names.map(async (name) => {
        const response = await this.queryPackage(input, name)

        return processRestResponse(name, response)
      })
    )
  }

  private async queryPackage(input: RestInput, name: string) {
    try {
      return await getOctokit(input.token).rest.packages.getAllPackageVersionsForPackageOwnedByOrg({
        package_name: name,
        package_type: input.type,
        org: input.organization,
        per_page: 100,
      })
    } catch (error) {
      throw new Error(`Failed to query package ${name}: ${error}`)
    }
  }
}
