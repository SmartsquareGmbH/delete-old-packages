import { Input } from "../types"
import { Octokit } from "@octokit/core"
import { throttling } from "@octokit/plugin-throttling"
import { getOctokit } from "@actions/github"
import { GitHub } from "@actions/github/lib/utils"
import { RequestOptions } from "@octokit/types"
import { info, warning } from "@actions/core"

export function createPackagesClient(input: Input): InstanceType<typeof GitHub> {
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
