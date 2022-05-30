import { Input, QueryStrategy } from "../types"
import OrganizationQueryStrategy from "./organization.query.strategy"
import RepoQueryStrategy from "./repo.query.strategy"
import UserQueryStrategy from "./user.query.strategy"

export function decideQueryStrategy(input: Input): QueryStrategy {
  if (input.user) {
    return new UserQueryStrategy()
  } else if (input.organization) {
    return new OrganizationQueryStrategy()
  } else {
    return new RepoQueryStrategy()
  }
}
