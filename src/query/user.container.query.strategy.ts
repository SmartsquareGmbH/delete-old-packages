import { getOctokit } from "@actions/github"
import { Input, Package, QueryStrategy } from "../types"

export default class UserContainerQueryStrategy implements QueryStrategy {
  async queryPackages(input: Input): Promise<Package[]> {
    return await Promise.all(
      input.names.map(async (name) => {
        const response = await getOctokit(input.token).rest.packages.getAllPackageVersionsForPackageOwnedByUser({
          package_name: name,
          package_type: "container",
          username: input.user,
          per_page: 100,
        })

        const result: Package = {
          name,
          versions: response.data
            .map((version) => ({
              id: version.id.toString(),
              names: version.metadata?.container?.tags?.map((it) => it as string) ?? [],
            }))
            .filter((it) => it.names.length >= 1),
        }

        return result
      })
    )
  }
}
