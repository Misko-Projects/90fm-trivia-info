import type { ArchiveYear } from "@/lib/types";

const archive: ArchiveYear = {
  year: 2013,
  contestNumber: 44,
  title: "Trivia 44",
  dates: { end: "2013-04-22" },
  totalTeams: 373,
  winner: "DAD'S COMPUTERS: 35 YEARS OF TRIVIA",
  topFinishers: [
    { rank: 1, team: "DAD'S COMPUTERS: 35 YEARS OF TRIVIA", score: 10685 },
    { rank: 2, team: "FESTIVUS FOR THE REST OF US", score: 10630 },
    { rank: 3, team: "UGLY UNDULATING UVULAS", score: 8775 },
    { rank: 4, team: "TIN MAN", score: 8235 },
    { rank: 5, team: "FRESHLY SQUEEZED", score: 7615 },
    { rank: 6, team: "GRADUATES OF A LESSER GOD", score: 7605 },
    { rank: 7, team: "NETWORK", score: 7495 },
    { rank: 8, team: "TRIVIAL FURSUIT: TOKYO YIFF'D", score: 7490 },
    { rank: 9, team: "KNIGHTS OF NEEK", score: 7455 },
    { rank: 10, team: "I DID I DID SEE A LACTATIN PUTTY TAT", score: 7410 },
  ],
  notes: "Dad's Computers won by just 55 points over Festivus for the Rest of Us.",
  sourceUrl: "https://90fmtrivia.org/TriviaScores2013/trivia.html",
};

export default archive;
