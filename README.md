# Delete old packages

Github action for deleting old versions of packages in the Github package registry.

This is very similar to [actions/delete-package-versions](https://github.com/actions/delete-package-versions)
but targets a different use case.

### Inputs

| Name              | Description                                                | Required           | Default       |
|-------------------|------------------------------------------------------------|--------------------|---------------|
| `owner`           | Owner of the repo containing the package(s)                | :x:                | Set by Github |
| `repo`            | Repo containing the package(s)                             | :x:                | Set by Github |
| `names`           | Names of the packages                                      | :heavy_check_mark: | :x:           |
| `version-pattern` | Regex pattern of the versions                              | :x:                | `^.+$`        |
| `keep`            | Number of versions to exclude from deletions               | :x:                | 2             |
| `token`           | Token with the necessary scopes to delete package versions | :x:                | Set by Github |

### Example usage

> Delete old versions of the packages "package-1" and "package-2".

```yaml
uses: smartsquaregmbh/delete-old-packages@v0.0.2
with:
  names: |
    package-1
    package-2
```

> Delete old versions in the form of "1.0.0-RC1" of the package "package"

```yaml
uses: smartsquaregmbh/delete-old-packages@v0.0.2
with:
  version-pattern: "^\\d+\\.\\d+\\.\\d+-RC\\d+$" # The regex needs to be escaped!
  names: |
    package
```

> Delete old versions of the package "package" but keep at least 5 versions

```yaml
uses: smartsquaregmbh/delete-old-packages@v0.0.2
with:
  keep: 5
  names: |
    package
```
