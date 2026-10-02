(async () => {
  // ===== CONFIGURATION =====
  const TOKEN = ""; // ← PASTE YOUR GITHUB TOKEN HERE
  // =========================

  if (!TOKEN || TOKEN.trim() === "") {
    console.error("ERROR: TOKEN is empty. Please paste your GitHub Personal Access Token.");
    return;
  }

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

  // Verify token is valid
  console.log("🔐 Verifying token...");
  const verifyRes = await fetch("https://api.github.com/user", { headers: auth });
  
  if (verifyRes.status === 401) {
    console.error("❌ ERROR: Invalid or expired token. Please generate a new one at https://github.com/settings/tokens");
    return;
  }

  if (!verifyRes.ok) {
    console.error(`❌ ERROR: Token verification failed (${verifyRes.status})`);
    return;
  }

  const user = await verifyRes.json();
  console.log(`✅ Token valid. Logged in as: ${user.login}\n`);

  // Fetch all repos owned by your account
  console.log("📦 Fetching all repositories...");
  let repos = [];
  let page = 1;
  let totalFetched = 0;

  while (true) {
    const r = await fetch(`https://api.github.com/user/repos?per_page=100&page=${page}&affiliation=owner`, {
      headers: auth
    });

    if (!r.ok) {
      console.error(`❌ Failed to fetch repos (page ${page}): ${r.status}`);
      break;
    }

    const data = await r.json();

    if (!Array.isArray(data) || data.length === 0) break;

    repos.push(...data);
    totalFetched += data.length;
    console.log(`  Fetched ${totalFetched} repos so far...`);
    page += 1;
    await sleep(100);
  }

  // Filter to only active forks
  repos = repos.filter(r => r.fork && !r.archived && !r.disabled);

  console.log(`\n✅ Found ${repos.length} active forks. Starting sync workflow setup...\n`);

  let successCount = 0;
  let skipCount = 0;
  let failCount = 0;

  for (let i = 0; i < repos.length; i++) {
    const repo = repos[i];
    const full = repo.full_name;
    const progress = `[${i + 1}/${repos.length}]`;

    // Enable Actions on this repo
    try {
      await fetch(`https://api.github.com/repos/${full}/actions/permissions`, {
        method: "PUT",
        headers: { ...auth, "Content-Type": "application/json" },
        body: JSON.stringify({ enabled: true, allowed_actions: "all" })
      });
    } catch (e) {
      console.warn(`${progress} ⚠️  ${repo.name}: Failed to enable actions`);
    }

    // Check if .github/workflows directory exists
    let dirExists = false;
    try {
      const dirCheck = await fetch(`https://api.github.com/repos/${full}/contents/.github/workflows`, {
        headers: auth
      });
      dirExists = dirCheck.ok;
    } catch (err) {
      // Directory check failed, assume it doesn't exist
    }

    // Create .github/workflows directory if it doesn't exist
    if (!dirExists) {
      try {
        const createDirRes = await fetch(`https://api.github.com/repos/${full}/contents/.github/workflows/.gitkeep`, {
          method: "PUT",
          headers: { ...auth, "Content-Type": "application/json" },
          body: JSON.stringify({
            message: "Create .github/workflows directory",
            content: b64(""),
            branch: repo.default_branch
          })
        });

        if (!createDirRes.ok) {
          console.warn(`${progress} ⚠️  ${repo.name}: Could not create directory (${createDirRes.status})`);
          failCount += 1;
          await sleep(400);
          continue;
        }
      } catch (err) {
        console.warn(`${progress} ⚠️  ${repo.name}: Directory creation error`);
        failCount += 1;
        await sleep(400);
        continue;
      }
    }

    // Create or update the workflow file
    try {
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
        // Trigger workflow run
        try {
          await fetch(`https://api.github.com/repos/${full}/actions/workflows/sync-fork.yml/dispatches`, {
            method: "POST",
            headers: { ...auth, "Content-Type": "application/json" },
            body: JSON.stringify({ ref: repo.default_branch })
          });
          console.log(`${progress} ✅ ${repo.name}: Workflow created & triggered`);
          successCount += 1;
        } catch (err) {
          console.log(`${progress} ✅ ${repo.name}: Workflow created (dispatch skipped)`);
          successCount += 1;
        }
      } else if (res.status === 422) {
        console.log(`${progress} ⏭️  ${repo.name}: Workflow already exists`);
        skipCount += 1;
      } else {
        console.warn(`${progress} ⚠️  ${repo.name}: HTTP ${res.status}`);
        failCount += 1;
      }
    } catch (err) {
      console.warn(`${progress} ⚠️  ${repo.name}: Request failed`);
      failCount += 1;
    }

    await sleep(400);
  }

  console.log(`\n${"=".repeat(60)}`);
  console.log(`📊 SUMMARY`);
  console.log(`${"=".repeat(60)}`);
  console.log(`✅ Successful: ${successCount}`);
  console.log(`⏭️  Already exist: ${skipCount}`);
  console.log(`❌ Failed: ${failCount}`);
  console.log(`${"=".repeat(60)}`);
  console.log(`\n🎉 Done! All forks processed.`);
})();
