/**
 * Daily watcher entry point.
 *
 * For each tracked source page on 90fmtrivia.org:
 *   - Conditionally fetch (using ETag / Last-Modified from prior snapshot).
 *   - Extract content via the page-specific cheerio selector.
 *   - Compare hash against the on-disk snapshot.
 *
 * Writes `.changes.json` describing what to do next:
 *   mode: "no-change"   → exit 0, GH Action skips the rest.
 *   mode: "pr"          → resync-content.ts runs, then a PR is opened.
 *   mode: "issue"       → no PR is opened; an issue is opened instead.
 *                         Triggered by fetch failures OR by an oversized diff
 *                         (>4 changed pages, or >20 KB total) — both situations
 *                         indicate "ask a human, not an LLM".
 *
 * The snapshot files themselves are NOT updated by this script. That happens
 * only after a PR is merged, via update-snapshots.ts. This separation prevents
 * the snapshot/content drift failure mode where Claude could otherwise mark
 * content "synced" without actually fixing it.
 */

import { promises as fs } from "node:fs";
import { sourcePages, type SourcePage } from "../lib/source-pages";
import {
  fetchPage,
  loadSnapshot,
  unifiedDiff,
  type Snapshot,
} from "../lib/snapshots";

const MAX_CHANGED_PAGES = 4;
const MAX_TOTAL_DIFF_BYTES = 20 * 1024;
const CHANGES_FILE = ".changes.json";

type ChangedPage = {
  id: string;
  url: string;
  targets: string[];
  description: string;
  prevHash: string | null;
  nextHash: string;
  diff: string;
  prevExtractedText: string;
  nextExtractedText: string;
};

type FailedPage = {
  id: string;
  url: string;
  status: number | "network";
  message: string;
};

type CheckResult =
  | { mode: "no-change"; failedPages?: FailedPage[] }
  | {
      mode: "pr";
      changedPages: ChangedPage[];
      newSnapshots: Record<string, Snapshot>;
      /** Non-fatal failures from this run. Surfaced in the PR body so a human
       *  notices, but they do not block the changes from going out. */
      failedPages: FailedPage[];
    }
  | {
      mode: "issue";
      reason:
        | "fetch-failure"
        | "too-many-changes"
        | "oversized-diff";
      changedPages: ChangedPage[];
      failedPages: FailedPage[];
      summary: string;
    };

async function checkOne(
  page: SourcePage,
): Promise<
  | { kind: "unchanged" }
  | { kind: "changed"; change: ChangedPage; snapshot: Snapshot }
  | { kind: "failed"; failure: FailedPage }
> {
  const prior = await loadSnapshot(page.id);
  const outcome = await fetchPage(page, prior);

  if (outcome.kind === "not-modified") {
    return { kind: "unchanged" };
  }
  if (outcome.kind === "error") {
    return {
      kind: "failed",
      failure: {
        id: page.id,
        url: page.url,
        status: outcome.status,
        message: outcome.message,
      },
    };
  }

  const snapshot = outcome.snapshot;
  if (prior && prior.hash === snapshot.hash) {
    return { kind: "unchanged" };
  }

  const diff = unifiedDiff(prior?.extractedText ?? "", snapshot.extractedText);
  return {
    kind: "changed",
    snapshot,
    change: {
      id: page.id,
      url: page.url,
      targets: page.targets,
      description: page.description,
      prevHash: prior?.hash ?? null,
      nextHash: snapshot.hash,
      diff,
      prevExtractedText: prior?.extractedText ?? "",
      nextExtractedText: snapshot.extractedText,
    },
  };
}

async function check(): Promise<CheckResult> {
  const changedPages: ChangedPage[] = [];
  const failedPages: FailedPage[] = [];
  const newSnapshots: Record<string, Snapshot> = {};

  for (const page of sourcePages) {
    const result = await checkOne(page);
    if (result.kind === "failed") {
      failedPages.push(result.failure);
    } else if (result.kind === "changed") {
      changedPages.push(result.change);
      newSnapshots[page.id] = result.snapshot;
    }
  }

  // Oversized-change guards run first — they apply only to changes we can
  // detect (i.e., successfully fetched pages). A source restructure or a
  // genuinely large content change is a "needs a human" signal that must not
  // be silently turned into a resync.
  const totalDiffBytes = changedPages.reduce(
    (acc, p) => acc + Buffer.byteLength(p.diff, "utf8"),
    0,
  );
  if (changedPages.length > MAX_CHANGED_PAGES) {
    return {
      mode: "issue",
      reason: "too-many-changes",
      changedPages,
      failedPages,
      summary: `${changedPages.length} pages changed (cap: ${MAX_CHANGED_PAGES}). Likely a source-site restructure — needs human review before resync.`,
    };
  }
  if (totalDiffBytes > MAX_TOTAL_DIFF_BYTES) {
    return {
      mode: "issue",
      reason: "oversized-diff",
      changedPages,
      failedPages,
      summary: `Total diff ${totalDiffBytes} bytes exceeds cap (${MAX_TOTAL_DIFF_BYTES}). Needs human review.`,
    };
  }

  // Real changes ship as a PR even if some unrelated pages failed to fetch.
  // The original "any failure → issue" behavior would have hidden a real
  // upstream change behind a transient 5xx on an unrelated page. The
  // PR body surfaces the failed pages so a human can investigate them
  // alongside reviewing the resync.
  if (changedPages.length > 0) {
    return { mode: "pr", changedPages, newSnapshots, failedPages };
  }

  // No real changes. If pages failed to fetch and we'd otherwise report
  // "all clear," open an issue instead so the silence isn't misleading.
  if (failedPages.length > 0) {
    return {
      mode: "issue",
      reason: "fetch-failure",
      changedPages,
      failedPages,
      summary: `Fetch failed for ${failedPages.length} of ${sourcePages.length} pages with no successful changes to ship: ${failedPages.map((f) => `${f.id} (${f.status})`).join(", ")}`,
    };
  }

  return { mode: "no-change" };
}

async function main() {
  const result = await check();

  await fs.writeFile(
    CHANGES_FILE,
    JSON.stringify(result, null, 2) + "\n",
    "utf8",
  );

  switch (result.mode) {
    case "no-change":
      console.log("No changes detected. Done.");
      break;
    case "pr":
      console.log(
        `${result.changedPages.length} page(s) changed. Resync needed: ${result.changedPages.map((p) => p.id).join(", ")}`,
      );
      break;
    case "issue":
      console.log(`Issue mode (${result.reason}): ${result.summary}`);
      break;
  }

  // Always exit 0 — the GH Action reads .changes.json to decide what to do.
  // Exit codes are reserved for actual script failures.
  process.exit(0);
}

main().catch((err) => {
  console.error("check-source failed:", err);
  process.exit(1);
});
