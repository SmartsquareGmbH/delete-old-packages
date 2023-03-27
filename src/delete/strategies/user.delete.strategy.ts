import { DeleteStrategy, RestInput } from "../../types"
import {GitHub} from "@actions/github/lib/utils";

export default class UserDeleteStrategy implements DeleteStrategy {
  private octokit: InstanceType<typeof GitHub>;

  constructor(octokit: InstanceType<typeof GitHub>) {
    this.octokit = octokit;
  }
  
  async deletePackageVersion(input: RestInput, name: string, id: string): Promise<void> {
    await this.octokit.rest.packages.deletePackageVersionForUser({
      package_name: name,
      package_version_id: Number(id),
      package_type: input.type,
      username: input.user,
    })
  }
}
