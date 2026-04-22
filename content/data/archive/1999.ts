import type { ArchiveYear } from "@/lib/types";

const archive: ArchiveYear = {
  year: 1999,
  contestNumber: 30,
  title: "Trivia Like It's 1999",
  theme: "Trivia Like It's 1999",
  winner: "CNOF54: RUNNIN' OUTTA TIME",
  topFinishers: [
    { rank: 1, team: "CNOF54: RUNNIN' OUTTA TIME", score: 11005 },
    { rank: 2, team: "TIN MAN", score: 10470 },
    { rank: 3, team: "NOTHIN' BUT NETWORK", score: 10400 },
    { rank: 4, team: "LATE NIGHT WITH BOB KEESHAN", score: 10020 },
    { rank: 5, team: "FRANKLIN STREET BURNOUTS", score: 9065 },
    { rank: 6, team: "YAARGH! BIG AND SCARY 54 HOUR DIAPER", score: 8925 },
    { rank: 7, team: "GRADUATES OF A LESSER GOD", score: 8775 },
    { rank: 8, team: "7 LORDS A LAYIN' MEET HUGH JAYNIS", score: 8695 },
    { rank: 9, team: "WRTM: WEDDING IN MICHIGAN SATURDAY", score: 8605 },
    { rank: 10, team: "GOOD NIGHT IRENE", score: 8545 },
  ],
  totalTeams: 491,
  notes: "Y2K-adjacent themed 54-hour contest; final standings extend to 491st place.",
  sourceUrl: "https://90fmtrivia.org/scores99.htm",
};

export default archive;
