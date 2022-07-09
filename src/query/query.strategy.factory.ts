import { Input, QueryStrategy } from "../types"
import OrganizationContainerQueryStrategy from "./organization.container.query.strategy"
import OrganizationQueryStrategy from "./organization.query.strategy"
import RepoQueryStrategy from "./repo.query.strategy"
import UserContainerQueryStrategy from "./user.container.query.strategy"
import UserQueryStrategy from "./user.query.strategy"

export function decideQueryStrategy(input: Input): QueryStrategy {
  if (input.organization) {
    if (input.type === "CONTAINER") {
      return new OrganizationContainerQueryStrategy()
    } else {
      return new OrganizationQueryStrategy()
    }
  } else if (input.user) {
    if (input.type === "CONTAINER") {
      return new UserContainerQueryStrategy()
    } else {
      return new UserQueryStrategy()
    }
  } else {
    return new RepoQueryStrategy()
  }
}
