import type { ArchiveYear } from "@/lib/types";

const archive: ArchiveYear = {
  year: 2012,
  contestNumber: 43,
  title: "Trivia 43",
  dates: { end: "2012-04-23" },
  totalTeams: 385,
  winner: "FESTIVUS FOR THE REST OF US",
  topFinishers: [
    { rank: 1, team: "FESTIVUS FOR THE REST OF US", score: 10690 },
    { rank: 2, team: "DAD'S COMPUTERS", score: 9525 },
    { rank: 3, team: "NETWORK: TWO-FISTED TRIVIA", score: 9175 },
    { rank: 4, team: "WHATSAMATTA-U: DEATH BY MISADVENTURE", score: 8115 },
    { rank: 5, team: "KNIGHTS OF NEEK", score: 7915 },
    { rank: 6, team: "TIN MAN", score: 7860 },
    { rank: 7, team: "ASTRO WOLFPACK, GILLY GRIT", score: 7540 },
    { rank: 8, team: "GRADUATES OF A LESSER GOD", score: 7465 },
    { rank: 9, team: "AH BIN HYP-MO-TIZED!!!", score: 7390 },
    { rank: 10, team: "UNUTTERABLE UGLY UNDULATING UVULAS", score: 7340 },
  ],
  notes: "Final standings timestamped 4/23/2012 12:07 AM after the 54-hour contest.",
  sourceUrl: "https://90fmtrivia.org/TriviaScores2012/trivia.html",
};

export default archive;
