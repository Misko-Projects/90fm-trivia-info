import type { ArchiveYear } from "@/lib/types";

const archive: ArchiveYear = {
  year: 2014,
  contestNumber: 45,
  title: "Trivia 45",
  dates: { end: "2014-04-14" },
  totalTeams: 365,
  winner: "DAD'S COMPUTERS: NEVER SAY DIE",
  topFinishers: [
    { rank: 1, team: "DAD'S COMPUTERS: NEVER SAY DIE", score: 21655 },
    { rank: 2, team: "FESTIVUS FOR THE REST OF US", score: 20555 },
    { rank: 3, team: "NETWORK RECORDS: HECK OF A RUN", score: 18105 },
    { rank: 4, team: "COLLECTIVE FOOLE", score: 16805 },
    { rank: 5, team: "UGLY UNDULATING UVULAS", score: 16445 },
    { rank: 6, team: "TINMAN", score: 16025 },
    { rank: 7, team: "TRIVIAL FURSUIT: WATCH WALKER WRECK", score: 15670 },
    { rank: 8, team: "TFC: SEVEN INCHES OF HOT BLACK VINYL", score: 15655 },
    { rank: 9, team: "AH BIN HYP-MO-TIZED!!!", score: 15550 },
    { rank: 10, team: "GRADUATES OF A LESSER GOD", score: 15255 },
  ],
  notes:
    "Trivia 45: scoring totals roughly doubled from prior years, indicating an expanded contest format; final standings timestamped 4/14/2014 12:11 AM.",
  sourceUrl: "https://90fmtrivia.org/TriviaScores2014/trivia.html",
};

export default archive;
