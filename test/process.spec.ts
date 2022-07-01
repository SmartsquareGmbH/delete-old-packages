import { Range } from "semver"
import { processPackages } from "../src/process"

test("filters correctly", () => {
  const result = processPackages(
    {
      names: ["test", "test2"],
      versionPattern: /^.*$/,
      keep: 1,
      type: "",
      token: "token",
      dryRun: true,
      user: "user",
      organization: "",
      owner: "SmartsquareGmbH",
      repo: "delete-old-packages",
    },
    [
      {
        name: "test",
        versions: [
          { id: "a", version: "2" },
          { id: "b", version: "1" },
        ],
      },
      {
        name: "test2",
        versions: [
          { id: "c", version: "2" },
          { id: "d", version: "1" },
        ],
      },
    ]
  )

  expect(result).toHaveLength(2)
  expect(result[0].name).toEqual("test")
  expect(result[0].versions.map((it) => it.version)).toEqual(["1"])
  expect(result[1].name).toEqual("test2")
  expect(result[1].versions.map((it) => it.version)).toEqual(["1"])
})

test("filters based on semver", () => {
  const result = processPackages(
    {
      names: ["test", "test2"],
      semverPattern: new Range("^1 || >2.0.1 || >3 <=3.11"),
      keep: 0,
      type: "",
      token: "token",
      dryRun: true,
      user: "user",
      organization: "",
      owner: "SmartsquareGmbH",
      repo: "delete-old-packages",
    },
    [
      {
        name: "test1",
        versions: [
          { id: "a", version: "1.0.0" },
          { id: "b", version: "2.0.1" },
          { id: "c", version: "3.0.1-alpha01" },
          { id: "d", version: "v3.10.2" },
        ],
      },
    ]
  )

  expect(result[0].versions).toHaveLength(3)
  expect(result[0].versions.map((it) => it.version)).toEqual(["1.0.0", "3.0.1-alpha01", "v3.10.2"])
})

test("filters based on regex", () => {
  const result = processPackages(
    {
      names: ["test", "test2"],
      versionPattern: /^.*-test$/,
      keep: 0,
      type: "",
      token: "token",
      dryRun: true,
      user: "user",
      organization: "",
      owner: "SmartsquareGmbH",
      repo: "delete-old-packages",
    },
    [
      {
        name: "test",
        versions: [
          { id: "a", version: "2-test" },
          { id: "b", version: "1" },
        ],
      },
      {
        name: "test2",
        versions: [
          { id: "c", version: "2-test" },
          { id: "d", version: "1-test" },
        ],
      },
    ]
  )

  expect(result).toHaveLength(2)
  expect(result[0].name).toEqual("test")
  expect(result[0].versions.map((it) => it.version)).toEqual(["2-test"])
  expect(result[1].name).toEqual("test2")
  expect(result[1].versions.map((it) => it.version)).toEqual(["2-test", "1-test"])
})

test("respects keep", () => {
  const result = processPackages(
    {
      names: ["test", "test2"],
      versionPattern: /^.*$/,
      keep: 2,
      type: "",
      token: "token",
      dryRun: true,
      user: "user",
      organization: "",
      owner: "SmartsquareGmbH",
      repo: "delete-old-packages",
    },
    [
      {
        name: "test",
        versions: [{ id: "a", version: "3" }, { id: "b", version: "2" }, { id: "c", version: "1" }],
      },
      {
        name: "test2",
        versions: [{id: "d", version: "1" }, { id: "e", version: "1" }],
      },
    ],
  )

  expect(result).toHaveLength(1)
  expect(result[0].name).toEqual("test")
  expect(result[0].versions.map(it => it.version)).toEqual(["1"])
})
