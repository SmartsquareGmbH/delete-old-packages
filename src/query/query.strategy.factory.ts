import { createPackagesClient } from "../clients/packages.client.js"
import { Input, QueryStrategy } from "../types.js"
import OrganizationQueryStrategy from "./strategies/organization.query.strategy.js"
import UserQueryStrategy from "./strategies/user.query.strategy.js"

export function decideQueryStrategy(input: Input): QueryStrategy {
  const packagesClient = createPackagesClient(input)

  return input.organization ? new OrganizationQueryStrategy(packagesClient) : new UserQueryStrategy(packagesClient)
}
