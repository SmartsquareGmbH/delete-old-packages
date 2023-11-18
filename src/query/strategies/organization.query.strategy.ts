import { processResponse } from "../../process/process"
import { Package, QueryStrategy, RestInput } from "../../types"
import { GitHub } from "@actions/github/lib/utils"

export default class OrganizationQueryStrategy implements QueryStrategy {
  constructor(private readonly octokit: InstanceType<typeof GitHub>) {}

  async queryPackages(input: RestInput): Promise<Package[]> {
    if (!input.names) {
      throw new Error("No names specified")
    }
    return await Promise.all(
      input.names.map(async (name) => {
        const response = await this.queryPackage(input, name)

        return processResponse(name, response)
      })
    )
  }

  async queryPackageNames(input: RestInput) {
    if (!input.namePattern) {
      throw new Error("No name-pattern specified")
    }
    const namePattern = input.namePattern
    try {
      const params = {
        package_type: input.type,
        org: input.organization,
        per_page: 100,
      }

      const packages = await this.octokit.paginate(this.octokit.rest.packages.listPackagesForOrganization, params)

      return packages.map((p) => p.name).filter((n) => namePattern.test(n))
    } catch (error) {
      throw new Error(`Failed to query package name pattern ${input.namePattern}: ${error}`)
    }
  }

  private async queryPackage(input: RestInput, name: string) {
    try {
      const params = {
        package_name: name,
        package_type: input.type,
        org: input.organization,
        per_page: 100,
      }

      return this.octokit.rest.packages.getAllPackageVersionsForPackageOwnedByOrg(params)
    } catch (error) {
      throw new Error(`Failed to query package ${name}: ${error}`)
    }
  }
}
