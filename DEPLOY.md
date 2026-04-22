# Deploying 90fmtrivia.info

End-to-end checklist for getting the site live on Vercel at `90fmtrivia.info` with the daily source watcher running in GitHub Actions.

Estimated time: **30–45 minutes** the first time.

---

## 0. Prereqs

- [ ] GitHub account
- [ ] Vercel account (Hobby plan is sufficient — the site is fully static)
- [ ] Control of the `90fmtrivia.info` DNS (apex + `www`)
- [ ] Anthropic API key for the source watcher (get one at <https://console.anthropic.com>)
- [ ] A Slack or Discord incoming webhook URL (optional — for notifications)

---

## 1. Fix the placeholders in the repo

Two spots in the code refer to `@misko` or a placeholder GitHub URL and need your real values before you push.

- [ ] **`.github/CODEOWNERS`** — replace every `@misko` with your actual GitHub handle (the one you want to be auto-requested as reviewer on source-sync PRs).
- [ ] **`components/Footer.tsx`** — the "Source / GitHub" link in the bottom-right currently points at `https://github.com/`. Once you know the repo URL, update it. If you'd rather skip this, delete the whole `<p>Source: <a href="...">GitHub</a></p>` block.

```sh
# Quick sanity check after editing:
pnpm typecheck && pnpm lint && pnpm build
```

---

## 2. Push to GitHub

The repo has been initialized locally but nothing is committed yet.

```sh
# From the repo root:
git add -A
git commit -m "Initial commit: 90fmtrivia.info v1"

# Create the remote. Using the gh CLI:
gh repo create 90fmtrivia-info --public --source=. --remote=origin --push

# Or, if creating via the GitHub web UI, then:
git branch -M main
git remote add origin git@github.com:<your-handle>/90fmtrivia-info.git
git push -u origin main
```

---

## 3. Connect the repo to Vercel

1. Go to <https://vercel.com/new>.
2. Import the GitHub repo you just pushed.
3. Framework preset should auto-detect as **Next.js** — leave everything else at defaults. Build command is `pnpm build`, output directory is `.next`. Install command is `pnpm install`.
4. Don't add any environment variables yet (the site has none that are load-bearing at build time). Deploy.

The first deploy should finish in under a minute and give you a `*.vercel.app` URL you can hit. Verify:

- [ ] `https://<project-name>.vercel.app/` loads the retro-radio hero
- [ ] All 11 routes return 200 (`/about`, `/play`, `/listen`, `/rules`, `/schedule`, `/archive`, `/archive/2025`, `/sponsors`, `/merch`, `/contact`)
- [ ] The ON AIR badge is not visible (contest not currently live in our data)

---

## 4. Point the domain

In Vercel → your project → **Settings → Domains**:

1. Add **`90fmtrivia.info`** (apex).
2. Add **`www.90fmtrivia.info`**.
3. Vercel will show the DNS records you need to add at your registrar. Typically:
   - Apex: `A` record → `76.76.21.21`
   - `www`: `CNAME` → `cname.vercel-dns.com`
4. Once DNS propagates (minutes for most registrars, up to 24 hours for a few), Vercel auto-provisions HTTPS.
5. Set `www.90fmtrivia.info` to **redirect to** `90fmtrivia.info` (or the other way — your call; apex is the convention used by the `metadataBase` in `app/layout.tsx`).

Verify:

- [ ] `https://90fmtrivia.info` loads with a valid TLS cert
- [ ] `https://www.90fmtrivia.info` redirects to the apex

---

## 5. GitHub Actions secrets

The source watcher needs two secrets. Repo → **Settings → Secrets and variables → Actions → New repository secret**:

- [ ] `ANTHROPIC_API_KEY` — your Anthropic API key. Used by `scripts/resync-content.ts` to invoke Claude for content updates.
- [ ] `SYNC_WEBHOOK_URL` — a Slack or Discord incoming webhook URL. Used by `scripts/notify.ts` to ping you when a PR opens, an issue opens, or a run fails. If you skip this, notifications no-op silently and you'll rely on GitHub's default email.

### Creating the webhook

**Slack:** <https://api.slack.com/messaging/webhooks> → Create New App → Incoming Webhooks → pick a channel → paste the URL into GitHub secrets.

**Discord:** Channel → Edit Channel → Integrations → Webhooks → New Webhook → Copy URL → append `/slack` to the URL so Discord accepts the Slack-format payload. Example: `https://discord.com/api/webhooks/.../slack`.

---

## 6. Branch protection

Repo → **Settings → Branches → Add branch protection rule** for `main`:

- [ ] Require a pull request before merging
- [ ] Require status checks to pass: add `build` and `secret-scan` (both from `.github/workflows/ci.yml`)
- [ ] Require conversation resolution before merging
- [ ] (Optional) Require approvals: 1 — useful if you want manual sign-off on the daily source-sync PRs

The watcher relies on these checks passing before you merge its PRs. Without them, a broken sync could ship content that fails to build.

---

## 7. Seed the source snapshots

**Already done locally.** The `content/.source-snapshots/` directory is committed with hashes + extracted text from the live source as of your first build. No further action needed.

If you ever wipe the directory and need to regenerate:

```sh
pnpm watch:seed
git add content/.source-snapshots/
git commit -m "chore(content): re-seed source snapshots"
```

---

## 8. First watcher run

The watcher is scheduled for 13:00 UTC daily. To validate it works *before* waiting a day, trigger it manually:

1. GitHub repo → **Actions** → **Source watcher** → **Run workflow** → pick `main` → **Run workflow**.
2. Watch the run. You should see:
   - **check** job runs and produces `.changes.json` as an artifact.
   - Since the snapshots were just seeded, `mode` will be `no-change` and the run ends cleanly after the check job.
3. Confirm your webhook did NOT fire (nothing to report).

To force a resync for testing, locally edit one of the `.json` snapshot files (change the hash to an obviously fake value), commit, push, and re-trigger the workflow. You should see a sync PR open against `main`. Revert after testing.

---

## 9. Ongoing operations

Once everything's live:

- **Daily:** the watcher runs at 13:00 UTC. If the upstream site changes, you'll get a webhook + a PR to review. If a source page fails to fetch or a structural change is detected (>4 pages or >20 KB diff), you'll get an issue instead.
- **Merging a sync PR:** CI runs typecheck + lint + build + secret-scan. Green means safe to merge. Merge triggers a Vercel redeploy.
- **Manual content edits:** for one-off fixes not driven by upstream, just open a PR the usual way. The CI gates protect `main` regardless of source.

---

## 10. Quick reference

```sh
# Local dev
pnpm dev          # dev server on :3000
pnpm typecheck
pnpm lint
pnpm build

# Watcher scripts (usually run by GH Actions; sometimes handy locally)
pnpm watch:seed     # one-time seed of content/.source-snapshots/
pnpm watch:check    # fetch + diff → writes .changes.json
pnpm watch:resync   # needs ANTHROPIC_API_KEY; invokes Claude Agent SDK
pnpm watch:update   # writes new snapshots (only after a sync PR merges)
pnpm watch:notify   # ad-hoc notification: `pnpm watch:notify info "title" "msg" "link"`
```

---

## Cheatsheet: known-good end state

After all the above, a `curl -sS -o /dev/null -w "%{http_code}\n" https://90fmtrivia.info/` returns `200`. A `curl -I https://90fmtrivia.info/ | grep server` shows `Vercel`. The scheduled workflow is green in the Actions tab. Your webhook has received at least one "info" ping from a manual `workflow_dispatch` test.

If any of those are off, work backwards from this checklist.
