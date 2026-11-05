import type { ArchiveYear } from "@/lib/types";

const archive: ArchiveYear = {
  year: 2002,
  contestNumber: 33,
  title: "Trivia 33 - All in the Contest",
  theme: "All in the Contest",
  dates: { start: "2002-04-19", end: "2002-04-22" },
  totalTeams: 456,
  winner: "N",
  topFinishers: [
    { rank: 1, team: "N", score: 8265 },
    { rank: 2, team: "CNOF HOUR 54: BUD STRIKES BACK!", score: 7470 },
    { rank: 3, team: "GRADUATES OF A LESSER GOD", score: 7260 },
    { rank: 4, team: "TIN MAN", score: 7210 },
    { rank: 5, team: "HAIRY BEERPIG AND THE TRIVIA STONE", score: 7070 },
    { rank: 6, team: "ASTRO WOLFPACK", score: 6890 },
    { rank: 7, team: "YAARGH! BIG & HAIRY CLETIDUS HUNT!", score: 6830 },
    { rank: 8, team: "FRANKLIN STREET BURNOUTS", score: 6715 },
    { rank: 9, team: "LATE NIGHT WITH BOB KEESHAN", score: 6685 },
    { rank: 10, team: "MUTATED MEMBERS", score: 6435 },
  ],
  notes:
    "Final standings timestamped 00:14:10 Mon, Apr 22, 2002 (end of hour 54). The winner is listed as \"N\", which is the name Network played under this year. From the Wayback Machine capture of the old contest site at momsfamilies.com/trivia.",
  sourceUrl:
    "https://web.archive.org/web/20030204091300/http://momsfamilies.com/trivia/scores33.htm",
};

export default archive;
