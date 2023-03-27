import { DeleteStrategy, Input } from "../types"
import OrganizationDeleteStrategy from "./strategies/organization.delete.strategy"
import UserDeleteStrategy from "./strategies/user.delete.strategy"
import {PackagesClient} from "../clients/packages.client";

export function decideDeleteStrategy(input: Input): DeleteStrategy {
  const packagesClient = new PackagesClient(input);
  return input.organization ? new OrganizationDeleteStrategy(packagesClient.client) : new UserDeleteStrategy(packagesClient.client)
}
