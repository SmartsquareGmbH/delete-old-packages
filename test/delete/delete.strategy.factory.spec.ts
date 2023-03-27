import { decideDeleteStrategy } from "../../src/delete/delete.strategy.factory"
import OrganizationDeleteStrategy from "../../src/delete/strategies/organization.delete.strategy"
import UserDeleteStrategy from "../../src/delete/strategies/user.delete.strategy"
import { Input, PackageType } from "../../src/types"

test("decide default delete strategy", () => {
  const input: Input = {
    names: ["test"],
    versionPattern: /.*/,
    keep: 0,
    token: "abc-123",
    dryRun: false,
    user: "",
    organization: "",
    owner: "SmartsquareGmbH",
    type: PackageType.Npm,
  }

  expect(decideDeleteStrategy(input)).toBeInstanceOf(UserDeleteStrategy)
})

test("decide rest user delete strategy", () => {
  const input: Input = {
    names: ["test"],
    versionPattern: /.*/,
    keep: 0,
    type: PackageType.Npm,
    token: "abc-123",
    dryRun: false,
    user: "user",
    organization: "",
    owner: "SmartsquareGmbH",
  }

  expect(decideDeleteStrategy(input)).toBeInstanceOf(UserDeleteStrategy)
})

test("decide rest organization delete strategy", () => {
  const input: Input = {
    names: ["test"],
    versionPattern: /.*/,
    keep: 0,
    type: PackageType.Npm,
    token: "abc-123",
    dryRun: false,
    user: "",
    organization: "org",
    owner: "SmartsquareGmbH",
  }

  expect(decideDeleteStrategy(input)).toBeInstanceOf(OrganizationDeleteStrategy)
})
