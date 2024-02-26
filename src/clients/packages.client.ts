import { info, warning } from "@actions/core"
import { getOctokit } from "@actions/github"
import { Octokit } from "@octokit/core"
import { throttling } from "@octokit/plugin-throttling"
import { RequestOptions } from "@octokit/types"
import { Input } from "../types.js"

export function createPackagesClient(input: Input): ReturnType<typeof getOctokit> {
  const customClient = Octokit.plugin(throttling)

  const customOctokit = new customClient({
    auth: input.token,
    throttle: {
      enabled: true,
      onRateLimit: (retryAfter: number, options: RequestOptions) => {
        warning(`Request quota exhausted for request ${options.method} ${options.url}`)

        // Retry five times after hitting a rate limit error, then give up.
        if (options.request?.retryCount <= 5) {
          info(`Retrying after ${retryAfter} seconds!`)
          return true
        }
      },
      onSecondaryRateLimit: (retryAfter: number, options: RequestOptions) => {
        warning(`Request quota exhausted for request ${options.method} ${options.url}`)

        // Retry five times after hitting a rate limit error, then give up.
        if (options.request?.retryCount <= 5) {
          info(`Retrying after ${retryAfter} seconds!`)
          return true
        }
      },
    },
  })

  return getOctokit(input.token, { Octokit: customOctokit })
}
