import { DeleteStrategy, Input } from "../types"
import { DefaultDeleteStrategy } from "./delete.strategy"
import OrganizationContainerDeleteStrategy from "./organization.container.delete.strategy"
import UserContainerDeleteStrategy from "./user.container.delete.strategy"

export function decideDeleteStrategy(input: Input): DeleteStrategy {
  if (input.type === "CONTAINER") {
    if (input.organization) {
      return new OrganizationContainerDeleteStrategy()
    } else {
      return new UserContainerDeleteStrategy()
    }
  } else {
    return new DefaultDeleteStrategy()
  }
}
