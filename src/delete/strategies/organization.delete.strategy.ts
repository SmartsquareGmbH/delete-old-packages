import { DeleteStrategy, Input } from "../../types"
import { GitHub } from "@actions/github/lib/utils"

export default class OrganizationDeleteStrategy implements DeleteStrategy {
  constructor(private readonly octokit: InstanceType<typeof GitHub>) {}

  async deletePackageVersion(input: Input, name: string, id: string): Promise<void> {
    await this.octokit.rest.packages.deletePackageVersionForOrg({
      package_name: name,
      package_version_id: Number(id),
      package_type: input.type,
      org: input.organization,
    })
  }

  async deletePackage(input: Input, name: string): Promise<void> {
    await this.octokit.rest.packages.deletePackageForOrg({
      package_name: name,
      package_type: input.type,
      org: input.organization,
    })
  }
}
