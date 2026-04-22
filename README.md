# 90fmtrivia.info

An unofficial, modern companion site for the [World's Largest Trivia Contest](https://90fmtrivia.org) — a 54-hour annual fundraiser for 90FM, the student radio station of UW–Stevens Point.

The official site is at **90fmtrivia.org**. This site (`90fmtrivia.info`) presents the same information in a clean, mobile-friendly interface and stays in sync with the source via a daily watcher that detects upstream changes and opens a Claude-authored PR.

## Stack

- Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Radix Dialog · Vercel Analytics
- All routes are statically generated (no server work at request time)
- Daily source watcher in `.github/workflows/source-watcher.yml`
- Per-page snapshots stored in `content/.source-snapshots/` (committed)
- [Claude Agent SDK](https://platform.claude.com/docs/en/agent-sdk/overview) for content resync

## Local development

```sh
pnpm install
pnpm dev          # dev server on :3000
pnpm typecheck    # tsc --noEmit
pnpm lint         # eslint
pnpm build        # production build
```

## Source watcher

```sh
pnpm watch:seed     # one-time: hash every tracked source page → content/.source-snapshots/
pnpm watch:check    # fetch & diff against snapshots → writes .changes.json
pnpm watch:resync   # invokes Claude Agent SDK to update content files (needs ANTHROPIC_API_KEY)
pnpm watch:update   # writes new snapshots — only after a sync PR is merged
pnpm watch:notify   # posts a Slack-format webhook to SYNC_WEBHOOK_URL
```

Tracked source pages and their cheerio selectors live in [`lib/source-pages.ts`](./lib/source-pages.ts). The change-detection pipeline is in [`lib/snapshots.ts`](./lib/snapshots.ts).

## Repo layout

```
app/                       # Next.js App Router (routes under (site) group)
components/                # UI components
content/data/              # Structured content (typed TS files)
content/data/archive/      # Per-year contest data (24 files, 1997-2025)
content/.source-snapshots/ # Hashes + extracted text of upstream pages — DO NOT hand-edit
lib/                       # Content accessors, types, source-pages config, snapshots logic
scripts/                   # Source watcher scripts (run by GH Actions)
.github/workflows/         # CI + source-watcher
```

`lib/content.ts` is the only thing pages should import — it's the typed accessor layer that lets the storage backend swap (e.g. to a CMS) without touching pages.

## Deploying

1. Push to GitHub.
2. Connect the repo to Vercel (Hobby plan is sufficient — the site is fully static).
3. Add the apex domain `90fmtrivia.info` and `www.90fmtrivia.info` in Vercel's domain settings.
4. Set GitHub Actions secrets:
   - `ANTHROPIC_API_KEY` — for `watch:resync`
   - `SYNC_WEBHOOK_URL` — Slack/Discord incoming-webhook URL for notifications

## Why this site exists

The official site is dated and hard to read on mobile, with critical information scattered across many small static pages and PDFs. This is an unofficial fan/companion site that mirrors the same information in a more usable form, while keeping every reader one click away from donating to Friends of 90FM and visiting the official site.

This site is **not affiliated** with 90FM, UW–Stevens Point, or Friends of 90FM.
