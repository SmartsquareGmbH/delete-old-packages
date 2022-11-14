import { getOctokit } from "@actions/github"
import { processRestResponse } from "../../process/rest.process"
import { Package, QueryStrategy, RestInput } from "../../types"

export default class UserRestQueryStrategy implements QueryStrategy {
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
      return await getOctokit(input.token).rest.packages.getAllPackageVersionsForPackageOwnedByUser({
        package_name: name,
        package_type: input.type,
        username: input.user,
        per_page: 100,
      })
    } catch (e) {
      throw new Error(`Failed to query package ${name}: ${e}`)
    }
  }
}
