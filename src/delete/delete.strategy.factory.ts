import { DeleteStrategy, Input } from "../types"
import { DefaultDeleteStrategy } from "./delete.strategy"

// eslint-disable-next-line @typescript-eslint/no-unused-vars -- To be used later.
export function decideDeleteStrategy(input: Input): DeleteStrategy {
  return new DefaultDeleteStrategy()
}
