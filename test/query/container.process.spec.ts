import { RestEndpointMethodTypes } from "@octokit/plugin-rest-endpoint-methods/dist-types/generated/parameters-and-response-types"
import { processContainerResponse } from "../../src/query/container.process"

const testResponse: RestEndpointMethodTypes["packages"]["getAllPackageVersionsForPackageOwnedByOrg"]["response"] = {
  status: 200,
  url: "https://api.github.com/orgs/test/packages/container/test/versions?per_page=100",
  headers: {
    "content-type": "application/json; charset=utf-8",
  },
  data: [
    {
      id: 37433327,
      name: "sha256:43d9751f33d00ac62b18f4130a13e84d1b4356cad0b22a00844966b11b5efcf2",
      url: "https://api.github.com/orgs/test/packages/container/test/versions/37433327",
      package_html_url: "https://github.com/orgs/test/packages/container/package/test",
      created_at: "2022-08-19T16:20:14Z",
      updated_at: "2022-08-19T16:20:14Z",
      html_url: "https://github.com/orgs/test/packages/container/test/37433327",
      metadata: {
        package_type: "container",
        container: {
          tags: ["1.0.0-RC3"],
        },
      },
    },
    {
      id: 36390165,
      name: "sha256:4732cd5b273aeda2b5863e682baf32734f9d8d79110e6a2fcd8db93835adade5",
      url: "https://api.github.com/orgs/test/packages/container/test/versions/36390165",
      package_html_url: "https://github.com/orgs/test/packages/container/package/test",
      created_at: "2022-08-18T09:28:24Z",
      updated_at: "2022-08-18T09:28:24Z",
      html_url: "https://github.com/orgs/test/packages/container/test/36390165",
      metadata: {
        package_type: "container",
        container: {
          tags: ["1.0.0-RC2"],
        },
      },
    },
    {
      id: 35914491,
      name: "sha256:83befca9a3143a866d4b1e473d8e46323b1791ed214c87f45ed32ede359dea1a",
      url: "https://api.github.com/orgs/test/packages/container/test/versions/35914491",
      package_html_url: "https://github.com/orgs/test/packages/container/package/test",
      created_at: "2022-08-17T12:53:06Z",
      updated_at: "2022-08-17T12:53:06Z",
      html_url: "https://github.com/orgs/test/packages/container/test/35914491",
      metadata: {
        package_type: "container",
        container: {
          tags: ["1.0.0-RC1", "1.0.0-beta1"],
        },
      },
    },
  ],
}

test("process container response", () => {
  const result = processContainerResponse("test", testResponse)

  expect(result).toEqual({
    name: "test",
    versions: [
      {
        id: "37433327",
        names: ["1.0.0-RC3"],
      },
      {
        id: "36390165",
        names: ["1.0.0-RC2"],
      },
      {
        id: "35914491",
        names: ["1.0.0-RC1", "1.0.0-beta1"],
      },
    ],
  })
})
