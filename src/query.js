const { getOctokit } = require("@actions/github")

async function getPackages(options) {
  const query = `
    query getVersions($owner: String!, $repo: String!, $names: [String!]!) {
      repository(owner: $owner, name: $repo) {
        name
        packages(first: 20, names: $names) {
          edges {
            node {
              name
              versions(last: 20, orderBy: {field: CREATED_AT, direction: DESC}) {
                edges {
                  node {
                    id
                    version
                  }
                }
              }
            }
          }
        }
      }
    }
  `

  const result = await getOctokit(options.token).graphql(query, {
    owner: options.owner,
    repo: options.repo,
    names: options.names,
    headers: {
      Accept: "application/vnd.github.package-deletes-preview+json",
    },
  })

  const packages = result.repository.packages.edges.map((it) => it.node)

  return packages.map((it) => ({ ...it, versions: it.versions.edges.map((version) => version.node) }))
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
