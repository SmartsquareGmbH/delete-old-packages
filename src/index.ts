import * as github from '@actions/github';
import * as core from '@actions/core';

const run = async () => {
  const owner = core.getInput('owner') || github.context.repo.owner;
  const repo = core.getInput('repo') || github.context.repo.repo;

  const github_token = core.getInput('github-token', {
    required: true
  });
  const dry_run = core.getInput('dry-run') === 'true';
  const package_pattern_raw = core.getInput('package-pattern', {
    required: true
  });
  const version_pattern_raw = core.getInput('version-pattern', {
    required: true
  });

  const package_pattern = new RegExp(package_pattern_raw);
  const version_pattern = new RegExp(version_pattern_raw);

  if (dry_run) {
    core.info('Dry run is set. No package versions will actually be deleted.');
  }

  core.info('Fetching packages');

  const client = github.getOctokit(github_token);
  const repo_metadata = await client.repos.get({
    repo: repo,
    owner: owner
  });

  const list_packages = `
    query($node_id: ID!) {
      organization(login: "journeyapps-platform") {
        packages(first: 100, packageType: NPM, repositoryId: $node_id) {
          nodes {
            name
          }
        }
      }
    }
  `;

  const res = (await client.graphql(list_packages, {
    repo_id: repo_metadata.data.node_id
  })) as { organization: { packages: { nodes: { name: string }[] } } };

  const packages = res.organization.packages.nodes
    .filter((pkg) => {
      return package_pattern.test(pkg.name);
    })
    .map((pkg) => pkg.name);

  for (const package_name of packages) {
    const all_versions = await client.paginate(client.packages.getAllPackageVersionsForAPackageOwnedByAnOrg, {
      state: 'active',
      package_type: 'npm',
      package_name: package_name,
      org: owner
    });

    const versions = all_versions.filter((version) => {
      return version_pattern.test(version.name);
    });

    if (dry_run) {
      core.info(`would delete in '${package_name}' the versions: ${versions.map((version) => version.name)}`);
      continue;
    }

    for (const version of versions) {
      core.info(`deleting version ${package_name}@${version.name}`);
      await client.packages.deletePackageVersionForOrg({
        org: owner,
        package_type: 'npm',
        package_name: package_name,
        package_version_id: version.id
      });
    }

    core.info(`deleted ${versions.length} versions`);
  }
};

run();
