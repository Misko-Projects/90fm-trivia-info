import type { ArchiveYear } from "@/lib/types";

const archive: ArchiveYear = {
  year: 2017,
  contestNumber: 48,
  title: "Trivia 48",
  dates: { end: "2017-04-24" },
  winner: "FESTIVUS FOR THE REST OF US",
  topFinishers: [
    { rank: 1, team: "FESTIVUS FOR THE REST OF US", score: 19360 },
    { rank: 2, team: "DAD'S COMPUTERS: PC CONTROL", score: 19215 },
    { rank: 3, team: "TRIVIAL FURSUIT: FURPLE REIGN", score: 15830 },
    { rank: 4, team: "NETWORK", score: 15415 },
    { rank: 5, team: "KNIGHTS OF NEEK", score: 15075 },
    { rank: 6, team: "THE TEAM FORMERLY KNOWN AS TFC", score: 15010 },
    { rank: 7, team: "TIN MAN", score: 14955 },
    { rank: 8, team: "COLLECTIVE FOOLE: RICH IN SPIRIT", score: 14530 },
    { rank: 9, team: "GRADUATES OF A LESSER GOD", score: 14460 },
    { rank: 10, team: "FRESHLY SQUEEZED", score: 14300 },
  ],
  notes:
    "Very close finish: Festivus beat Dad's Computers by only 145 points. Standings timestamped 4/24/2017 00:14.",
  sourceUrl: "https://90fmtrivia.org/TriviaScores2017/trivia_scores_2017.html",
};

export default archive;
