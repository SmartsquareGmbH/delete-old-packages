const { getOctokit } = require("@actions/github")

const getMultipleVersionsQuery = `
  query getVersions($owner: String!, $repo: String!, $names: [String!]!) {
    repository(owner: $owner, name: $repo) {
      name
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
      name
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

const deleteMutation = `
  mutation deletePackageVersion($packageVersionId: String!) {
    deletePackageVersion(input: {packageVersionId: $packageVersionId}) {
      success
    }
  }
`

async function getPackages(options) {
  const query = options.version ? getSingleVersionQuery : getMultipleVersionsQuery

  const result = await getOctokit(options.token).graphql(query, {
    owner: options.owner,
    repo: options.repo,
    names: options.names,
    headers: {
      Accept: "application/vnd.github.package-deletes-preview+json",
    },
  })

  // Normalize results of each query so that we get a `versions` array for each package in either case.
  if (options.version) {
    return result.repository.packages.nodes.map((it) => ({ ...it, versions: [it.version] }))
  } else {
    return result.repository.packages.nodes.map((it) => ({ ...it, versions: it.versions.nodes }))
  }
}

async function deletePackage(id, options) {
  await getOctokit(options.token).graphql(deleteMutation, {
    packageVersionId: id,
    headers: {
      Accept: "application/vnd.github.package-deletes-preview+json",
    },
  })
}

module.exports = {
  getPackages,
  deletePackage,
}
