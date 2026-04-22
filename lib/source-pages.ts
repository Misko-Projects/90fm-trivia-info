/**
 * Pages on 90fmtrivia.org that we mirror into this site's content layer.
 *
 * `selector` chooses which DOM subtree the watcher considers "content" — we
 * deliberately avoid hashing the whole page (header/footer noise) so that
 * incidental edits to chrome don't trigger PRs.
 *
 * `targets` lists the content files in this repo that depend on this page.
 * The resync prompt feeds Claude these files as the editable surface for the
 * change.
 */

export type SourcePage = {
  /** Stable id used for snapshot filenames. */
  id: string;
  /** Absolute URL on 90fmtrivia.org. */
  url: string;
  /** Cheerio selector for the meaningful content node. Falls back to `body`. */
  selector?: string;
  /** Files in this repo that map to this source page (relative to repo root). */
  targets: string[];
  /** Brief description for the resync prompt. */
  description: string;
};

export const sourcePages: SourcePage[] = [
  {
    id: "home",
    url: "https://90fmtrivia.org/",
    selector: "body",
    targets: ["content/data/contest.ts", "content/data/sponsors.ts"],
    description:
      "Current contest number, theme, dates, and the sponsor wall on the home page.",
  },
  {
    id: "rules",
    url: "https://90fmtrivia.org/works.html",
    selector: "body",
    targets: ["content/data/schedule.ts"],
    description:
      "How the contest works: hour format, special hours, side events, dispute rules.",
  },
  {
    id: "point-structure",
    url: "https://90fmtrivia.org/pointstructure.html",
    selector: "body",
    targets: ["content/data/point-structure.ts"],
    description: "The inverse-correctness scoring table.",
  },
  {
    id: "directions",
    url: "https://90fmtrivia.org/directs.html",
    selector: "body",
    targets: ["content/data/contact.ts"],
    description: "Directions and address for the 90FM studios.",
  },
  {
    id: "online",
    url: "https://90fmtrivia.org/online.html",
    selector: "body",
    targets: ["content/data/contest.ts", "content/data/contact.ts"],
    description:
      "Out-of-town / mail-in registration: cost, mailing address, deadlines, packet ship date.",
  },
  {
    id: "vault",
    url: "https://90fmtrivia.org/vault.html",
    selector: "body",
    targets: ["content/data/archive.ts"],
    description: "Index of past-contest score pages by year.",
  },
  {
    id: "future",
    url: "https://90fmtrivia.org/future.html",
    selector: "body",
    targets: ["content/data/contest.ts"],
    description: "Announced future contest dates.",
  },
  {
    id: "parade",
    url: "https://90fmtrivia.org/parade.html",
    selector: "body",
    targets: ["content/data/schedule.ts"],
    description: "Trivia Parade route, time, and details.",
  },
  {
    id: "merch",
    url: "https://90fmtrivia.org/merch.html",
    selector: "body",
    targets: ["content/data/merch.ts"],
    description: "Annual merch catalog: items, prices, sizes.",
  },
];
