import { getOctokit } from "@actions/github"
import { DeleteStrategy, Input } from "../types"

export default class UserContainerDeleteStrategy implements DeleteStrategy {
  async deletePackageVersion(input: Input, name: string, id: string): Promise<void> {
    await getOctokit(input.token).rest.packages.deletePackageVersionForUser({
      package_name: name,
      package_version_id: Number(id),
      package_type: "container",
      username: input.user,
    })
  }
}
