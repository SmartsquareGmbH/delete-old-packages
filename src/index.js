const core = require("@actions/core")
const { getInput, setFailed } = require("@actions/core")
const { context } = require("@actions/github")
const UserInput = require("./strategy/user-strategy.js")
const OrganizationInput = require("./strategy/organization-strategy.js")
const RepoInput = require("./strategy/repo-strategy.js")
const { process } = require("./process.js")

function getStrategyFromInput() {
  const commonArgs = [
    getInput("names")
      ? getInput("names")
          .split("\n")
          .map((it) => it.trim())
          .filter((it) => it !== "")
      : "",
    getInput("version"),
    getInput("version-pattern"),
    getInput("keep"),
    getInput("token"),
  ]

  if (getInput("user")) {
    if (getInput("organization") || getInput("owner") || getInput("repo")) {
      throw new Error("When user is provided, organization and owner/repo must not be specified")
    }

    return new UserInput(getInput("user"), ...commonArgs)
  } else if (getInput("organization")) {
    if (getInput("user") || getInput("owner") || getInput("repo")) {
      throw new Error("When organization is provided, user and owner/repo must not be specified")
    }

    return new OrganizationInput(getInput("organization"), ...commonArgs)
  } else {
    return new RepoInput(
      getInput("owner") ? getInput("owner") : context.repo.owner,
      getInput("repo") ? getInput("repo") : context.repo.repo,
      ...commonArgs
    )
  }
}

async function main() {
  const strategy = getStrategyFromInput()

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

main()
  .then()
  .catch((error) => {
    setFailed(error.message)
  })
