export default {
  "!(*.{js,ts})": "oxfmt --no-error-on-unmatched-pattern",
  "*.{js,ts}": ["oxfmt --no-error-on-unmatched-pattern", "oxlint --fix", () => "tsgo --noEmit"],
}
