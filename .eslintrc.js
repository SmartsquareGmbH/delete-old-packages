module.exports = {
  root: true,
  env: {
    es2020: true,
    node: true,
    jest: true,
  },
  parserOptions: {
    ecmaVersion: 2020,
  },
  extends: ["eslint:recommended", "prettier"],
  plugins: ["prettier", "jest"],
  rules: {
    "prettier/prettier": "error",
  },
}
