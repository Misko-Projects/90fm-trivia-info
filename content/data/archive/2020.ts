import type { ArchiveYear } from "@/lib/types";

const archive: ArchiveYear = {
  year: 2020,
  title: "Trivia 2020 - Experiment in Trivia",
  theme: "Experiment in Trivia",
  dates: { start: "2020-10-23", end: "2020-10-25" },
  winner: "DAD'S COMPUTERS",
  topFinishers: [
    { rank: 1, team: "DAD'S COMPUTERS", score: 14680 },
    { rank: 2, team: "LACTATION NATION", score: 14060 },
    { rank: 3, team: "TRIVIAL FURSUIT X: GON YIFF IT TO YA", score: 13510 },
    { rank: 4, team: "YAMA HAMA, IT'S FRIGHT NIGHT!", score: 13180 },
    { rank: 5, team: "NETWORK*", score: 12510 },
    { rank: 6, team: "TFC: ANY QUESTIONS?!", score: 12135 },
    { rank: 7, team: "TIN MAN: WEAR A MASK AND VOTE BIDEN!", score: 11805 },
    { rank: 8, team: "GRADUATES OF A LESSER GOD", score: 11650 },
    { rank: 9, team: "FRANKLIN STREET BURNOUTS", score: 11640 },
    { rank: 10, team: "COLLECTIVE FOOLE: PANDAMMIT!", score: 11585 },
  ],
  notes:
    "The April contest was cancelled because of COVID-19. 90FM ran this free, online-only contest on Oct 23-25 instead, with a shorter 38-hour schedule (6 p.m.-midnight Friday, 8 a.m.-midnight Saturday and Sunday) and answers sent through a web app. Final standings as of hour 38; the page footer is dated 10/26/2020.",
  sourceUrl:
    "https://www.90fmtrivia.org/Experiment%20Trivia%20Scores/results.html",
};

export default archive;
