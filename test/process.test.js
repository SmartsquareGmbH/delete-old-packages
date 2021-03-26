const { process } = require("../src/process")

test("filters correctly", () => {
  const result = process(
    [
      {
        name: "package 1",
        versions: [{ version: "2" }, { version: "1" }],
      },
      {
        name: "package 2",
        versions: [{ version: "2" }, { version: "1" }],
      },
    ],
    {
      versionPattern: /^.*$/,
      keep: 1,
    }
  )

  expect(result.length).toBe(2)
  expect(result[0].name).toBe("package 1")
  expect(result[0].version).toBe("1")
  expect(result[1].name).toBe("package 2")
  expect(result[1].version).toBe("1")
})

test("filters based on semver", () => {
  const result = process(
    [
      {
        name: "package 1",
        versions: [{ version: "1.0.0" }, { version: "2.0.1" }, { version: "3.10.2" }],
      },
    ],
    {
      semverPattern: "^1 || >2.0.1 || >3 <=3.11",
      keep: 0,
    }
  )

  expect(result.length).toBe(2)
  expect(result[0].version).toBe("1.0.0")
  expect(result[1].version).toBe("3.10.2")
})

test("filters based on regex", () => {
  const result = process(
    [
      {
        name: "package 1",
        versions: [{ version: "2-test" }, { version: "1" }],
      },
      {
        name: "package 2",
        versions: [{ version: "2-test" }, { version: "1-test" }],
      },
    ],
    {
      versionPattern: /^.*-test$/,
      keep: 0,
    }
  )

  expect(result.length).toBe(3)
  expect(result[0].name).toBe("package 1")
  expect(result[0].version).toBe("2-test")
  expect(result[1].name).toBe("package 2")
  expect(result[1].version).toBe("2-test")
  expect(result[2].name).toBe("package 2")
  expect(result[2].version).toBe("1-test")
})

test("respects keep", () => {
  const result = process(
    [
      {
        name: "package 1",
        versions: [{ version: "3" }, { version: "2" }, { version: "1" }],
      },
      {
        name: "package 2",
        versions: [{ version: "1" }, { version: "1" }],
      },
    ],
    {
      versionPattern: /^.*$/,
      keep: 2,
    }
  )

  expect(result.length).toBe(1)
  expect(result[0].name).toBe("package 1")
  expect(result[0].version).toBe("1")
})
