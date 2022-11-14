import { isRestPackageType } from "../input"
import { DeleteStrategy, Input } from "../types"
import { DefaultDeleteStrategy } from "./graphql/delete.strategy"
import OrganizationRestDeleteStrategy from "./rest/organization.rest.delete.strategy"
import UserRestDeleteStrategy from "./rest/user.rest.delete.strategy"

export function decideDeleteStrategy(input: Input): DeleteStrategy {
  if (isRestPackageType(input.type)) {
    if (input.organization) {
      return new OrganizationRestDeleteStrategy()
    } else {
      return new UserRestDeleteStrategy()
    }
  } else {
    return new DefaultDeleteStrategy()
  }
}
