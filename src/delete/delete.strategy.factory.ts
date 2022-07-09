import { DeleteStrategy, Input } from "../types"
import { DefaultDeleteStrategy } from "./delete.strategy"
import OrganizationContainerDeleteStrategy from "./organization.container.delete.strategy"
import UserContainerDeleteStrategy from "./user.container.delete.strategy"

// eslint-disable-next-line @typescript-eslint/no-unused-vars -- To be used later.
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
