import { createPackagesClient } from "../clients/packages.client.js"
import { DeleteStrategy, Input } from "../types.js"
import OrganizationDeleteStrategy from "./strategies/organization.delete.strategy.js"
import UserDeleteStrategy from "./strategies/user.delete.strategy.js"

export function decideDeleteStrategy(input: Input): DeleteStrategy {
  const packagesClient = createPackagesClient(input)

  return input.organization ? new OrganizationDeleteStrategy(packagesClient) : new UserDeleteStrategy(packagesClient)
}
