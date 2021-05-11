# Delete old packages

Github action for deleting old versions of packages in the Github package registry.

This is very similar to [actions/delete-package-versions](https://github.com/actions/delete-package-versions)
but targets a different use case.

The action works by getting at most 20 packages with at most the oldest 100 versions of each, applying the filters (see
table below) on them and then deleting the matching versions.

> If you have more than 100 versions and none of the 100 oldest versions match, no packages will be deleted!

### Inputs

| Name              | Description                                                | Required           | Default       |
| ----------------- | ---------------------------------------------------------- | ------------------ | ------------- |
| `owner`           | Owner of the repo containing the package(s)                | :x:                | Set by Github |
| `repo`            | Repo containing the package(s)                             | :x:                | Set by Github |
| `user`            | User containing the package(s)                             | :x:                | :x:           |
| `organization`    | Organization containing the package(s)                     | :x:                | :x:           |
| `names`           | Names of the packages                                      | :heavy_check_mark: | :x:           |
| `semver-pattern`  | [Semver](https://semver.org/) range of the versions        | :x:                | `^.+$`        |
| `version-pattern` | Regex pattern of the versions                              | :x:                | :x:           |
| `version`         | Specific version to delete                                 | :x:                | :x:           |
| `keep`            | Number of versions to exclude from deletions               | :x:                | 2             |
| `token`           | Token with the necessary scopes to delete package versions | :x:                | Set by Github |
| `dry-run`         | If the action should only print what it would do.          | :x:                | `false`       |
| `version-query-order`         | Where to start looking for version regex matches. Default is "last". You can pick "first".         | :x:                | `last`       |

> :warning: You can provide _either_ `owner` and `repo`, `user` or `organization`. An error is thrown for invalid combinations.

> :warning: You can provide _either_ `version`, `semver-pattern` or `version-pattern`. An error is thrown for invalid combinations.

> :warning: `keep` can not be set when `version` is set.

### Example usage

> Delete old versions of the packages "package-1" and "package-2" for the current repository.

```yaml
uses: smartsquaregmbh/delete-old-packages@v0.3.1
with:
  names: |
    package-1
    package-2
```

> Delete old versions of the packages "package-1" and "package-2" for the organization "my-organization".

```yaml
uses: smartsquaregmbh/delete-old-packages@v0.3.1
with:
  organization: my-organization
  names: |
    package-1
    package-2
```

> Delete old versions in the form of "1.0.0-RC1" of the package "package".

```yaml
uses: smartsquaregmbh/delete-old-packages@v0.3.1
with:
  version-pattern: "^\\d+\\.\\d+\\.\\d+-RC\\d+$" # The regex needs to be escaped!
  names: |
    package
```

> Delete old versions with a lower semver version than 2.x of the package "package".

```yaml
uses: smartsquaregmbh/delete-old-packages@v0.3.1
with:
  semver-pattern: "<2.x"
  names: |
    package
```

> Delete old versions of the package "package" but keep at least 5 versions.

```yaml
uses: smartsquaregmbh/delete-old-packages@v0.3.1
with:
  keep: 5
  names: |
    package
```

> Delete version `foo-bar` of the package "package".

```yaml
uses: smartsquaregmbh/delete-old-packages@v0.3.1
with:
  version: foo-bar
  names: |
    package
```
