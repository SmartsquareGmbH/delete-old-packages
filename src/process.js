const semverSatisfies = require("semver/functions/satisfies")

function process(packages, options) {
  return packages.flatMap((it) => {
    let versionsToDelete

    if (options.semverPattern) {
      const matchingVersions = it.versions.filter((version) => semverSatisfies(version.version, options.semverPattern))

      versionsToDelete = matchingVersions.slice(options.keep)
    } else if (options.versionPattern) {
      const matchingVersions = it.versions.filter((version) => options.versionPattern.test(version.version))

      versionsToDelete = matchingVersions.slice(options.keep)
    } else {
      versionsToDelete = it.versions
    }

    return versionsToDelete.map((match) => ({ name: it.name, ...match }))
  })
}

module.exports = {
  process,
}
