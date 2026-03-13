import { getOctokit } from "@actions/github"
import { http, HttpResponse } from "msw"
import { setupServer } from "msw/node"
import { Range } from "semver"
import { afterAll, afterEach, beforeAll, describe, expect, test } from "vitest"
import { executeAction } from "../../src/action.js"
import OrganizationDeleteStrategy from "../../src/delete/strategies/organization.delete.strategy.js"
import UserDeleteStrategy from "../../src/delete/strategies/user.delete.strategy.js"
import { OctokitPackageVersion } from "../../src/process/process.js"
import OrganizationQueryStrategy from "../../src/query/strategies/organization.query.strategy.js"
import UserQueryStrategy from "../../src/query/strategies/user.query.strategy.js"
import { Input, PackageType } from "../../src/types.js"

const BASE_URL = "https://api.github.com"

type VersionsParams = { username: string; type: string; name: string }
type DeleteVersionParams = VersionsParams & { versionId: string }
type OrgVersionsParams = { org: string; type: string; name: string }
type OrgDeleteVersionParams = OrgVersionsParams & { versionId: string }

type DeletedVersion = { packageName: string; versionId: number }
type DeletedPackage = { packageName: string }

let deletedVersions: DeletedVersion[] = []
let deletedPackages: DeletedPackage[] = []

function packageVersion(type: PackageType, id: number, name: string, tags: string[] = []): OctokitPackageVersion {
  return {
    id: id,
    name: name,
    url: "",
    package_html_url: "",
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-01T00:00:00Z",
    html_url: "",
    metadata: {
      package_type: type,
      container: { tags },
    },
  }
}

function npmVersion(id: number, name: string) {
  return packageVersion(PackageType.Npm, id, name)
}

function containerVersion(id: number, name: string, tags: string[]) {
  return packageVersion(PackageType.Container, id, name, tags)
}

function createOctokit() {
  return getOctokit("test", { request: { fetch } })
}

const server = setupServer()

beforeAll(() => server.listen({ onUnhandledRequest: "error" }))
afterEach(() => {
  server.resetHandlers()
  deletedVersions = []
  deletedPackages = []
})
afterAll(() => server.close())

describe("user packages", () => {
  function setupUserHandlers(packageResponses: Record<string, OctokitPackageVersion[]>) {
    server.use(
      http.get<VersionsParams>(`${BASE_URL}/users/:username/packages/:type/:name/versions`, ({ params }) => {
        const versions = packageResponses[params.name] ?? []
        return HttpResponse.json(versions)
      }),
      http.delete<DeleteVersionParams>(
        `${BASE_URL}/users/:username/packages/:type/:name/versions/:versionId`,
        ({ params }) => {
          deletedVersions.push({ packageName: params.name, versionId: Number(params.versionId) })
          return new HttpResponse(null, { status: 204 })
        },
      ),
      http.delete<VersionsParams>(`${BASE_URL}/users/:username/packages/:type/:name`, ({ params }) => {
        deletedPackages.push({ packageName: params.name })
        return new HttpResponse(null, { status: 204 })
      }),
    )
  }

  test("deletes only versions matching version-pattern", async () => {
    setupUserHandlers({
      "my-package": [npmVersion(1, "1.0.0"), npmVersion(2, "1.1.0"), npmVersion(3, "2.0.0")],
    })

    const octokit = createOctokit()
    const input: Input = {
      names: ["my-package"],
      versionPattern: /^1\./,
      keep: 0,
      token: "test",
      dryRun: false,
      user: "user",
      organization: "",
      type: PackageType.Npm,
    }

    await executeAction(input, new UserQueryStrategy(octokit), new UserDeleteStrategy(octokit))

    expect(deletedVersions).toEqual([
      { packageName: "my-package", versionId: 1 },
      { packageName: "my-package", versionId: 2 },
    ])
    expect(deletedPackages).toHaveLength(0)
  })

  test("deletes container versions by matching tags", async () => {
    setupUserHandlers({
      "my-image": [
        containerVersion(10, "sha256:abc123", ["v1.0.0", "latest"]),
        containerVersion(11, "sha256:def456", ["v1.1.0"]),
        containerVersion(12, "sha256:ghi789", ["v2.0.0"]),
      ],
    })

    const octokit = createOctokit()
    const input: Input = {
      names: ["my-image"],
      versionPattern: /^v1\./,
      keep: 0,
      token: "test",
      dryRun: false,
      user: "user",
      organization: "",
      type: PackageType.Container,
    }

    await executeAction(input, new UserQueryStrategy(octokit), new UserDeleteStrategy(octokit))

    expect(deletedVersions).toEqual([
      { packageName: "my-image", versionId: 10 },
      { packageName: "my-image", versionId: 11 },
    ])
  })

  test("skips untagged container versions and deletes entire package when only one tagged version exists", async () => {
    setupUserHandlers({
      "my-image": [containerVersion(10, "sha256:abc123", ["v1.0.0"]), containerVersion(11, "sha256:def456", [])],
    })

    const octokit = createOctokit()
    const input: Input = {
      names: ["my-image"],
      keep: 0,
      token: "test",
      dryRun: false,
      user: "user",
      organization: "",
      type: PackageType.Container,
    }

    await executeAction(input, new UserQueryStrategy(octokit), new UserDeleteStrategy(octokit))

    expect(deletedVersions).toHaveLength(0)
    expect(deletedPackages).toEqual([{ packageName: "my-image" }])
  })

  test("keeps the newest versions according to keep parameter", async () => {
    setupUserHandlers({
      "my-package": [
        npmVersion(1, "1.0.0"),
        npmVersion(2, "1.1.0"),
        npmVersion(3, "1.2.0"),
        npmVersion(4, "1.3.0"),
        npmVersion(5, "1.4.0"),
      ],
    })

    const octokit = createOctokit()
    const input: Input = {
      names: ["my-package"],
      keep: 2,
      token: "test",
      dryRun: false,
      user: "user",
      organization: "",
      type: PackageType.Npm,
    }

    await executeAction(input, new UserQueryStrategy(octokit), new UserDeleteStrategy(octokit))

    const deletedIds = deletedVersions.map((d) => d.versionId)
    expect(deletedIds).toEqual([3, 4, 5])
  })

  test("dry run does not delete anything", async () => {
    setupUserHandlers({
      "my-package": [npmVersion(1, "1.0.0"), npmVersion(2, "2.0.0")],
    })

    const octokit = createOctokit()
    const input: Input = {
      names: ["my-package"],
      keep: 0,
      token: "test",
      dryRun: true,
      user: "user",
      organization: "",
      type: PackageType.Npm,
    }

    await executeAction(input, new UserQueryStrategy(octokit), new UserDeleteStrategy(octokit))

    expect(deletedVersions).toHaveLength(0)
    expect(deletedPackages).toHaveLength(0)
  })

  test("deletes entire package when it has only one version", async () => {
    setupUserHandlers({
      "my-package": [npmVersion(1, "1.0.0")],
    })

    const octokit = createOctokit()
    const input: Input = {
      names: ["my-package"],
      keep: 0,
      token: "test",
      dryRun: false,
      user: "user",
      organization: "",
      type: PackageType.Npm,
    }

    await executeAction(input, new UserQueryStrategy(octokit), new UserDeleteStrategy(octokit))

    expect(deletedVersions).toHaveLength(0)
    expect(deletedPackages).toEqual([{ packageName: "my-package" }])
  })

  test("does not delete anything when no versions match filter", async () => {
    setupUserHandlers({
      "my-package": [npmVersion(1, "1.0.0"), npmVersion(2, "2.0.0")],
    })

    const octokit = createOctokit()
    const input: Input = {
      names: ["my-package"],
      versionPattern: /^3\./,
      keep: 0,
      token: "test",
      dryRun: false,
      user: "user",
      organization: "",
      type: PackageType.Npm,
    }

    await executeAction(input, new UserQueryStrategy(octokit), new UserDeleteStrategy(octokit))

    expect(deletedVersions).toHaveLength(0)
    expect(deletedPackages).toHaveLength(0)
  })

  test("deletes matching versions from multiple packages independently", async () => {
    setupUserHandlers({
      "pkg-a": [npmVersion(1, "1.0.0"), npmVersion(2, "2.0.0")],
      "pkg-b": [npmVersion(3, "1.0.0"), npmVersion(4, "3.0.0")],
    })

    const octokit = createOctokit()
    const input: Input = {
      names: ["pkg-a", "pkg-b"],
      versionPattern: /^1\./,
      keep: 0,
      token: "test",
      dryRun: false,
      user: "user",
      organization: "",
      type: PackageType.Npm,
    }

    await executeAction(input, new UserQueryStrategy(octokit), new UserDeleteStrategy(octokit))

    expect(deletedVersions).toEqual([
      { packageName: "pkg-a", versionId: 1 },
      { packageName: "pkg-b", versionId: 3 },
    ])
  })

  test("deletes only versions matching semver pattern", async () => {
    setupUserHandlers({
      "my-package": [npmVersion(1, "1.0.0"), npmVersion(2, "1.5.0"), npmVersion(3, "2.0.0"), npmVersion(4, "3.0.0")],
    })

    const octokit = createOctokit()
    const input: Input = {
      names: ["my-package"],
      semverPattern: new Range(">=2.0.0"),
      keep: 0,
      token: "test",
      dryRun: false,
      user: "user",
      organization: "",
      type: PackageType.Npm,
    }

    await executeAction(input, new UserQueryStrategy(octokit), new UserDeleteStrategy(octokit))

    expect(deletedVersions).toEqual([
      { packageName: "my-package", versionId: 3 },
      { packageName: "my-package", versionId: 4 },
    ])
  })

  test("propagates API errors", async () => {
    server.use(
      http.get(`${BASE_URL}/users/:username/packages/:type/:name/versions`, () => {
        return HttpResponse.json({ message: "Not Found" }, { status: 404 })
      }),
    )

    const octokit = createOctokit()
    const input: Input = {
      names: ["nonexistent"],
      keep: 0,
      token: "test",
      dryRun: false,
      user: "user",
      organization: "",
      type: PackageType.Npm,
    }

    await expect(
      executeAction(input, new UserQueryStrategy(octokit), new UserDeleteStrategy(octokit)),
    ).rejects.toThrow()
  })
})

describe("organization packages", () => {
  function setupOrgHandlers(packageResponses: Record<string, OctokitPackageVersion[]>) {
    server.use(
      http.get<OrgVersionsParams>(`${BASE_URL}/orgs/:org/packages/:type/:name/versions`, ({ params }) => {
        const versions = packageResponses[params.name] ?? []
        return HttpResponse.json(versions)
      }),
      http.delete<OrgDeleteVersionParams>(
        `${BASE_URL}/orgs/:org/packages/:type/:name/versions/:versionId`,
        ({ params }) => {
          deletedVersions.push({ packageName: params.name, versionId: Number(params.versionId) })
          return new HttpResponse(null, { status: 204 })
        },
      ),
      http.delete<OrgVersionsParams>(`${BASE_URL}/orgs/:org/packages/:type/:name`, ({ params }) => {
        deletedPackages.push({ packageName: params.name })
        return new HttpResponse(null, { status: 204 })
      }),
    )
  }

  test("deletes all versions of an organization package", async () => {
    setupOrgHandlers({
      "org-package": [npmVersion(1, "1.0.0"), npmVersion(2, "2.0.0")],
    })

    const octokit = createOctokit()
    const input: Input = {
      names: ["org-package"],
      keep: 0,
      token: "test",
      dryRun: false,
      user: "",
      organization: "myorg",
      type: PackageType.Npm,
    }

    await executeAction(input, new OrganizationQueryStrategy(octokit), new OrganizationDeleteStrategy(octokit))

    expect(deletedVersions).toEqual([
      { packageName: "org-package", versionId: 1 },
      { packageName: "org-package", versionId: 2 },
    ])
  })

  test("deletes entire org package when it has only one version", async () => {
    setupOrgHandlers({
      "org-package": [npmVersion(1, "1.0.0")],
    })

    const octokit = createOctokit()
    const input: Input = {
      names: ["org-package"],
      keep: 0,
      token: "test",
      dryRun: false,
      user: "",
      organization: "myorg",
      type: PackageType.Npm,
    }

    await executeAction(input, new OrganizationQueryStrategy(octokit), new OrganizationDeleteStrategy(octokit))

    expect(deletedVersions).toHaveLength(0)
    expect(deletedPackages).toEqual([{ packageName: "org-package" }])
  })
})
