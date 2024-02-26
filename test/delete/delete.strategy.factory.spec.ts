import { expect, test } from "vitest"
import { decideDeleteStrategy } from "../../src/delete/delete.strategy.factory.js"
import OrganizationDeleteStrategy from "../../src/delete/strategies/organization.delete.strategy.js"
import UserDeleteStrategy from "../../src/delete/strategies/user.delete.strategy.js"
import { Input, PackageType } from "../../src/types.js"

test("decide default delete strategy", () => {
  const input: Input = {
    names: ["test"],
    versionPattern: /.*/,
    keep: 0,
    token: "abc-123",
    dryRun: false,
    user: "",
    organization: "",
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
  }

  expect(decideDeleteStrategy(input)).toBeInstanceOf(OrganizationDeleteStrategy)
})
