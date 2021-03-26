const { getOctokit } = require("@actions/github")
const semverValidRange = require("semver/ranges/valid")

const DEFAULT_VERSION_PATTERN = /^.+$/
const DEFAULT_KEEP = 2

const deleteMutation = `
  mutation deletePackageVersion($packageVersionId: String!) {
    deletePackageVersion(input: {packageVersionId: $packageVersionId}) {
      success
    }
  }
`

module.exports = class Strategy {
  constructor(names, version, versionPattern, semverPattern, keep, token, dryRun) {
    // Either (version) or (versionPattern/semverPattern and keep) may be provided by the user.
    // Use default (versionPattern and keep) if not specified.
    if (version) {
      if (versionPattern || keep) {
        throw new Error("When version is provided, keep and version-pattern must not be specified")
      }

      this.versionPattern = null
      this.version = version
      this.keep = null
    } else {
      if (semverPattern) {
        if (versionPattern) {
          throw new Error("When semver-pattern is provided, version-pattern must not be specified")
        }

        if (!semverValidRange(semverPattern)) {
          throw new Error("Invalid semver-pattern. See https://www.npmjs.com/package/semver for examples")
        }

        this.semverPattern = semverPattern
      } else {
        if (!versionPattern || versionPattern === "") versionPattern = DEFAULT_VERSION_PATTERN

        try {
          this.versionPattern = new RegExp(versionPattern)
        } catch (error) {
          throw new Error("version-pattern must be a valid regex: " + error.message)
        }
      }

      if (!keep) keep = DEFAULT_KEEP

      if (!Number.isInteger(Number(keep)) || Number(keep) < 0 || Number(keep) > 100) {
        throw new Error("keep must be an integer between 0 and 100 (inclusive)")
      }

      this.keep = Number(keep)
      this.version = null
    }

    if (!names || names.length === 0) {
      throw new Error("names cannot be empty")
    } else if (names.length > 20) {
      throw new Error("names cannot contain more than 20 items")
    } else if (!token || token === "") {
      throw new Error("token cannot be empty")
    }

    this.names = names
    this.token = token

    switch (dryRun) {
      case "true":
        this.dryRun = true
        break
      case "false":
        this.dryRun = false
        break
      default:
        throw new Error("dryRun must be either true or false")
    }
  }

  async queryPackages() {
    throw new Error("Not implemented.")
  }

  async deletePackage(id) {
    if (this.dryRun) return

    await getOctokit(this.token).graphql(deleteMutation, {
      packageVersionId: id,
      headers: {
        Accept: "application/vnd.github.package-deletes-preview+json",
      },
    })
  }
}
