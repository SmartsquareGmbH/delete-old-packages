import {Input} from "../types"
import { Octokit } from "@octokit/core"
import { throttling } from "@octokit/plugin-throttling"
import { getOctokit } from "@actions/github"
import { GitHub } from "@actions/github/lib/utils"
import { RequestOptions } from "@octokit/types"
import { info, warning } from "@actions/core"

export class PackagesClient {
  
  public client: InstanceType<typeof GitHub>
  
  constructor(input: Input) {
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
            warning(`Request quota exhausted for request ${options.method} ${options.url}`)

            // Retry five times after hitting a rate limit error, then give up
            if (options.request?.retryCount <= 5) {
              info(`Retrying after ${retryAfter} seconds!`)
              return true
            }
          },
          onSecondaryRateLimit: (retryAfter: number, options: RequestOptions) => {
            warning(`Request quota exhausted for request ${options.method} ${options.url}`)

            // Retry five times after hitting a rate limit error, then give up
            if (options.request?.retryCount <= 5) {
              info(`Retrying after ${retryAfter} seconds!`)
              return true
            }
          },
          onAbuseLimit: (retryAfter: number, options: RequestOptions) => {
            // does not retry, only logs a warning
            warning(`Abuse detected for request ${options.method} ${options.url}`)
          },
        },
      })
    }
    
    this.client = getOctokit(input.token, { Octokit: customOctokit })
  } 
}
