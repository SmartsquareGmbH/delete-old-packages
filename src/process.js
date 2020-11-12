function process(packages, options) {
  return packages.flatMap((it) => {
    const matchingVersions = it.versions.filter((version) => options.versionPattern.test(version.version))
    const versionsToDelete = matchingVersions.slice(options.keep)

    return versionsToDelete.map((match) => ({ name: it.name, ...match }))
  })
}

module.exports = {
  process,
}
