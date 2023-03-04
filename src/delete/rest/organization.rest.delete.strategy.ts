import { DeleteStrategy, RestInput } from "../../types"
import { BaseStrategy } from "../../base.strategy"

export default class OrganizationRestDeleteStrategy extends BaseStrategy implements DeleteStrategy {
  async deletePackageVersion(input: RestInput, name: string, id: string): Promise<void> {
    const octokit = this.setupClient(input)
    await octokit.rest.packages.deletePackageVersionForOrg({
      package_name: name,
      package_version_id: Number(id),
      package_type: input.type,
      org: input.organization,
    })
  }
}