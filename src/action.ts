import { group, info, warning } from "@actions/core"
import { processPackages } from "./process"
import { DeleteStrategy, Input, QueryStrategy } from "./types"

export async function executeAction(input: Input, queryStrategy: QueryStrategy, deleteStrategy: DeleteStrategy) {
  if (input.dryRun) {
    warning("Dry run is set. No package versions will be actually deleted.")
  }

  info("Fetching packages")

  const packages = await queryStrategy.queryPackages(input)

  await group(`Found ${packages.length} package(s) before filtering`, async () => {
    packages.forEach((it) => {
      info(`${it.name} with ${it.versions.length} version(s)`)
    })
  })

  const processedPackages = processPackages(input, packages)

  if (processedPackages.length <= 0) {
    info("No packages to delete")

    return
  }

  await group(`Found ${processedPackages.length} package(s) after filtering`, async () => {
    processedPackages.forEach((it) => {
      info(`${it.name} with ${it.versions.length} version(s)`)
    })
  })

  await group("Deleting packages", async () => {
    await Promise.all(
      processedPackages
        .flatMap((pkg) => pkg.versions.map((version) => ({ name: pkg.name, version })))
        .map(async ({ name, version }) => {
          info(`Deleting version ${version.version} of package ${name}`)

          if (!input.dryRun) {
            await deleteStrategy.deletePackageVersion(input, version.id)
          }
        })
    )
  })

  info(`${processedPackages.flatMap(pkg => pkg.versions).length} package versions(s) deleted`)
}
