import { executeAction } from "./action.js"
import { decideDeleteStrategy } from "./delete/delete.strategy.factory.js"
import { getActionInput, validateInput } from "./input.js"
import { decideQueryStrategy } from "./query/query.strategy.factory.js"

export async function run() {
  const input = validateInput(getActionInput())

  await executeAction(input, decideQueryStrategy(input), decideDeleteStrategy(input))
}
