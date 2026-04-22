/**
 * Deterministic snapshot writer.
 *
 * Reads `.changes.json` (produced by check-source.ts), writes the new
 * snapshot for each changed page to content/.source-snapshots/<id>.json.
 *
 * This script is the ONLY way snapshots get written in the watcher pipeline.
 * Claude is not allowed to touch `.source-snapshots/` during a resync — that
 * separation is what guards against the silent-drift failure mode where a
 * partially-updated content file would otherwise be locked in by a prematurely
 * refreshed snapshot.
 */

import { promises as fs } from "node:fs";
import { saveSnapshot, type Snapshot } from "../lib/snapshots";

const CHANGES_FILE = ".changes.json";

type Changes =
  | { mode: "no-change" }
  | { mode: "pr"; newSnapshots: Record<string, Snapshot> }
  | { mode: "issue" };

async function main() {
  let raw: string;
  try {
    raw = await fs.readFile(CHANGES_FILE, "utf8");
  } catch {
    console.log("No .changes.json found. Nothing to update.");
    return;
  }

  const changes = JSON.parse(raw) as Changes;
  if (changes.mode !== "pr") {
    console.log(
      `Mode is "${changes.mode}" — snapshots NOT updated. ` +
        "Snapshots only refresh on a PR-mode run, after Claude has updated content.",
    );
    return;
  }

  const ids = Object.keys(changes.newSnapshots);
  for (const id of ids) {
    await saveSnapshot(changes.newSnapshots[id]);
    console.log(`Updated snapshot: ${id}`);
  }
  console.log(`Wrote ${ids.length} snapshot(s).`);
}

main().catch((err) => {
  console.error("update-snapshots failed:", err);
  process.exit(1);
});
