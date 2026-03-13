import { setFailed } from "@actions/core"
import { run } from "./main.js"

function formatError(error: Error): string {
  const cause = error.cause instanceof Error ? "\nCaused by: " + formatError(error.cause) : ""

  return error.toString() + cause
}

run().catch((error: string | Error) => setFailed(error instanceof Error ? formatError(error) : error))
