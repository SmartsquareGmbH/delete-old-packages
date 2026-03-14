import type { Configuration } from "lint-staged"

export default {
  "*.{js,ts}": ["prettier --write", "oxlint --fix"],
} satisfies Configuration
