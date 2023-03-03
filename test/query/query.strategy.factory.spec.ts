import { decideQueryStrategy } from "../../src/query/query.strategy.factory"
import UserRestQueryStrategy from "../../src/query/rest/user.rest.query.strategy"
import OrganizationRestQueryStrategy from "../../src/query/rest/organization.rest.query.strategy"
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
  }

  expect(decideQueryStrategy(input)).toBeInstanceOf(UserRestQueryStrategy)
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
  }

  expect(decideQueryStrategy(input)).toBeInstanceOf(OrganizationRestQueryStrategy)
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
  }

  expect(decideQueryStrategy(input)).toBeInstanceOf(UserRestQueryStrategy)
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
  }

  expect(decideQueryStrategy(input)).toBeInstanceOf(UserRestQueryStrategy)
})
