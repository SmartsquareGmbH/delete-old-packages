module.exports = {
  root: true,
  parserOptions: {
    parser: "@typescript-eslint/parser",
    project: "tsconfig.json",
  },
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "prettier",
  ],
  overrides: [
    {
      files: ["test/**/*.ts"],
      rules: {
        "@typescript-eslint/unbound-method": "off",
      },
    },
  ],
}
