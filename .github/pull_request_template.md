## Summary

<!-- 1-3 bullets describing what this changes and why -->

## Test plan

- [ ] CI is green (typecheck + build + lint + secret-scan)
- [ ] Spot-checked at least one affected page in `pnpm dev`
- [ ] If touching content data, the upstream source on 90fmtrivia.org was checked

## Reviewing a source-sync PR? Read this.

This repo mirrors content from 90fmtrivia.org, and the source has been wrong
or misleading in the past (overstated rules, invented schedule hours, etc.).
Your job reviewing a sync PR is **not** just "does the diff match the source"
— it's also **"is the source itself accurate and worth republishing?"**

- [ ] The upstream text this PR is echoing is actually **true** (sanity-check
  with firsthand knowledge, not just the source page)
- [ ] Nothing is being added that is inaccurate, confusing, or embarrassing
  when shared with a newcomer
- [ ] Prefer **omitting** ambiguous or outdated source claims over restating
  them in nicer typography

The .info site is better than the .org one partly because of what it leaves
out. Keep doing that.

## Notes for reviewer

<!-- Anything subtle, deferred, or worth flagging -->
