/**
 * Deterministic snapshot pipeline.
 *
 * `extractText` is shared by `check-source.ts` (which compares fresh fetches
 * against stored snapshots) and `update-snapshots.ts` (which writes new
 * snapshots after a sync PR is merged). Keeping the extraction logic in one
 * file is the guarantee that "what we hashed" matches "what we save".
 *
 * Crucially, neither this file nor `update-snapshots.ts` is editable by the
 * Claude Agent SDK during a resync — only the watcher runs them. This is what
 * prevents the snapshot/content drift failure mode.
 */

import { createHash } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";
import * as cheerio from "cheerio";
import { createTwoFilesPatch } from "diff";
import type { SourcePage } from "@/lib/source-pages";

export const SNAPSHOT_DIR = "content/.source-snapshots";

export const FETCH_USER_AGENT =
  "90fmtrivia-info-watcher/1.0 (+https://90fmtrivia.info)";

export type Snapshot = {
  id: string;
  url: string;
  /** Sha256 of the normalized extracted text. */
  hash: string;
  /** The normalized text we hashed — committed alongside the hash so that
   *  diffs in PRs are human-readable. */
  extractedText: string;
  /** ISO timestamp when the snapshot was captured. */
  fetchedAt: string;
  /** Optional ETag / Last-Modified for conditional fetches. */
  etag?: string;
  lastModified?: string;
};

/** Pulls meaningful text out of an HTML document.
 *
 *  Strips `<script>` / `<style>` / `<noscript>` so visible-text extraction is
 *  predictable. We rely on cheerio's `.text()` returning only text-node
 *  content (NOT comment-node content), which means HTML comments are
 *  automatically excluded — important because comments are a prompt-injection
 *  vector once we feed extracted text to Claude. */
export function extractText(html: string, selector: string = "body"): string {
  const $ = cheerio.load(html);
  $("script, style, noscript").remove();
  const node = $(selector).first();
  const root = node.length ? node : $("body");
  return normalizeWhitespace(root.text());
}

export function normalizeWhitespace(s: string): string {
  return s
    .replace(/\r\n/g, "\n")
    .split("\n")
    .map((line) => line.replace(/\s+/g, " ").trim())
    .filter((line) => line.length > 0)
    .join("\n");
}

export function sha256(s: string): string {
  return createHash("sha256").update(s).digest("hex");
}

export type FetchOutcome =
  | {
      kind: "ok";
      snapshot: Snapshot;
    }
  | {
      kind: "not-modified";
    }
  | {
      kind: "error";
      status: number | "network";
      message: string;
    };

/** Conditional fetch using prior snapshot's ETag/Last-Modified. */
export async function fetchPage(
  page: SourcePage,
  prior: Snapshot | null,
): Promise<FetchOutcome> {
  const headers: Record<string, string> = {
    "User-Agent": FETCH_USER_AGENT,
    Accept: "text/html,application/xhtml+xml",
  };
  if (prior?.etag) headers["If-None-Match"] = prior.etag;
  if (prior?.lastModified) headers["If-Modified-Since"] = prior.lastModified;

  let res: Response;
  try {
    res = await fetch(page.url, { headers, redirect: "follow" });
  } catch (err) {
    return {
      kind: "error",
      status: "network",
      message: err instanceof Error ? err.message : String(err),
    };
  }

  if (res.status === 304) return { kind: "not-modified" };
  if (!res.ok) {
    return { kind: "error", status: res.status, message: res.statusText };
  }

  const html = await res.text();
  const extractedText = extractText(html, page.selector);
  const snapshot: Snapshot = {
    id: page.id,
    url: page.url,
    hash: sha256(extractedText),
    extractedText,
    fetchedAt: new Date().toISOString(),
    etag: res.headers.get("etag") ?? undefined,
    lastModified: res.headers.get("last-modified") ?? undefined,
  };
  return { kind: "ok", snapshot };
}

export async function loadSnapshot(id: string): Promise<Snapshot | null> {
  const file = path.join(SNAPSHOT_DIR, `${id}.json`);
  try {
    const raw = await fs.readFile(file, "utf8");
    return JSON.parse(raw) as Snapshot;
  } catch {
    return null;
  }
}

export async function saveSnapshot(snapshot: Snapshot): Promise<void> {
  await fs.mkdir(SNAPSHOT_DIR, { recursive: true });
  const file = path.join(SNAPSHOT_DIR, `${snapshot.id}.json`);
  await fs.writeFile(file, JSON.stringify(snapshot, null, 2) + "\n", "utf8");
}

/** Proper LCS-based unified diff (via the `diff` package). The earlier naive
 *  line-aligned implementation produced misleading output any time a line was
 *  inserted or deleted — every subsequent line then read as "changed", which
 *  would mislead the resync prompt and inflate the diff-size guard. */
export function unifiedDiff(prev: string, next: string, contextLines = 2): string {
  const patch = createTwoFilesPatch(
    "prev.txt",
    "next.txt",
    prev,
    next,
    "",
    "",
    { context: contextLines },
  );
  // Drop the file-header lines `--- prev.txt` and `+++ next.txt`; in our
  // context they're noise (the consumer already knows what page this is).
  return patch
    .split("\n")
    .filter((line) => !line.startsWith("---") && !line.startsWith("+++") && !line.startsWith("Index:") && !line.startsWith("=="))
    .join("\n")
    .trim();
}
