import { processResponse } from "../../process/process"
import { Package, QueryStrategy, Input } from "../../types"
import { GitHub } from "@actions/github/lib/utils"

export default class UserQueryStrategy implements QueryStrategy {
  constructor(private readonly octokit: InstanceType<typeof GitHub>) {}

  async queryPackages(input: Input): Promise<Package[]> {
    return await Promise.all(
      input.names.map(async (name) => {
        const response = await this.queryPackage(input, name)

        return processResponse(name, response)
      })
    )
  }

  private async queryPackage(input: Input, name: string) {
    try {
      const params = {
        package_name: name,
        package_type: input.type,
        username: input.user,
        per_page: 100,
      }

      return await this.octokit.rest.packages.getAllPackageVersionsForPackageOwnedByUser(params)
    } catch (error) {
      throw new Error(`Failed to query package ${name}`, { cause: error })
    }
  }
}
