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
| `repo`            | Repo containing the package(s)                             |                    | Set by GitHub |
| `user`            | User containing the package(s)                             |                    |               |
| `organization`    | Organization containing the package(s)                     |                    |               |
| `names`           | Names of the package(s)                                    | :heavy_check_mark: |               |
| `type`            | The type of package (e.g. npm)                             |                    |               |
| `semver-pattern`  | [Semver](https://semver.org) range of the versions         |                    | `^.+$`        |
| `version-pattern` | Regex pattern of the versions                              |                    |               |
| `keep`            | Number of versions to exclude from deletions               |                    | 2             |
| `token`           | Token with the necessary scopes to delete package versions |                    | Set by GitHub |
| `dry-run`         | If the action should only print what it would do           |                    | `false`       |

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
  names: |
    package-1
    package-2
```

> Delete old versions of the packages "package-1" and "package-2" for the organization "my-organization".

```yaml
uses: smartsquaregmbh/delete-old-packages@v0.6.0
with:
  organization: my-organization
  names: |
    package-1
    package-2
```

> Delete old versions in the form of "1.0.0-RC1" of the package "package".

```yaml
uses: smartsquaregmbh/delete-old-packages@v0.6.0
with:
  version-pattern: "^\\d+\\.\\d+\\.\\d+-RC\\d+$" # The regex needs to be escaped!
  names: |
    package
```

> Delete old versions with a lower semver version than 2.x of the package "package".

```yaml
uses: smartsquaregmbh/delete-old-packages@v0.6.0
with:
  semver-pattern: "<2.x"
  names: |
    package
```

> Delete old versions of the package "package" but keep at least 5 versions.

```yaml
uses: smartsquaregmbh/delete-old-packages@v0.6.0
with:
  keep: 5
  names: |
    package
```

### ghcr.io, nuget.pkg.github.com and npm.pkg.github.com packages

As of version v0.5.0 this action is able to delete [ghcr.io](https://ghcr.io/) packages. With version
v0.6.0 [npm.pkg.github.com](https://npm.pkg.github.com) packages are also possible. Version 0.7.0 brings [nuget.pkg.github.com](https://nuget.pkg.github.com) support. Since these packages are not
integrated (yet) into the APIs this action is using normally, a few additional options are required:

- The `type` needs to be set to `container`, `npm` or `nuget`.
- A
  [`token`](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)
  is required with at least the `repo`, `write:packages` and `delete:packages` permissions.
- Either an `organization` or an `user` needs to be set. Packages bound to a repository do not work.

#### Example

```yaml
uses: smartsquaregmbh/delete-old-packages@v0.6.0
with:
  token: ${{ secrets.GH_ACCESS_TOKEN }}
  organization: my-organization
  type: container
  names: |
    package
```

### Rate limit

When using this action with many packages and/or versions you might encounter an error like "API rate limit exceeded".
This happens because the GitHub APIs we use only allow a specific number of requests. Due to the way the APIs are
structured, we need to make a request for every package version that is found. If you have hundreds of versions, this
will hit the limit.

This is not a big problem though. The action will delete as many versions as it can and will delete more the next time
it is run. Simply wait a few minutes and run the action again until all versions you want to delete have been processed. 
