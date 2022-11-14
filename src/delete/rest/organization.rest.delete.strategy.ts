import { getOctokit } from "@actions/github"
import { DeleteStrategy, RestInput } from "../../types"

export default class OrganizationRestDeleteStrategy implements DeleteStrategy {
  async deletePackageVersion(input: RestInput, name: string, id: string): Promise<void> {
    await getOctokit(input.token).rest.packages.deletePackageVersionForOrg({
      package_name: name,
      package_version_id: Number(id),
      package_type: input.type,
      org: input.organization,
    })
  }
}
