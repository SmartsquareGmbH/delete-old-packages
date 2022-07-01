import { getBooleanInput, getInput, getMultilineInput } from "@actions/core"
import { context } from "@actions/github"
import { Range } from "semver"
import { Input } from "./types"

const DEFAULT_KEEP = 2

function getRegExpInput(name: string): RegExp | undefined {
  const input = getInput("version-pattern")

  if (input !== "") {
    try {
      return new RegExp(input)
    } catch (error: unknown) {
      throw new Error(`${name} must be a valid regex: ${error}`)
    }
  } else {
    return undefined
  }
}

function genSemVerInput(name: string): Range | undefined {
  const input = getInput(name)

  if (input !== "") {
    try {
      return new Range(input)
    } catch (error: unknown) {
      throw new Error(
        `${name} must be a valid semver pattern (see https://www.npmjs.com/package/semver for examples): ${error}`
      )
    }
  } else {
    return undefined
  }
}

export function getActionInput(): Input {
  return {
    names: getMultilineInput("names"),
    versionPattern: getRegExpInput("version-pattern"),
    semverPattern: genSemVerInput("semver-pattern"),
    keep: Number(getInput("keep") || DEFAULT_KEEP),
    token: getInput("token"),
    dryRun: getBooleanInput("dry-run"),
    user: getInput("user"),
    organization: getInput("organization"),
    owner: getInput("owner") || context.repo.owner,
    repo: getInput("repo") || context.repo.repo,
  }
}

export function validateInput(input: Input): Input {
  if (input.names.length <= 0) {
    throw new Error("names cannot be empty")
  }

  if (input.names.length > 20) {
    throw new Error("names cannot contain more than 20 items")
  }

  if (input.versionPattern && input.semverPattern) {
    throw new Error("Only one of version-pattern and semver-pattern can be specified")
  }

  if (!Number.isInteger(input.keep) || input.keep < 0 || input.keep > 100) {
    throw new Error("keep must be an integer between 0 and 100 (inclusive)")
  }

  if (input.token === "") {
    throw new Error("token cannot be empty")
  }

  return input
}
