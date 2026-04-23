# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```sh
pnpm dev            # dev server (Turbopack is the default in v16)
pnpm build
pnpm typecheck      # tsc --noEmit
pnpm lint           # plain eslint — `next lint` was removed in v16

# Source watcher pipeline (normally run by .github/workflows/source-watcher.yml)
pnpm watch:seed     # one-time seed of content/.source-snapshots/ from the live source
pnpm watch:check    # fetch + diff upstream → writes .changes.json
pnpm watch:resync   # invokes Claude Agent SDK against .changes.json (needs ANTHROPIC_API_KEY)
pnpm watch:update   # deterministic snapshot writer — ONLY after a sync PR is merged
pnpm watch:notify   # ad-hoc Slack/Discord webhook ping (needs SYNC_WEBHOOK_URL)
```

The dev server respects `PORT=<n>`; don't use `pnpm dev -- -p N`, pnpm eats the `--`.

## Project context

This is an **unofficial** companion site for the 90FM Trivia Contest (`90fmtrivia.org`). The contest is real, run by UW–Stevens Point student radio; this site exists because the official one is hard to share. The watcher keeps this site in sync by opening PRs when the upstream changes.

**The source is known to be unreliable.** It has had factual errors that have been caught and corrected during development (e.g. non-existent "midnight four-question hour", overstated rule framing). When writing or updating content, do not just restate what `90fmtrivia.org` says — the user has firsthand knowledge and their corrections override the source. When in doubt, ask. See `.github/pull_request_template.md` for the codified review checklist.

## Architecture

### Content accessor layer

Pages and components **never import `content/data/**` directly**. They go through `lib/content.ts`, which exports typed getters (`getSponsors()`, `getCurrentContest()`, `getArchiveYears()`, etc.). This seam is load-bearing: it's what lets storage swap to a CMS later without touching pages.

- `content/data/*.ts` — structured data (contest, sponsors, schedule, point structure, merch, contact).
- `content/data/archive/<year>.ts` — 24 per-year contest records. 2006/2007/2008/2010 have partial data (upstream source is broken or serves early-hour snapshots); each affected file documents this in `notes`.
- `content/data/archive/_registry.ts` — **static** imports of all per-year files. Don't use dynamic `import()` for archive data; Turbopack can't resolve template-literal paths.
- `content/.source-snapshots/*.json` — hashes + extracted text of tracked upstream pages. **Never hand-edit and never let Claude edit these during a resync.** `update-snapshots.ts` is the only legitimate writer.

### Source watcher pipeline

The most complex piece of the project. Runs daily via GitHub Actions. **The three scripts are deliberately separated; don't merge their concerns:**

1. `scripts/check-source.ts` — fetches each page in `lib/source-pages.ts`, extracts content via page-specific cheerio selectors (`lib/snapshots.ts`), diffs against the stored snapshot, writes `.changes.json` declaring mode: `no-change` | `pr` | `issue`. Issue mode triggers on fetch failures with no successful changes, >4 changed pages, or >20KB total diff.
2. `scripts/resync-content.ts` — only runs in `pr` mode. Invokes the Claude Agent SDK with `Read`+`Edit` only, a `canUseTool` guard that restricts edits to `content/data/**` and `content/*.mdx`, `maxTurns: 10`, and a 10-minute abort. Source text is wrapped in `<untrusted-source>` tags in the prompt (prompt-injection defense).
3. `scripts/update-snapshots.ts` — deterministically writes new snapshot files from the `.changes.json` blob. **This must run AFTER the agent finishes**, never before, and never via the agent. That ordering is what prevents silent-drift (a bad Claude edit getting locked in by a refreshed snapshot).

### Dark mode

Controlled by `data-theme="dark"` on `<html>`, set by a pre-hydration script in `app/layout.tsx` (no flash on load). Persisted to `localStorage.theme` with values `light | dark | system`.

**There are no `dark:` class prefixes.** `app/globals.css` redefines semantic color tokens (`--color-cream`, `--color-ink`, `--color-maroon`, etc.) inside `[data-theme="dark"] { ... }`. Every utility that references these (e.g. `bg-cream`, `text-ink`) swaps automatically. When adding new colors: define them in the `@theme` block AND in the dark override. Don't hardcode hex values in components.

### Route + rendering model

All site routes live under `app/(site)/` so they share header/footer chrome from `app/(site)/layout.tsx`. Every route is statically generated — no server-rendering at request time. The site must stay fully static (Vercel Hobby bandwidth). Don't add `dynamic = "force-dynamic"` or request-time data fetching without a strong reason.

### Path aliases

`@/*` maps to the repo root (not `src/*` — there's no `src/` directory).
