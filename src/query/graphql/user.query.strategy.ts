import { getOctokit } from "@actions/github"
import { Input, Package, QueryStrategy } from "../../types"

// language=graphql
const query = `
  query getVersions($user: String!, $names: [String!]!, $packageType: PackageType) {
    user(login: $user) {
      packages(first: 20, names: $names, packageType: $packageType) {
        nodes {
          name
          versions(last: 100, orderBy: {field: CREATED_AT, direction: DESC}) {
            nodes {
              id
              version
            }
          }
        }
      }
    }
  }
`

type UserResponse = {
  user: {
    packages: {
      nodes: [
        {
          name: string
          versions: {
            nodes: [{ id: string; version: string }]
          }
        }
      ]
    }
  }
}

export default class UserQueryStrategy implements QueryStrategy {
  async queryPackages(input: Input): Promise<Package[]> {
    const result = await getOctokit(input.token).graphql<UserResponse>(query, {
      user: input.user,
      names: input.names,
      packageType: input.type || null,
      headers: {
        Accept: "application/vnd.github.package-deletes-preview+json",
      },
    })

    return result.user.packages.nodes.map((pkg) => ({
      name: pkg.name,
      versions: pkg.versions.nodes.map((version) => ({ id: version.id, names: [version.version] })),
    }))
  }
}
