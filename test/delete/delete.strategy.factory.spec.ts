import { decideDeleteStrategy } from "../../src/delete/delete.strategy.factory"
import { DefaultDeleteStrategy } from "../../src/delete/graphql/delete.strategy"
import OrganizationRestDeleteStrategy from "../../src/delete/rest/organization.rest.delete.strategy"
import UserRestDeleteStrategy from "../../src/delete/rest/user.rest.delete.strategy"
import { Input, PackageType } from "../../src/types"

test("decide default delete strategy", () => {
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

  expect(decideDeleteStrategy(input)).toBeInstanceOf(DefaultDeleteStrategy)
})

test("decide rest user delete strategy", () => {
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

  expect(decideDeleteStrategy(input)).toBeInstanceOf(UserRestDeleteStrategy)
})

test("decide rest organization delete strategy", () => {
  const input: Input = {
    names: ["test"],
    versionPattern: /.*/,
    keep: 0,
    type: PackageType.Npm,
    token: "",
    dryRun: false,
    user: "",
    organization: "org",
    owner: "SmartsquareGmbH",
    repo: "delete-old-packages",
  }

  expect(decideDeleteStrategy(input)).toBeInstanceOf(OrganizationRestDeleteStrategy)
})
