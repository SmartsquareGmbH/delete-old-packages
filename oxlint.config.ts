import { defineConfig } from "oxlint"

export default defineConfig({
  ignorePatterns: ["dist"],
  options: {
    maxWarnings: 0,
    typeAware: true,
  },
  overrides: [
    {
      files: ["test/**.ts"],
      rules: { "unbound-method": "off" },
    },
  ],
})
