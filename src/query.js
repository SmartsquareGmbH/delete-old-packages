const { getOctokit } = require("@actions/github")

async function getPackages(options) {
  const getVersionsQuery = `
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

  const getVersionQuery = `
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
  const query = options.version ? getVersionQuery : getVersionsQuery

  const result = await getOctokit(options.token).graphql(query, {
    owner: options.owner,
    repo: options.repo,
    names: options.names,
    headers: {
      Accept: "application/vnd.github.package-deletes-preview+json",
    },
  })

  // Normalize results of each query so that we get a `versions` array for each package in either case.
  let packages
  if (options.version) {
    return result.repository.packages.nodes.map((it) => ({ ...it, versions: [it.version] }))
  } else {
    return result.repository.packages.nodes.map((it) => ({ ...it, versions: it.versions.nodes }))
  }
}

async function deletePackage(id, options) {
  const mutation = `
    mutation deletePackageVersion($packageVersionId: String!) {
      deletePackageVersion(input: {packageVersionId: $packageVersionId}) {
        success
      }
    }
  `

  await getOctokit(options.token).graphql(mutation, {
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
