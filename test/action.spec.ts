import { mock } from "jest-mock-extended"
import { Range } from "semver"
import { executeAction } from "../src/action"
import { DeleteStrategy, Input, QueryStrategy } from "../src/types"

const packages = [
  {
    name: "test",
    versions: [
      { id: "MDE0OlBhY2thZ2VWZXJzaW9uNTA2NzYxOQ==", version: "1.0.0" },
      { id: "MDE0OlBhY2thZ2VWZXJzaW9uNTA2NzYxNg==", version: "docker-base-layer" },
    ],
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
    owner: "SmartsquareGmbH",
    repo: "delete-old-packages",
  }

  const queryStrategy = mock<QueryStrategy>({ queryPackages: () => Promise.resolve(packages) })
  const deleteStrategy = mock<DeleteStrategy>()

  await executeAction(input, queryStrategy, deleteStrategy)

  expect(deleteStrategy.deletePackageVersion).toHaveBeenCalledTimes(2)
  expect(deleteStrategy.deletePackageVersion).toHaveBeenNthCalledWith(1, input, "MDE0OlBhY2thZ2VWZXJzaW9uNTA2NzYxOQ==")
  expect(deleteStrategy.deletePackageVersion).toHaveBeenNthCalledWith(2, input, "MDE0OlBhY2thZ2VWZXJzaW9uNTA2NzYxNg==")
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
    owner: "SmartsquareGmbH",
    repo: "delete-old-packages",
  }

  const queryStrategy = mock<QueryStrategy>({ queryPackages: () => Promise.resolve(packages) })
  const deleteStrategy = mock<DeleteStrategy>()

  await executeAction(input, queryStrategy, deleteStrategy)

  expect(deleteStrategy.deletePackageVersion).toHaveBeenCalledTimes(1)
  expect(deleteStrategy.deletePackageVersion).toHaveBeenNthCalledWith(1, input, "MDE0OlBhY2thZ2VWZXJzaW9uNTA2NzYxOQ==")
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
    owner: "SmartsquareGmbH",
    repo: "delete-old-packages",
  }

  const queryStrategy = mock<QueryStrategy>({ queryPackages: () => Promise.resolve(packages) })
  const deleteStrategy = mock<DeleteStrategy>()

  await executeAction(input, queryStrategy, deleteStrategy)

  expect(deleteStrategy.deletePackageVersion).toHaveBeenCalledTimes(1)
  expect(deleteStrategy.deletePackageVersion).toHaveBeenNthCalledWith(1, input, "MDE0OlBhY2thZ2VWZXJzaW9uNTA2NzYxOQ==")
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
    owner: "SmartsquareGmbH",
    repo: "delete-old-packages",
  }

  const queryStrategy = mock<QueryStrategy>({ queryPackages: () => Promise.resolve([]) })
  const deleteStrategy = mock<DeleteStrategy>()

  await executeAction(input, queryStrategy, deleteStrategy)

  expect(deleteStrategy.deletePackageVersion).toHaveBeenCalledTimes(0)
})
