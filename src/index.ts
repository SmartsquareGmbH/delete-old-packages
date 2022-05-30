import { setFailed } from "@actions/core"
import { executeAction } from "./action"
import { decideDeleteStrategy } from "./delete/delete.strategy.factory"
import { getActionInput, validateInput } from "./input"
import { decideQueryStrategy } from "./query/query.strategy.factory"

const input = validateInput(getActionInput())

executeAction(input, decideQueryStrategy(input), decideDeleteStrategy(input)).catch((error) => setFailed(error))
