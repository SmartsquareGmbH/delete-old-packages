import { Input, QueryStrategy } from "../types"
import OrganizationQueryStrategy from "./strategies/organization.query.strategy"
import UserQueryStrategy from "./strategies/user.query.strategy"
import { createPackagesClient } from "../clients/packages.client"

export function decideQueryStrategy(input: Input): QueryStrategy {
  const packagesClient = createPackagesClient(input)

  return input.organization ? new OrganizationQueryStrategy(packagesClient) : new UserQueryStrategy(packagesClient)
}
