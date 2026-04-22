import type { ArchiveYear } from "@/lib/types";

const archive: ArchiveYear = {
  year: 2000,
  contestNumber: 31,
  dates: { end: "2000-04-16" },
  winner: "BEING BUD SOMERVILLE",
  topFinishers: [
    { rank: 1, team: "BEING BUD SOMERVILLE", score: 11060 },
    { rank: 2, team: "ne2rk", score: 9305 },
    { rank: 3, team: "TINMAN", score: 9175 },
    { rank: 4, team: "GRADUATES OF A LESSER GOD", score: 8650 },
    { rank: 5, team: "ZIGGYZOGYZIGGYZOGYYAARGHYARGHYARGH!!", score: 8610 },
    { rank: 6, team: "WRTM:U'RE A GOOD MAN CHARLES SCHULZ", score: 8395 },
    { rank: 7, team: "FRANKLIN STREET BURNOUTS", score: 8250 },
    { rank: 8, team: "BEERPIGS: BIGGER, LONGER, AND UNCUT", score: 8190 },
    { rank: 9, team: "LATE NIGHT WITH BOB KEESHAN", score: 8160 },
    { rank: 10, team: "MUTATED MEMBERS", score: 8045 },
  ],
  notes: "Final scores timestamped 04/16/00 2:00 AM; no explicit theme listed on source page.",
  sourceUrl: "https://90fmtrivia.org/scores00.htm",
};

export default archive;
