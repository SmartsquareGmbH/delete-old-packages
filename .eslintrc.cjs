module.exports = {
  root: true,
  parserOptions: {
    parser: "@typescript-eslint/parser",
    project: "tsconfig.json",
  },
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "jest", "prettier"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "prettier",
  ],
  rules: {
    "prettier/prettier": "error",
    "jest/unbound-method": "error",
    "@typescript-eslint/unbound-method": "off",
    "@typescript-eslint/restrict-template-expressions": "off"
  }
}
