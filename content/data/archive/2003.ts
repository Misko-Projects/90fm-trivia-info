import type { ArchiveYear } from "@/lib/types";

const archive: ArchiveYear = {
  year: 2003,
  contestNumber: 34,
  title: "Trivia 34 - Survivor Trivia",
  theme: "Survivor Trivia",
  dates: { start: "2003-04-11", end: "2003-04-14" },
  totalTeams: 459,
  winner: "NETWORK: EYE OF THE SPIDER",
  topFinishers: [
    { rank: 1, team: "NETWORK: EYE OF THE SPIDER", score: 8785 },
    { rank: 2, team: "TIN MAN", score: 8545 },
    { rank: 3, team: "GRADUATES OF A LESSER GOD", score: 8505 },
    { rank: 4, team: "WEAPONS-GRADE CNOF 54", score: 8075 },
    { rank: 5, team: "KNIGHTS OF NEEK", score: 7790 },
    { rank: 6, team: "MY BIG FAT GREEK BEERPIG", score: 7350 },
    { rank: 7, team: "PANDEMONIUM", score: 6730 },
    { rank: 8, team: "AH BIN HYP-MO-TIZED!!!!", score: 6710 },
    { rank: 8, team: "YAARGH! A TRIBUTE TO WELL HUNGARIANS", score: 6710 },
    { rank: 10, team: "FRANKLIN STREET BURNOUTS-YEAR 30", score: 6540 },
  ],
  notes:
    "Final standings timestamped 00:33:23 Mon, Apr 14, 2003 (end of hour 54). From the Wayback Machine capture of the old contest site at momsfamilies.com/trivia. The only surviving capture of these standings is a page template file, so the source link opens as plain text rather than a rendered page. The top 5 and the 459-team count match the UWSP Pointer of April 17, 2003.",
  sourceUrl:
    "https://web.archive.org/web/20030502062958/http://www.momsfamilies.com/trivia/Templates/scores33.dwt",
};

export default archive;
