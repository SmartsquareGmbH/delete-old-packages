import { DefaultDeleteStrategy } from "../../src/delete/delete.strategy"
import { decideDeleteStrategy } from "../../src/delete/delete.strategy.factory"
import { Input } from "../../src/types"

test("decide default delete strategy", () => {
  const input: Input = {
    names: ["test"],
    versionPattern: /.*/,
    keep: 0,
    type: "",
    token: "",
    dryRun: false,
    user: "user",
    organization: "",
    owner: "SmartsquareGmbH",
    repo: "delete-old-packages",
  }

  expect(decideDeleteStrategy(input)).toBeInstanceOf(DefaultDeleteStrategy)
})
