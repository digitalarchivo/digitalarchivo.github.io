(async () => {
  const TOKEN = "";
  const USERNAME = "digitalarchivo";   // e.g. "octocat"

  const FILE_PATH = ".github/workflows/sync-fork.yml";

  const WORKFLOW_YAML = `name: Sync fork with upstream

on:
  schedule:
    - cron: "0 */6 * * *"
  workflow_dispatch:

permissions:
  contents: write

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - name: Sync fork (same as the Sync fork button)
        run: |
          RESP=$(curl -s -w "\\n%{http_code}" -X POST \\
            -H "Authorization: Bearer \${{ secrets.GITHUB_TOKEN }}" \\
            -H "Accept: application/vnd.github+json" \\
            https://api.github.com/repos/\${{ github.repository }}/merge-upstream \\
            -d '{"branch":"\${{ github.event.repository.default_branch }}"}')
          echo "$RESP"
          case "$(echo "$RESP" | tail -1)" in
            200) echo "Fork synced OK" ;;
            201) echo "::warning::Merge conflict - resolve manually with the Sync fork button" ;;
            *)   echo "::error::Unexpected response"; exit 1 ;;
          esac
`;

  const auth = {
    Authorization: `Bearer ${TOKEN}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28"
  };
  const b64 = s => btoa(unescape(encodeURIComponent(s)));
  const sleep = ms => new Promise(r => setTimeout(r, ms));

  // fetch ALL repos you own (personal + orgs), paginated
  let repos = [], page = 1;
  while (true) {
    const r = await fetch(`https://api.github.com/user/repos?per_page=100&page=${page}&affiliation=owner`, { headers: auth });
    const data = await r.json();
    if (!Array.isArray(data) || !data.length) break;
    repos.push(...data);
    page++;
  }
  // only forks need syncing; skip archived/disabled
  repos = repos.filter(r => r.fork && !r.archived && !r.disabled);
  console.log(`Found ${repos.length} active forks. Starting...`);

  for (const repo of repos) {
    const full = repo.full_name;   // "owner/repo"

    // enable Actions on this repo
    await fetch(`https://api.github.com/repos/${full}/actions/permissions`, {
      method: "PUT",
      headers: { ...auth, "Content-Type": "application/json" },
      body: JSON.stringify({ enabled: true, allowed_actions: "all" })
    });

    // check if .github/workflows directory exists
    const dirCheck = await fetch(
      `https://api.github.com/repos/${full}/contents/.github/workflows`,
      { headers: auth }
    );

    // if directory doesn't exist (404), create it by adding a .gitkeep file
    if (dirCheck.status === 404) {
      await fetch(`https://api.github.com/repos/${full}/contents/.github/workflows/.gitkeep`, {
        method: "PUT",
        headers: { ...auth, "Content-Type": "application/json" },
        body: JSON.stringify({
          message: "Create .github/workflows directory",
          content: b64(""),
          branch: repo.default_branch
        })
      });
      console.log(`INIT ${repo.name}: created .github/workflows directory`);
    }

    // create the workflow file on the default branch
    const res = await fetch(`https://api.github.com/repos/${full}/contents/${FILE_PATH}`, {
      method: "PUT",
      headers: { ...auth, "Content-Type": "application/json" },
      body: JSON.stringify({
        message: "Add fork sync workflow",
        content: b64(WORKFLOW_YAML),
        branch: repo.default_branch
      })
    });

    if (res.status === 201) {
      // trigger one run immediately
      await fetch(`https://api.github.com/repos/${full}/actions/workflows/${FILE_PATH}/dispatches`, {
        method: "POST",
        headers: { ...auth, "Content-Type": "application/json" },
        body: JSON.stringify({ ref: repo.default_branch })
      });
      console.log(`OK ${repo.name}: created + triggered`);
    } else if (res.status === 422) {
      console.log(`SKIP ${repo.name}: file already exists`);
    } else {
      console.log(`WARN ${repo.name}: HTTP ${res.status}`);
    }
    await sleep(400);
  }
  console.log("DONE. All forks processed.");
})();
