import { decideQueryStrategy } from "../../src/query/query.strategy.factory"
import UserQueryStrategy from "../../src/query/strategies/user.query.strategy"
import OrganizationQueryStrategy from "../../src/query/strategies/organization.query.strategy"
import { Input, PackageType } from "../../src/types"

test("decide user query strategy", () => {
  const input: Input = {
    names: ["test"],
    versionPattern: /.*/,
    keep: 0,
    token: "abc-123",
    dryRun: false,
    user: "user",
    organization: "",
    type: PackageType.Npm,
  }

  expect(decideQueryStrategy(input)).toBeInstanceOf(UserQueryStrategy)
})

test("decide organization query strategy", () => {
  const input: Input = {
    names: ["test"],
    versionPattern: /.*/,
    keep: 0,
    token: "abc-123",
    dryRun: false,
    user: "",
    organization: "org",
    type: PackageType.Npm,
  }

  expect(decideQueryStrategy(input)).toBeInstanceOf(OrganizationQueryStrategy)
})

test("decide default query strategy", () => {
  const input: Input = {
    names: ["test"],
    versionPattern: /.*/,
    keep: 0,
    type: PackageType.Maven,
    token: "abd-123",
    dryRun: false,
    user: "",
    organization: "",
  }

  expect(decideQueryStrategy(input)).toBeInstanceOf(UserQueryStrategy)
})

test("decide rest user strategy", () => {
  const input: Input = {
    names: ["test"],
    versionPattern: /.*/,
    keep: 0,
    type: PackageType.Npm,
    token: "abc-123",
    dryRun: false,
    user: "user",
    organization: "",
  }

  expect(decideQueryStrategy(input)).toBeInstanceOf(UserQueryStrategy)
})
