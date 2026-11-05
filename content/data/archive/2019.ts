import type { ArchiveYear } from "@/lib/types";

const archive: ArchiveYear = {
  year: 2019,
  contestNumber: 50,
  title: "Trivia Five-0",
  theme: "Trivia Five-0",
  dates: { start: "2019-04-12", end: "2019-04-15" },
  totalTeams: 341,
  winner: "FESTIVUS FOR THE REST OF US",
  topFinishers: [
    { rank: 1, team: "FESTIVUS FOR THE REST OF US", score: 19760 },
    { rank: 2, team: "DAD'S COMPUTERS", score: 19455 },
    { rank: 3, team: "TRIVIAL FURSUIT 9: HOWLIN' HAOELES", score: 18640 },
    { rank: 4, team: "LACTATION NATION: SUCK 'M, DANNO!", score: 17645 },
    { rank: 5, team: "KNIGHTS OF NEEK", score: 17540 },
    { rank: 6, team: "NETWORK", score: 17105 },
    { rank: 7, team: "UGLY UNDULATING UVULAS", score: 16665 },
    { rank: 8, team: "FRESHLY SQUEEZED", score: 16350 },
    { rank: 9, team: "WHOOPS! I'M A CAKER!", score: 16095 },
    { rank: 10, team: "COLLECTIVE FOOLE", score: 15985 },
  ],
  notes:
    "Final standings as of hour 54. The source page is not linked from the vault, and it prints 9th place's score as \"16.095\".",
  sourceUrl:
    "https://www.90fmtrivia.org/TriviaScores2019/Score%20Pages/results.html",
};

export default archive;
