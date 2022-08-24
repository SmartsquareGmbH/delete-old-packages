import { getOctokit } from "@actions/github"
import { Input, Package, QueryStrategy } from "../types"
import { processContainerResponse } from "./container.process"

export default class UserContainerQueryStrategy implements QueryStrategy {
  async queryPackages(input: Input): Promise<Package[]> {
    return await Promise.all(
      input.names.map(async (name) => {
        const response = await this.queryPackage(input, name)

        return processContainerResponse(name, response)
      })
    )
  }

  private async queryPackage(input: Input, name: string) {
    try {
      return await getOctokit(input.token).rest.packages.getAllPackageVersionsForPackageOwnedByUser({
        package_name: name,
        package_type: "container",
        username: input.user,
        per_page: 100,
      })
    } catch (e) {
      throw new Error(`Failed to query package ${name}: ${e}`)
    }
  }
}
