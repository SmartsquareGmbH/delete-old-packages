const Input = require("../input")

test("valid input - no version", () => {
  const input = new Input("owner", "repo", ["package"], ".*", "2", "token")

  expect(input.owner).toBe("owner")
  expect(input.version).toBeNull()
})

test("valid input - with version", () => {
  const input = new Input("owner", "repo", ["package"], ".*", "2", "token", "foo-bar")

  expect(input.owner).toBe("owner")
  expect(input.version).toBe("foo-bar")
})

test("invalid owner", () => {
  expect(() => {
    new Input("", "repo", ["package"], ".*", 2, "token")
  }).toThrow()
})

test("invalid repo", () => {
  expect(() => {
    new Input("owner", "", ["package"], ".*", 2, "token")
  }).toThrow()
})

test("invalid names", () => {
  expect(() => {
    new Input("owner", "repo", [], ".*", 2, "token")
  }).toThrow()

  expect(() => {
    new Input(
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
    new Input("owner", "repo", ["package"], "[", 2, "token")
  }).toThrow()
})

test("invalid keep", () => {
  expect(() => {
    new Input("owner", "repo", ["package"], ".*", -1, "token")
  }).toThrow()

  expect(() => {
    new Input("owner", "repo", ["package"], ".*", 101, "token")
  }).toThrow()
})

test("invalid token", () => {
  expect(() => {
    new Input("owner", "repo", ["package"], ".*", 2, "")
  }).toThrow()
})
