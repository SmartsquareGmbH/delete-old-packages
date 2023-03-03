import { Input, QueryStrategy } from "../types"
import OrganizationRestQueryStrategy from "./rest/organization.rest.query.strategy"
import UserRestQueryStrategy from "./rest/user.rest.query.strategy"

export function decideQueryStrategy(input: Input): QueryStrategy {
  return input.organization ? new OrganizationRestQueryStrategy() : new UserRestQueryStrategy()
}
