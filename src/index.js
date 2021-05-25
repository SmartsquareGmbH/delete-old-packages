const { getInput, setFailed } = require("@actions/core")
const { context } = require("@actions/github")
const UserStrategy = require("./strategy/user-strategy.js")
const OrganizationStrategy = require("./strategy/organization-strategy.js")
const RepoStrategy = require("./strategy/repo-strategy.js")
const run = require("./run.js")

/**
 * @returns {module.Strategy}
 */
function getStrategyFromInput() {
  const commonArgs = [
    getInput("names")
      ? getInput("names")
          .split("\n")
          .map((it) => it.trim())
          .filter((it) => it !== "")
      : "",
    getInput("version"),
    getInput("version-pattern"),
    getInput("semver-pattern"),
    getInput("keep"),
    getInput("token"),
    getInput("dry-run"),
    getInput("version-query-order"),
  ]

  if (getInput("user")) {
    if (getInput("organization") || getInput("owner") || getInput("repo")) {
      throw new Error("When user is provided, organization and owner/repo must not be specified")
    }

    return new UserStrategy(getInput("user"), ...commonArgs)
  } else if (getInput("organization")) {
    if (getInput("user") || getInput("owner") || getInput("repo")) {
      throw new Error("When organization is provided, user and owner/repo must not be specified")
    }

    return new OrganizationStrategy(getInput("organization"), ...commonArgs)
  } else {
    return new RepoStrategy(
      getInput("owner") ? getInput("owner") : context.repo.owner,
      getInput("repo") ? getInput("repo") : context.repo.repo,
      ...commonArgs
    )
  }
}

run(getStrategyFromInput())
  .then()
  .catch((error) => {
    setFailed(error.message)
  })
