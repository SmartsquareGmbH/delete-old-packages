import { getOctokit } from "@actions/github"
import { DeleteStrategy, Input } from "../../types"

// language=graphql
const mutation = `
  mutation deletePackageVersion($packageVersionId: ID!) {
    deletePackageVersion(input: {packageVersionId: $packageVersionId}) {
      success
    }
  }
`

export class DefaultDeleteStrategy implements DeleteStrategy {
  async deletePackageVersion(input: Input, name: string, id: string): Promise<void> {
    await getOctokit(input.token).graphql(mutation, {
      packageVersionId: id,
      headers: {
        Accept: "application/vnd.github.package-deletes-preview+json",
      },
    })
  }
}
