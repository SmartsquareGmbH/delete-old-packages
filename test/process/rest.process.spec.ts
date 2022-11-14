import { RestEndpointMethodTypes } from "@octokit/plugin-rest-endpoint-methods/dist-types/generated/parameters-and-response-types"
import { processRestResponse } from "../../src/process/rest.process"

const containerTestResponse: RestEndpointMethodTypes["packages"]["getAllPackageVersionsForPackageOwnedByOrg"]["response"] =
  {
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

const npmTestResponse: RestEndpointMethodTypes["packages"]["getAllPackageVersionsForPackageOwnedByUser"]["response"] = {
  status: 200,
  url: "https://api.github.com/users/test/packages/npm/test/versions?per_page=100",
  headers: {
    "content-type": "application/json; charset=utf-8",
  },
  data: [
    {
      id: 50253897,
      name: "2.0.0",
      url: "https://api.github.com/users/test/packages/npm/test/versions/50253897",
      package_html_url: "https://github.com/users/test/packages/npm/package/test",
      license: "MIT",
      created_at: "2022-11-14T10:45:09Z",
      updated_at: "2022-11-14T10:45:09Z",
      html_url: "https://github.com/users/test/packages/npm/test/50253897",
      metadata: {
        package_type: "npm",
      },
    },
    {
      id: 50253886,
      name: "1.1.0",
      url: "https://api.github.com/users/test/packages/npm/test/versions/50253886",
      package_html_url: "https://github.com/users/test/packages/npm/package/test",
      license: "MIT",
      created_at: "2022-11-14T10:45:02Z",
      updated_at: "2022-11-14T10:45:02Z",
      html_url: "https://github.com/users/test/packages/npm/test/50253886",
      metadata: {
        package_type: "npm",
      },
    },
    {
      id: 50253872,
      name: "1.0.1",
      url: "https://api.github.com/users/test/packages/npm/test/versions/50253872",
      package_html_url: "https://github.com/users/test/packages/npm/package/test",
      license: "MIT",
      created_at: "2022-11-14T10:44:55Z",
      updated_at: "2022-11-14T10:44:55Z",
      html_url: "https://github.com/users/test/packages/npm/test/50253872",
      metadata: {
        package_type: "npm",
      },
    },
    {
      id: 50253861,
      name: "1.0.0",
      url: "https://api.github.com/users/test/packages/npm/test/versions/50253861",
      package_html_url: "https://github.com/users/test/packages/npm/package/test",
      license: "MIT",
      created_at: "2022-11-14T10:44:49Z",
      updated_at: "2022-11-14T10:44:49Z",
      html_url: "https://github.com/users/test/packages/npm/test/50253861",
      metadata: {
        package_type: "npm",
      },
    },
  ],
}

test("process rest container response", () => {
  const result = processRestResponse("test", containerTestResponse)

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

test("process rest npm response", () => {
  const result = processRestResponse("test", npmTestResponse)

  expect(result).toEqual({
    name: "test",
    versions: [
      {
        id: "50253897",
        names: ["2.0.0"],
      },
      {
        id: "50253886",
        names: ["1.1.0"],
      },
      {
        id: "50253872",
        names: ["1.0.1"],
      },
      {
        id: "50253861",
        names: ["1.0.0"],
      },
    ],
  })
})
