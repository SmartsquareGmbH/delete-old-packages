import { isRestPackageType } from "../input"
import { Input, QueryStrategy } from "../types"
import OrganizationQueryStrategy from "./graphql/organization.query.strategy"
import RepoQueryStrategy from "./graphql/repo.query.strategy"
import UserQueryStrategy from "./graphql/user.query.strategy"
import OrganizationRestQueryStrategy from "./rest/organization.rest.query.strategy"
import UserRestQueryStrategy from "./rest/user.rest.query.strategy"

export function decideQueryStrategy(input: Input): QueryStrategy {
  if (input.organization) {
    if (isRestPackageType(input.type)) {
      return new OrganizationRestQueryStrategy()
    } else {
      return new OrganizationQueryStrategy()
    }
  } else if (input.user) {
    if (isRestPackageType(input.type)) {
      return new UserRestQueryStrategy()
    } else {
      return new UserQueryStrategy()
    }
  } else {
    return new RepoQueryStrategy()
  }
}
