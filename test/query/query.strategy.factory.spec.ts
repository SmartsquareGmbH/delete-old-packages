import OrganizationQueryStrategy from "../../src/query/graphql/organization.query.strategy"
import RepoQueryStrategy from "../../src/query/graphql/repo.query.strategy"
import UserQueryStrategy from "../../src/query/graphql/user.query.strategy"
import { decideQueryStrategy } from "../../src/query/query.strategy.factory"
import UserRestQueryStrategy from "../../src/query/rest/user.rest.query.strategy"
import { Input, PackageType } from "../../src/types"

test("decide user query strategy", () => {
  const input: Input = {
    names: ["test"],
    versionPattern: /.*/,
    keep: 0,
    token: "",
    dryRun: false,
    user: "user",
    organization: "",
    owner: "SmartsquareGmbH",
    repo: "delete-old-packages",
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
    owner: "SmartsquareGmbH",
    repo: "delete-old-packages",
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
    type: PackageType.Maven,
    token: "",
    dryRun: false,
    user: "",
    organization: "",
    owner: "SmartsquareGmbH",
    repo: "delete-old-packages",
  }

  expect(decideQueryStrategy(input)).toBeInstanceOf(RepoQueryStrategy)
})

test("decide rest user strategy", () => {
  const input: Input = {
    names: ["test"],
    versionPattern: /.*/,
    keep: 0,
    type: PackageType.Npm,
    token: "",
    dryRun: false,
    user: "user",
    organization: "",
    owner: "SmartsquareGmbH",
    repo: "delete-old-packages",
  }

  expect(decideQueryStrategy(input)).toBeInstanceOf(UserRestQueryStrategy)
})
