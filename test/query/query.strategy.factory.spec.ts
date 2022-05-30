import OrganizationQueryStrategy from "../../src/query/organization.query.strategy"
import { decideQueryStrategy } from "../../src/query/query.strategy.factory"
import RepoQueryStrategy from "../../src/query/repo.query.strategy"
import UserQueryStrategy from "../../src/query/user.query.strategy"
import { Input } from "../../src/types"

test("decide user query strategy", () => {
  const input: Input = {
    names: ["test"],
    versionPattern: /.*/,
    keep: 0,
    token: "",
    dryRun: false,
    user: "user",
    organization: "",
    owner: "",
    repo: "",
  }

  expect(decideQueryStrategy(input)).toBeInstanceOf(UserQueryStrategy)
})

test("decide organization query strategy", () => {
  const input: Input = {
    names: ["test"],
    versionPattern: /.*/,
    keep: 0,
    token: "",
    dryRun: false,
    user: "",
    organization: "org",
    owner: "",
    repo: "",
  }

  expect(decideQueryStrategy(input)).toBeInstanceOf(OrganizationQueryStrategy)
})

test("decide repo query strategy", () => {
  const input: Input = {
    names: ["test"],
    versionPattern: /.*/,
    keep: 0,
    token: "",
    dryRun: false,
    user: "",
    organization: "",
    owner: "owner",
    repo: "repo",
  }

  expect(decideQueryStrategy(input)).toBeInstanceOf(RepoQueryStrategy)
})

test("decide default query strategy", () => {
  const input: Input = {
    names: ["test"],
    versionPattern: /.*/,
    keep: 0,
    token: "",
    dryRun: false,
    user: "",
    organization: "",
    owner: "",
    repo: "",
  }

  expect(decideQueryStrategy(input)).toBeInstanceOf(RepoQueryStrategy)
})
