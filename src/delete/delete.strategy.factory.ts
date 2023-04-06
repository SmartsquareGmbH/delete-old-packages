import { DeleteStrategy, Input } from "../types"
import OrganizationDeleteStrategy from "./strategies/organization.delete.strategy"
import UserDeleteStrategy from "./strategies/user.delete.strategy"
import { createPackagesClient } from "../clients/packages.client"

export function decideDeleteStrategy(input: Input): DeleteStrategy {
  const packagesClient = createPackagesClient(input)
  return input.organization ? new OrganizationDeleteStrategy(packagesClient) : new UserDeleteStrategy(packagesClient)
}
