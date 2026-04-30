export default {
  "!(*.{js,ts})": "oxfmt --no-error-on-unmatched-pattern",
  "*.{js,ts}": [
    "oxfmt --no-error-on-unmatched-pattern",
    "oxlint --no-error-on-unmatched-pattern --fix",
    () => "tsgo --noEmit",
  ],
}
