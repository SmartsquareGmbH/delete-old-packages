# Delete old packages

Github action for deleting old versions of packages in the Github package registry.

This is very similar to [actions/delete-package-versions](https://github.com/actions/delete-package-versions)
but targets a different use case.

The action works by getting at most 20 packages with at most the oldest 100 versions,
applying either the `version` or `version-pattern` and `keep` filters on them and then deleting the matching versions.

> If you have more than 100 versions and none of the 100 oldest versions match, no packages will be deleted!

### Inputs

| Name              | Description                                                | Required           | Default       |
|-------------------|------------------------------------------------------------|--------------------|---------------|
| `owner`           | Owner of the repo containing the package(s)                | :x:                | Set by Github |
| `repo`            | Repo containing the package(s)                             | :x:                | Set by Github |
| `names`           | Names of the packages                                      | :heavy_check_mark: | :x:           |
| `version-pattern` | Regex pattern of the versions                              | :x:                | `^.+$`        |
| `version`         | Specific version to delete                                 | :x:                | null          |
| `keep`            | Number of versions to exclude from deletions               | :x:                | 2             |
| `token`           | Token with the necessary scopes to delete package versions | :x:                | Set by Github |

> If you provide a `version` key, then `keep` and `version-pattern` must be empty or an error will be thrown.

### Example usage

> Delete old versions of the packages "package-1" and "package-2".

```yaml
uses: smartsquaregmbh/delete-old-packages@v0.2.0
with:
  names: |
    package-1
    package-2
```

> Delete old versions in the form of "1.0.0-RC1" of the package "package"

```yaml
uses: smartsquaregmbh/delete-old-packages@v0.2.0
with:
  version-pattern: "^\\d+\\.\\d+\\.\\d+-RC\\d+$" # The regex needs to be escaped!
  names: |
    package
```

> Delete old versions of the package "package" but keep at least 5 versions

```yaml
uses: smartsquaregmbh/delete-old-packages@v0.2.0
with:
  keep: 5
  names: |
    package
```

> Delete version `foo-bar` of the package "package"

```yaml
uses: smartsquaregmbh/delete-old-packages@v0.2.0
with:
  version: foo-bar
  names: |
    package
```
