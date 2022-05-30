import { DefaultDeleteStrategy } from "../../src/delete/delete.strategy"
import { decideDeleteStrategy } from "../../src/delete/delete.strategy.factory"
import { Input } from "../../src/types"

test("decide default delete strategy", () => {
  const input: Input = {
    names: ["test"],
    versionPattern: /.*/,
    keep: 0,
    token: "",
    dryRun: false,
    user: "user",
    organization: "",
    owner: "",
    repo: "",
  }

  expect(decideDeleteStrategy(input)).toBeInstanceOf(DefaultDeleteStrategy)
})
