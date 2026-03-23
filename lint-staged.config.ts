export default {
  "!(*.{js,ts})": "oxfmt --no-error-on-unmatched-pattern",
  "*.{js,ts}": ["oxfmt", "oxlint --fix", () => "tsgo --noEmit"],
}
