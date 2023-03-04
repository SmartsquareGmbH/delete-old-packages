import { processRestResponse } from "../../process/rest.process"
import { Package, QueryStrategy, RestInput } from "../../types"
import { BaseStrategy } from "../../base.strategy"

export default class OrganizationRestQueryStrategy extends BaseStrategy implements QueryStrategy {
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
      const octokit = this.setupClient(input)
      const params = {
        package_name: name,
        package_type: input.type,
        org: input.organization,
        per_page: 100,
      }
      return await octokit.rest.packages.getAllPackageVersionsForPackageOwnedByOrg(params)
    } catch (error) {
      throw new Error(`Failed to query package ${name}: ${error}`)
    }
  }
}
