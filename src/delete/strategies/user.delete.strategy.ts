import { GitHub } from "@actions/github/lib/utils"
import { DeleteStrategy, Input } from "../../types"

export default class UserDeleteStrategy implements DeleteStrategy {
  constructor(private readonly octokit: InstanceType<typeof GitHub>) {}

  async deletePackageVersion(input: Input, name: string, id: string): Promise<void> {
    await this.octokit.rest.packages.deletePackageVersionForUser({
      package_name: name,
      package_version_id: Number(id),
      package_type: input.type,
      username: input.user,
    })
  }

  async deletePackage(input: Input, name: string): Promise<void> {
    await this.octokit.rest.packages.deletePackageForUser({
      package_name: name,
      package_type: input.type,
      username: input.user,
    })
  }
}
