const DEFAULT_VERSION_PATTERN = /^.+$/
const DEFAULT_KEEP = 2

module.exports = class Input {
  constructor(owner, repo, names, version, versionPattern, keep, token) {
    // Either (version) or (versionPattern and keep) may be provided by the user.
    // Use default (versionPattern and keep) if not specified.
    if (version) {
      // Ensure versionPattern and keep are empty.
      if (versionPattern || keep) {
        throw new Error("When version is provided, keep and version-pattern must not be specified")
      }

      this.versionPattern = null
      this.version = version
      this.keep = null
    } else {
      // Ensure versionPattern and keep.
      if (!versionPattern || versionPattern === "") versionPattern = DEFAULT_VERSION_PATTERN
      if (!keep) keep = DEFAULT_KEEP

      if (!Number.isInteger(Number(keep)) || Number(keep) < 0 || Number(keep) > 100) {
        throw new Error("keep must be an integer between 0 and 100 (inclusive)")
      }

      try {
        this.versionPattern = new RegExp(versionPattern)
      } catch (error) {
        throw new Error("version-pattern must be a valid regex: " + error.message)
      }

      this.keep = Number(keep)
      this.version = null
    }

    if (!owner || owner === "") {
      throw new Error("owner cannot be empty")
    } else if (!repo || repo === "") {
      throw new Error("repo cannot be empty")
    } else if (!names || names.length === 0) {
      throw new Error("names cannot be empty")
    } else if (names.length > 20) {
      throw new Error("names cannot contain more than 20 items")
    } else if (!token || token === "") {
      throw new Error("token cannot be empty")
    }

    this.owner = owner
    this.repo = repo
    this.names = names
    this.token = token
  }
}
