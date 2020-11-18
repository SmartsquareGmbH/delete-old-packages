const core = require("@actions/core")
const { getInput, setFailed } = require("@actions/core")
const { context } = require("@actions/github")
const Input = require("./input.js")
const { getPackages, deletePackage } = require("./query.js")
const { process } = require("./process.js")

function getAllInput() {
  return new Input(
    getInput("owner") ? getInput("owner") : context.repo.owner,
    getInput("repo") ? getInput("repo") : context.repo.repo,
    getInput("names")
      ? getInput("names")
          .split("\n")
          .map((it) => it.trim())
          .filter((it) => it !== "")
      : "",
    getInput("version-pattern") ? getInput("version-pattern") : /^.+$/,
    getInput("keep") ? getInput("keep") : 2,
    getInput("token")
  )
}

async function main() {
  const input = getAllInput()

  core.info("Fetching packages")

  const packages = await getPackages(input)

  await core.group(`Found ${packages.length} packages (before filtering)`, async () => {
    packages.forEach((it) => {
      core.info(`${it.name} with ${it.versions.length} versions`)
    })
  })

  const processedPackages = process(packages, input)

  if (processedPackages.length <= 0) {
    core.info("No packages to delete")

    return
  }

  await core.group("Deleting packages", async () => {
    await Promise.all(
      processedPackages.map((it) => {
        core.info(`Deleting version ${it.version} of package ${it.name}`)

        return deletePackage(it.id, input)
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
