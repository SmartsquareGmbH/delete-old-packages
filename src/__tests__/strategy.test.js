const Strategy = require("../strategy/strategy.js")

test("valid strategy - no version", () => {
  const strategy = new Strategy(["package"], "", ".*", "2", "token")

  expect(strategy.names).toEqual(["package"])
  expect(strategy.version).toBeNull()
})

test("valid strategy - with version", () => {
  const strategy = new Strategy(["package"], "foo-bar", "", "", "token")

  expect(strategy.version).toEqual("foo-bar")
  expect(strategy.versionPattern).toBeNull()
  expect(strategy.keep).toBeNull()
})

test("invalid strategy - with version and keep", () => {
  expect(() => {
    new Strategy(["package"], "foo-bar", "", "2", "token")
  }).toThrow()
})

test("invalid strategy - with version and version-pattern", () => {
  expect(() => {
    new Strategy(["package"], "foo-bar", ".*", "", "token")
  }).toThrow()
})

test("invalid strategy - with version and version-pattern and keep", () => {
  expect(() => {
    new Strategy(["package"], "foo-bar", ".*", "2", "token")
  }).toThrow()
})

test("invalid owner", () => {
  expect(() => {
    new Strategy("", "repo", ["package"], "", ".*", 2, "token")
  }).toThrow()
})

test("invalid names", () => {
  expect(() => {
    new Strategy([], "", ".*", 2, "token")
  }).toThrow()

  expect(() => {
    new Strategy(
      "owner",
      "repo",
      [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
      ],
      ".*",
      2,
      "token"
    )
  }).toThrow()
})

test("invalid regex", () => {
  expect(() => {
    new Strategy(["package"], "", "[", 2, "token")
  }).toThrow()
})

test("invalid keep", () => {
  expect(() => {
    new Strategy(["package"], "", ".*", -1, "token")
  }).toThrow()

  expect(() => {
    new Strategy(["package"], "", ".*", 101, "token")
  }).toThrow()
})

test("invalid token", () => {
  expect(() => {
    new Strategy(["package"], "", ".*", 2, "")
  }).toThrow()
})
