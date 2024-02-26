import { setFailed } from "@actions/core"
import { executeAction } from "./action.js"
import { decideDeleteStrategy } from "./delete/delete.strategy.factory.js"
import { getActionInput, validateInput } from "./input.js"
import { decideQueryStrategy } from "./query/query.strategy.factory.js"

async function run() {
  const input = validateInput(getActionInput())

  await executeAction(input, decideQueryStrategy(input), decideDeleteStrategy(input))
}

function formatError(error: Error): string {
  const cause = error.cause instanceof Error ? "\nCaused by: " + formatError(error.cause) : ""

  return error.toString() + cause
}

run().catch((error: string | Error) => setFailed(error instanceof Error ? formatError(error) : error))
