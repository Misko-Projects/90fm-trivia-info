import type { ArchiveYear } from "@/lib/types";

const archive: ArchiveYear = {
  year: 2001,
  contestNumber: 32,
  title: "Trivia 32 - Old Days",
  theme: "Old Days",
  dates: { start: "2001-04-20", end: "2001-04-23" },
  totalTeams: 461,
  winner: "NETWORK 2001: TIME AFTER TIM",
  topFinishers: [
    { rank: 1, team: "NETWORK 2001: TIME AFTER TIM", score: 8605 },
    { rank: 2, team: "CNOF 54: OLD AND DAZED", score: 8505 },
    { rank: 3, team: "TIN MAN", score: 7625 },
    { rank: 4, team: "FRANKLIN STREET BURNOUTS", score: 7310 },
    { rank: 5, team: "CHARLIE'S BEERPIGS", score: 7290 },
    { rank: 5, team: "GRADUATES OF A LESSER GOD", score: 7290 },
    { rank: 7, team: "GOOD NIGHT IRENE", score: 6975 },
    { rank: 8, team: "YAARGH! BIG & SCARY ZELLWEGER BUTTUM!", score: 6755 },
    { rank: 9, team: "LATE NIGHT WITH BOB KEESHAN", score: 6680 },
    { rank: 10, team: "BASEMENTALITY 2001:TRIVIA OZ DISEASE", score: 6655 },
  ],
  notes:
    "Final (hour 54) scores. The winner's name is cut off on the source page (\"TIME AFTER TIM\") and is kept as printed. Not linked from 90fmtrivia.org: in 2001-2003 the contest site was hosted at momsfamilies.com/trivia, so this comes from the Wayback Machine capture of 1 May 2001.",
  sourceUrl:
    "https://web.archive.org/web/20010501001918/http://momsfamilies.com/trivia/middleframe_2.htm",
};

export default archive;
