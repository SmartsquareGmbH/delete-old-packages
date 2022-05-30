import { getOctokit } from "@actions/github"
import { Input, Package, QueryStrategy } from "../types"

// language=graphql
const query = `
  query getVersions($organization: String!, $names: [String!]!) {
    organization(login: $organization) {
      packages(first: 20, names: $names) {
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

type OrganizationResponse = {
  organization: {
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

export default class OrganizationQueryStrategy implements QueryStrategy {
  async queryPackages(input: Input): Promise<Package[]> {
    const result = await getOctokit(input.token).graphql<OrganizationResponse>(query, {
      organization: input.organization,
      names: input.names,
      headers: {
        Accept: "application/vnd.github.package-deletes-preview+json",
      },
    })

    return result.organization.packages.nodes.map((pkg) => ({
      name: pkg.name,
      versions: pkg.versions.nodes.map((version) => ({ id: version.id, version: version.version })),
    }))
  }
}
