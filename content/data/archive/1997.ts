import type { ArchiveYear } from "@/lib/types";

const archive: ArchiveYear = {
  year: 1997,
  contestNumber: 28,
  title: "Trivia 28 - Mission: Trivia",
  theme: "Mission: Trivia",
  winner: "OPERATION KUBARK: KENT MEETS HIKE",
  topFinishers: [
    { rank: 1, team: "OPERATION KUBARK: KENT MEETS HIKE", score: 11515 },
    { rank: 2, team: "NETWORK THE SPECIAL EDITION", score: 9550 },
    { rank: 3, team: "CNOF: ALWAYS A BRIDESMAID", score: 9545 },
    { rank: 4, team: "MUTATED MEMBERS", score: 9495 },
    { rank: 5, team: "GRADUATES OF A LESSER GOD", score: 9300 },
    { rank: 6, team: "7 LORDS A LAYING: LUVUS FROM BEHIND", score: 9280 },
    { rank: 7, team: "YAARGH! BIG AND SCARY COW", score: 8665 },
    { rank: 8, team: "FRANKLIN STREET BURNOUTS", score: 8605 },
    { rank: 9, team: "SUBSTATION", score: 8370 },
    { rank: 10, team: "ASTRO WOLFPACK", score: 7950 },
  ],
  totalTeams: 526,
  notes:
    "Source page shows full final standings back to 526th place; no explicit contest dates listed on the page.",
  sourceUrl: "https://90fmtrivia.org/scores97.htm",
};

export default archive;
