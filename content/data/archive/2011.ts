import type { ArchiveYear } from "@/lib/types";

const archive: ArchiveYear = {
  year: 2011,
  contestNumber: 42,
  title: "Trivia 42",
  dates: { end: "2011-04-11" },
  totalTeams: 395,
  winner: "THE ANTI-SOCIAL NETWORK",
  topFinishers: [
    { rank: 1, team: "THE ANTI-SOCIAL NETWORK", score: 11165 },
    { rank: 2, team: "DAD'S COMPUTERS", score: 11150 },
    { rank: 3, team: "FESTIVUS FOR THE REST OF US", score: 10975 },
    { rank: 4, team: "TIN MAN", score: 9230 },
    { rank: 5, team: "GRADUATES OF A LESSER GOD", score: 8245 },
    { rank: 6, team: "COLLECTIVE FOOLE", score: 8230 },
    { rank: 7, team: "UGLY UNDULATING UVULAS", score: 8135 },
    { rank: 8, team: "WHATSAMATTA-U 35% BEEF 65% MEATDRESS", score: 7610 },
    { rank: 9, team: "THE CAKERS", score: 7540 },
    { rank: 10, team: "GOOD NIGHT IRENE", score: 7520 },
  ],
  notes:
    "Anti-Social Network edged Dad's Computers by just 15 points in one of the closest top finishes on record. Final standings timestamped 4/11/2011 2:24 AM.",
  sourceUrl: "https://90fmtrivia.org/TriviaScores2011/super.html",
};

export default archive;
