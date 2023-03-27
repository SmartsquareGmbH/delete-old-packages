# Delete old packages

GitHub action for deleting old versions of packages in the GitHub package registry.

This is very similar to [actions/delete-package-versions](https://github.com/actions/delete-package-versions)
but targets a different use case.

The action works by getting at most 20 packages with at most the oldest 100 versions of each, applying the filters (see
table below) on them and then deleting the matching versions.

> If you have more than 100 versions and none of the 100 oldest versions match, no packages will be deleted!

### Inputs

| Name              | Description                                                | Required           | Default       |
|-------------------|------------------------------------------------------------|--------------------|---------------|
| `owner`           | Owner of the repo containing the package(s)                |                    | Set by GitHub |
| `user`            | User containing the package(s)                             |                    |               |
| `organization`    | Organization containing the package(s)                     |                    |               |
| `names`           | Names of the package(s)                                    | :heavy_check_mark: |               |
| `type`            | The type of package (e.g. npm)                             | :heavy_check_mark: |               |
| `semver-pattern`  | [Semver](https://semver.org) range of the versions         |                    | `^.+$`        |
| `version-pattern` | Regex pattern of the versions                              |                    |               |
| `keep`            | Number of versions to exclude from deletions               |                    | 2             |
| `token`           | Token with the necessary scopes to delete package versions |                    | Set by GitHub |
| `dry-run`         | If the action should only print what it would do           |                    | `false`       |
| `rate-limit`      | Do you want to enable rate limiting                        |                    | `false`       |

> :warning: Certain options can not be combined with each other and will lead to errors. These are:
> - `user`, `owner`/`repo` and `organization`.
> - `semver-pattern` and `version-pattern`.

Supported package types as of the current version are: `npm`, `maven`, `rubygems`, `docker`, `nuget` and `container`.
The type is optional and by default unset, but depending on the given type, the action may behave differently.
See [ghcr.io and npm.pkg.github.com packages](#ghcrio-and-npmpkggithubcom-packages).

### Example usage

> Delete old versions of the packages "package-1" and "package-2" for the current repository.

```yaml
uses: smartsquaregmbh/delete-old-packages@v0.6.0
with:
  type: npm
  names: |
    package-1
    package-2
```

> Delete old versions of the packages "package-1" and "package-2" for the organization "my-organization".

```yaml
uses: smartsquaregmbh/delete-old-packages@v0.6.0
with:
  type: npm
  organization: my-organization
  names: |
    package-1
    package-2
```

> Delete old versions in the form of "1.0.0-RC1" of the package "package".

```yaml
uses: smartsquaregmbh/delete-old-packages@v0.6.0
with:
  type: npm
  version-pattern: "^\\d+\\.\\d+\\.\\d+-RC\\d+$" # The regex needs to be escaped!
  names: |
    package
```

> Delete old versions with a lower semver version than 2.x of the package "package".

```yaml
uses: smartsquaregmbh/delete-old-packages@v0.6.0
with:
  type: npm
  semver-pattern: "<2.x"
  names: |
    package
```

> Delete old versions of the package "package" but keep at least 5 versions.

```yaml
uses: smartsquaregmbh/delete-old-packages@v0.6.0
with:
  type: npm
  keep: 5
  names: |
    package
```

### Rate limit

When using this action with many packages and/or versions you might encounter an error like "API rate limit exceeded".
Internally, the action uses a plugin for octokit which automatically retries requests when the rate limit is exceeded.
In these cases, the rate limit `retry after` returned from the github api during a request is used to wait before retrying, up to five times.
If the rate limit is exceeded more than five times, the action will fail.

```yaml
uses: smartsquaregmbh/delete-old-packages@v0.6.0
with:
  type: npm
  rate-limit: true
  keep: 5
  names: |
    package
```