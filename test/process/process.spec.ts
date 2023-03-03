import { Range } from "semver"
import { processPackages } from "../../src/process/process"

test("filters correctly", () => {
  const result = processPackages(
    {
      names: ["test", "test2"],
      versionPattern: /^.*$/,
      keep: 0,
      token: "token",
      dryRun: true,
      user: "user",
      organization: "",
      owner: "SmartsquareGmbH",
    },
    [
      {
        name: "test",
        versions: [
          { id: "a", names: ["2"] },
          { id: "b", names: ["1"] },
        ],
      },
      {
        name: "test2",
        versions: [
          { id: "c", names: ["2"] },
          { id: "d", names: ["1"] },
        ],
      },
    ]
  )

  expect(result).toHaveLength(2)
  expect(result[0].name).toEqual("test")
  expect(result[0].versions.map((it) => it.id)).toEqual(["a", "b"])
  expect(result[1].name).toEqual("test2")
  expect(result[1].versions.map((it) => it.id)).toEqual(["c", "d"])
})

test("filters based on semver", () => {
  const result = processPackages(
    {
      names: ["test", "test2"],
      semverPattern: new Range("^1 || >2.0.1 || >3 <=3.11"),
      keep: 0,
      token: "token",
      dryRun: true,
      user: "user",
      organization: "",
      owner: "SmartsquareGmbH",
    },
    [
      {
        name: "test1",
        versions: [
          { id: "a", names: ["1.0.0"] },
          { id: "b", names: ["2.0.1"] },
          { id: "c", names: ["3.0.1-alpha01"] },
          { id: "d", names: ["v3.10.2"] },
        ],
      },
    ]
  )

  expect(result[0].versions).toHaveLength(3)
  expect(result[0].versions.map((it) => it.id)).toEqual(["a", "c", "d"])
})

test("filters based on regex", () => {
  const result = processPackages(
    {
      names: ["test", "test2"],
      versionPattern: /^.*-test$/,
      keep: 0,
      token: "token",
      dryRun: true,
      user: "user",
      organization: "",
      owner: "SmartsquareGmbH",
    },
    [
      {
        name: "test",
        versions: [
          { id: "a", names: ["2-test"] },
          { id: "b", names: ["1"] },
        ],
      },
      {
        name: "test2",
        versions: [
          { id: "c", names: ["2-test"] },
          { id: "d", names: ["1-test"] },
        ],
      },
    ]
  )

  expect(result).toHaveLength(2)
  expect(result[0].name).toEqual("test")
  expect(result[0].versions.map((it) => it.id)).toEqual(["a"])
  expect(result[1].name).toEqual("test2")
  expect(result[1].versions.map((it) => it.id)).toEqual(["c", "d"])
})

test("respects keep", () => {
  const result = processPackages(
    {
      names: ["test", "test2"],
      versionPattern: /^.*$/,
      keep: 2,
      token: "token",
      dryRun: true,
      user: "user",
      organization: "",
      owner: "SmartsquareGmbH",
    },
    [
      {
        name: "test",
        versions: [
          { id: "a", names: ["3"] },
          { id: "b", names: ["2"] },
          { id: "c", names: ["1"] },
        ],
      },
      {
        name: "test2",
        versions: [
          { id: "d", names: ["1"] },
          { id: "e", names: ["1"] },
        ],
      },
    ]
  )

  expect(result).toHaveLength(1)
  expect(result[0].name).toEqual("test")
  expect(result[0].versions.map((it) => it.id)).toEqual(["c"])
})

test("filters with multiple names", () => {
  const result = processPackages(
    {
      names: ["test", "test2"],
      versionPattern: /^.*-test$/,
      keep: 0,
      token: "token",
      dryRun: true,
      user: "user",
      organization: "",
      owner: "SmartsquareGmbH",
    },
    [
      {
        name: "test",
        versions: [
          { id: "a", names: ["2"] },
          { id: "b", names: ["1", "1-test"] },
        ],
      },
      {
        name: "test2",
        versions: [
          { id: "c", names: ["2"] },
          { id: "d", names: ["1"] },
        ],
      },
    ]
  )

  expect(result).toHaveLength(1)
  expect(result[0].name).toEqual("test")
  expect(result[0].versions.map((it) => it.id)).toEqual(["b"])
})
