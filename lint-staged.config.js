export default {
  "!(dist/*).{js,mjs,cjs,ts}": ["prettier --write", "eslint --max-warnings 0 --fix"],
}
