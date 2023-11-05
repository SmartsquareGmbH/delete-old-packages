import { Range } from "semver"
import { test, expect } from "vitest"
import { mock } from "vitest-mock-extended"
import { executeAction } from "../src/action"
import { DeleteStrategy, Input, PackageType, QueryStrategy } from "../src/types"

const packages = [
  {
    name: "test",
    versions: [
      { id: "a", names: ["1.0.0"] },
      { id: "b", names: ["docker-base-layer"] },
    ],
    totalVersions: 2,
  },
]

const packages_single = [
  {
    name: "test",
    versions: [{ id: "a", names: ["1.0.0"] }],
    totalVersions: 1,
  },
]

test("queries and deletes packages", async () => {
  const input: Input = {
    names: ["test", "test2"],
    keep: 0,
    token: "token",
    dryRun: false,
    user: "user",
    organization: "",
    type: PackageType.Npm,
  }

  const queryStrategy = mock<QueryStrategy>({ queryPackages: () => Promise.resolve(packages) })
  const deleteStrategy = mock<DeleteStrategy>()

  await executeAction(input, queryStrategy, deleteStrategy)

  expect(deleteStrategy.deletePackageVersion).toHaveBeenCalledTimes(2)
  expect(deleteStrategy.deletePackageVersion).toHaveBeenNthCalledWith(1, input, "test", "a")
  expect(deleteStrategy.deletePackageVersion).toHaveBeenNthCalledWith(2, input, "test", "b")
})

test("filters by semver-pattern", async () => {
  const input: Input = {
    names: ["test", "test2"],
    semverPattern: new Range(">=1.0.0"),
    keep: 0,
    token: "token",
    dryRun: false,
    user: "user",
    organization: "",
    type: PackageType.Npm,
  }

  const queryStrategy = mock<QueryStrategy>({ queryPackages: () => Promise.resolve(packages) })
  const deleteStrategy = mock<DeleteStrategy>()

  await executeAction(input, queryStrategy, deleteStrategy)

  expect(deleteStrategy.deletePackageVersion).toHaveBeenCalledTimes(1)
  expect(deleteStrategy.deletePackageVersion).toHaveBeenNthCalledWith(1, input, "test", "a")
})

test("filters by version-pattern", async () => {
  const input: Input = {
    names: ["test", "test2"],
    versionPattern: /^\d+\.\d+\.\d+$/,
    keep: 0,
    token: "token",
    dryRun: false,
    user: "user",
    organization: "",
    type: PackageType.Npm,
  }

  const queryStrategy = mock<QueryStrategy>({ queryPackages: () => Promise.resolve(packages) })
  const deleteStrategy = mock<DeleteStrategy>()

  await executeAction(input, queryStrategy, deleteStrategy)

  expect(deleteStrategy.deletePackageVersion).toHaveBeenCalledTimes(1)
  expect(deleteStrategy.deletePackageVersion).toHaveBeenNthCalledWith(1, input, "test", "a")
})

test("deletes whole package if last version", async () => {
  const input: Input = {
    names: ["test", "test2"],
    versionPattern: /^\d+\.\d+\.\d+$/,
    keep: 0,
    token: "token",
    dryRun: false,
    user: "user",
    organization: "",
    type: PackageType.Npm,
  }

  const queryStrategy = mock<QueryStrategy>({ queryPackages: () => Promise.resolve(packages_single) })
  const deleteStrategy = mock<DeleteStrategy>()

  await executeAction(input, queryStrategy, deleteStrategy)

  expect(deleteStrategy.deletePackage).toHaveBeenCalledTimes(1)
  expect(deleteStrategy.deletePackage).toHaveBeenNthCalledWith(1, input, "test")
})

test("Does nothing when empty packages are returned", async () => {
  const input: Input = {
    names: ["test", "test2"],
    versionPattern: /^\d+\.\d+\.\d+$/,
    keep: 0,
    token: "token",
    dryRun: false,
    user: "user",
    organization: "",
    type: PackageType.Npm,
  }

  const queryStrategy = mock<QueryStrategy>({ queryPackages: () => Promise.resolve([]) })
  const deleteStrategy = mock<DeleteStrategy>()

  await executeAction(input, queryStrategy, deleteStrategy)

  expect(deleteStrategy.deletePackageVersion).toHaveBeenCalledTimes(0)
})
