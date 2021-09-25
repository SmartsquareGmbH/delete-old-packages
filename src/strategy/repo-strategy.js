const Strategy = require("./strategy")
const { getOctokit } = require("@actions/github")

const getMultipleVersionsQuery = `
  query getVersions($owner: String!, $repo: String!, $names: [String!]!) {
    repository(owner: $owner, name: $repo) {
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
  query getVersion($owner: String!, $repo: String!, $names: [String!]!, $version: String!) {
    repository(owner: $owner, name: $repo) {
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

module.exports = class RepoStrategy extends Strategy {
  constructor(owner, repo, names, version, versionPattern, semverPattern, keep, token, dryRun) {
    super(names, version, versionPattern, semverPattern, keep, token, dryRun)

    if (!owner || owner === "") {
      throw new Error("owner cannot be empty")
    } else if (!repo || repo === "") {
      throw new Error("repo cannot be empty")
    }

    this.owner = owner
    this.repo = repo
  }

  async queryPackages() {
    const query = this.version ? getSingleVersionQuery : getMultipleVersionsQuery

    const result = await getOctokit(this.token).graphql(query, {
      owner: this.owner,
      repo: this.repo,
      names: this.names,
      version: this.version,
      headers: {
        Accept: "application/vnd.github.package-deletes-preview+json",
      },
    })

    // Normalize results of each query so that we get a `versions` array for each package in either case.
    if (this.version) {
      return result.repository.packages.nodes.map((it) => ({ ...it, versions: [it.version] }))
    } else {
      return result.repository.packages.nodes.map((it) => ({ ...it, versions: it.versions.nodes }))
    }
  }
}
