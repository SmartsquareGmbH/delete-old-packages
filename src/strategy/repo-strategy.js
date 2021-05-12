const Input = require("./strategy")
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

const getMultipleVersionsQueryFirst100 = `
  query getVersions($owner: String!, $repo: String!, $names: [String!]!) {
    repository(owner: $owner, name: $repo) {
      packages(first: 20, names: $names) {
        nodes {
          name
          versions(first: 100, orderBy: {field: CREATED_AT, direction: DESC}) {
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

module.exports = class RepoStrategy extends Input {
  constructor(owner, repo, names, version, versionPattern, semverPattern, keep, token, dryRun, versionQueryOrder) {
    super(names, version, versionPattern, semverPattern, keep, token, dryRun, versionQueryOrder)

    if (!owner || owner === "") {
      throw new Error("owner cannot be empty")
    } else if (!repo || repo === "") {
      throw new Error("repo cannot be empty")
    }

    this.owner = owner
    this.repo = repo
    this.versionQueryOrder = versionQueryOrder
  }

  async queryPackages() {
    let query = null
    if (this.version) {
      query = getSingleVersionQuery
    } else {
      if (this.versionQueryOrder === "first") {
        query = getMultipleVersionsQueryFirst100
      } else {
        query = getMultipleVersionsQuery
      }
    }

    const result = await getOctokit(this.token).graphql(query, {
      owner: this.owner,
      repo: this.repo,
      names: this.names,
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
