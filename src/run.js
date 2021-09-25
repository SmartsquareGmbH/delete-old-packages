const core = require("@actions/core")
const { process } = require("./process.js")

/**
 * Main function of the action.
 *
 * @param {Strategy} strategy The strategy to use.
 * @returns {Promise<void>}
 */
module.exports = async function run(strategy) {
  if (strategy.dryRun) {
    core.warning("Dry run is set. No package versions will be actually deleted.")
  }

  core.info("Fetching packages")

  const packages = await strategy.queryPackages()

  await core.group(`Found ${packages.length} packages (before filtering)`, async () => {
    packages.forEach((it) => {
      core.info(`${it.name} with ${it.versions.length} versions`)
    })
  })

  const processedPackages = process(packages, strategy)

  if (processedPackages.length <= 0) {
    core.info("No packages to delete")

    return
  }

  await core.group("Deleting packages", async () => {
    await Promise.all(
      processedPackages.map((it) => {
        core.info(`Deleting version ${it.version} of package ${it.name}`)

        return strategy.deletePackage(it.id)
      })
    )
  })

  core.info(`${processedPackages.length} packages deleted`)
}
