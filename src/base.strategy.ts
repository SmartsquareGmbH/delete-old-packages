import { RestInput } from "./types"
import { Octokit } from "@octokit/core"
import { throttling } from "@octokit/plugin-throttling"
import { getOctokit } from "@actions/github"
import { GitHub } from "@actions/github/lib/utils"
import { RequestOptions } from "@octokit/types"

export abstract class BaseStrategy {
  protected setupClient(input: RestInput): InstanceType<typeof GitHub> {
    const customClient = Octokit.plugin(throttling)
    let customOctokit
    if (!input.rateLimit) {
      customOctokit = new customClient({ auth: input.token, throttle: { enabled: false } })
    } else {
      customOctokit = new customClient({
        auth: input.token,
        throttle: {
          enabled: true,
          onRateLimit: (retryAfter: number, options: RequestOptions) => {
            console.warn(`Request quota exhausted for request ${options.method} ${options.url}`)

            // Retry five times after hitting a rate limit error, then give up
            if (options.request?.retryCount <= 5) {
              console.log(`Retrying after ${retryAfter} seconds!`)
              return true
            }
          },
          onSecondaryRateLimit: (retryAfter: number, options: RequestOptions) => {
            console.warn(`Request quota exhausted for request ${options.method} ${options.url}`)

            // Retry five times after hitting a rate limit error, then give up
            if (options.request?.retryCount <= 5) {
              console.log(`Retrying after ${retryAfter} seconds!`)
              return true
            }
          },
          onAbuseLimit: (retryAfter: number, options: RequestOptions) => {
            // does not retry, only logs a warning
            console.warn(`Abuse detected for request ${options.method} ${options.url}`)
          },
        },
      })
    }
    return getOctokit(input.token, { Octokit: customOctokit })
  }
}
