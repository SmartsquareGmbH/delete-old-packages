import { DeleteStrategy, Input } from "../types"
import OrganizationRestDeleteStrategy from "./rest/organization.rest.delete.strategy"
import UserRestDeleteStrategy from "./rest/user.rest.delete.strategy"

export function decideDeleteStrategy(input: Input): DeleteStrategy {
  return input.organization ? new OrganizationRestDeleteStrategy() : new UserRestDeleteStrategy()
}
