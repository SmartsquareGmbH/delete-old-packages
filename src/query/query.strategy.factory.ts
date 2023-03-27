import { Input, QueryStrategy } from "../types"
import OrganizationQueryStrategy from "./strategies/organization.query.strategy"
import UserQueryStrategy from "./strategies/user.query.strategy"
import {PackagesClient} from "../clients/packages.client";

export function decideQueryStrategy(input: Input): QueryStrategy {
  const packagesClient = new PackagesClient(input);
  return input.organization ? new OrganizationQueryStrategy(packagesClient.client) : new UserQueryStrategy(packagesClient.client)
}
