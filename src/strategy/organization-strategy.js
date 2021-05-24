const Input = require("./strategy")
const { getOctokit } = require("@actions/github")

const getMultipleVersionsQuery = `
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

const getSingleVersionQuery = `
  query getVersion($organization: String!, $names: [String!]!, $version: String!) {
    organization(login: $organization) {
      packages(first: 20, names: $names) {
        nodes {
          name
          version(version: $version) {
            id
            version
          }
        }
      }
    }
  }
`

module.exports = class OrganizationStrategy extends Input {
  constructor(organization, names, version, versionPattern, semverPattern, keep, token, dryRun) {
    super(names, version, versionPattern, semverPattern, keep, token, dryRun)

    if (!organization || organization === "") {
      throw new Error("organization cannot be empty")
    }

    this.organization = organization
  }

  async queryPackages() {
    const query = this.version ? getSingleVersionQuery : getMultipleVersionsQuery

    const result = await getOctokit(this.token).graphql(query, {
      organization: this.organization,
      names: this.names,
      version: this.version,
      headers: {
        Accept: "application/vnd.github.package-deletes-preview+json",
      },
    })

    // Normalize results of each query so that we get a `versions` array for each package in either case.
    if (this.version) {
      return result.organization.packages.nodes.map((it) => ({ ...it, versions: [it.version] }))
    } else {
      return result.organization.packages.nodes.map((it) => ({ ...it, versions: it.versions.nodes }))
    }
  }
}
