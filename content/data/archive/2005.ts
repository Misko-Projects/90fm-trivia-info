import type { ArchiveYear } from "@/lib/types";

const archive: ArchiveYear = {
  year: 2005,
  contestNumber: 36,
  title: "Trivia 36",
  dates: { end: "2005-04-11" },
  winner: "WORK THE NET",
  topFinishers: [
    { rank: 1, team: "WORK THE NET", score: 10630 },
    { rank: 2, team: "TINMAN", score: 9170 },
    { rank: 3, team: "GRADUATES OF A LESSER GOD", score: 8985 },
    { rank: 4, team: "KNIGHTS OF NEEK", score: 8845 },
    { rank: 5, team: "BASEMENTALITY: WE'RE NOT IN JEOPARDY", score: 8070 },
    { rank: 6, team: "GOOD NIGHT IRENE", score: 7860 },
    { rank: 7, team: "DAD'S COMPUTERS: DAWN OF THE DAD", score: 7855 },
    { rank: 8, team: "UGLY UVULAS-KEEP ON UNDULATING!!", score: 7665 },
    { rank: 9, team: "A SERIES OF UNFORTUNATE BEERPIGS", score: 7430 },
    { rank: 10, team: "NORM'S STOOL: THE RETURN OF TECUMSEH", score: 7380 },
  ],
  totalTeams: 433,
  notes: "54-hour contest; final standings listed 433 teams.",
  sourceUrl: "https://90fmtrivia.org/scoresTrivia36.html",
};

export default archive;
