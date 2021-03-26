const run = require("../src/run.js")

test("queries and deletes packages", async () => {
  const strategy = {
    dryRun: false,
    queryPackages: async () => {
      return [
        {
          name: "test",
          versions: [
            { id: "MDE0OlBhY2thZ2VWZXJzaW9uNTA2NzYxOQ==", version: "1.0.0" },
            { id: "MDE0OlBhY2thZ2VWZXJzaW9uNTA2NzYxNg==", version: "docker-base-layer" },
          ],
        },
      ]
    },
    deletePackage: jest.fn(),
  }

  await run(strategy)

  expect(strategy.deletePackage).toHaveBeenCalledTimes(2)
  expect(strategy.deletePackage).toHaveBeenNthCalledWith(1, "MDE0OlBhY2thZ2VWZXJzaW9uNTA2NzYxOQ==")
  expect(strategy.deletePackage).toHaveBeenNthCalledWith(2, "MDE0OlBhY2thZ2VWZXJzaW9uNTA2NzYxNg==")
})

test("filters by version-pattern", async () => {
  const strategy = {
    dryRun: false,
    versionPattern: /^\d+\.\d+\.\d+$/,
    queryPackages: async () => {
      return [
        {
          name: "test",
          versions: [
            { id: "MDE0OlBhY2thZ2VWZXJzaW9uNTA2NzYxOQ==", version: "1.0.0" },
            { id: "MDE0OlBhY2thZ2VWZXJzaW9uNTA2NzYxNg==", version: "docker-base-layer" },
          ],
        },
      ]
    },
    deletePackage: jest.fn(),
  }

  await run(strategy)

  expect(strategy.deletePackage).toHaveBeenCalledTimes(1)
  expect(strategy.deletePackage).toHaveBeenNthCalledWith(1, "MDE0OlBhY2thZ2VWZXJzaW9uNTA2NzYxOQ==")
})

test("Does nothing when empty packages are returned", async () => {
  const strategy = {
    dryRun: false,
    queryPackages: async () => {
      return []
    },
    deletePackage: jest.fn(),
  }

  await run(strategy)

  expect(strategy.deletePackage).toHaveBeenCalledTimes(0)
})
