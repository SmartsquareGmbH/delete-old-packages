import type { Configuration } from "lint-staged"

export default {
  "*.{js,ts}": ["oxfmt", "oxlint --fix"],
} satisfies Configuration
