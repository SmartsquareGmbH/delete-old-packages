import { setFailed } from "@actions/core"
import { executeAction } from "./action"
import { decideDeleteStrategy } from "./delete/delete.strategy.factory"
import { getActionInput, validateInput } from "./input"
import { decideQueryStrategy } from "./query/query.strategy.factory"

async function run() {
  const input = validateInput(getActionInput())

  await executeAction(input, decideQueryStrategy(input), decideDeleteStrategy(input))
}

function formatError(error: Error): string {
  const cause = error.cause instanceof Error ? "\nCaused by: " + formatError(error.cause) : ""

  return error.toString() + cause
}

run().catch((error: string | Error) => setFailed(error instanceof Error ? formatError(error) : error))
