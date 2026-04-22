/**
 * One-time seed for content/.source-snapshots/.
 *
 * Run this after wiring up source-pages.ts and before the first watcher cron
 * fires — otherwise check-source.ts would see every page as "new" and trip the
 * too-many-changes guard.
 *
 * Safe to re-run: it overwrites whatever's there based on a fresh fetch.
 */

import { sourcePages } from "../lib/source-pages";
import { fetchPage, saveSnapshot } from "../lib/snapshots";

async function main() {
  let written = 0;
  let failed = 0;
  for (const page of sourcePages) {
    const out = await fetchPage(page, null);
    if (out.kind === "ok") {
      await saveSnapshot(out.snapshot);
      console.log(`✓ ${page.id}  (${out.snapshot.extractedText.length} chars)`);
      written++;
    } else if (out.kind === "not-modified") {
      // Won't happen on a no-prior fetch, but handle for completeness.
      console.log(`-  ${page.id}  (not modified)`);
    } else {
      console.error(`✗ ${page.id}  (${out.status}: ${out.message})`);
      failed++;
    }
  }
  console.log(`\nSeeded ${written} snapshot(s). Failed: ${failed}.`);
  if (failed > 0) process.exit(1);
}

main().catch((err) => {
  console.error("seed-snapshots failed:", err);
  process.exit(1);
});
