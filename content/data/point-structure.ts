import type { PointStructureRow } from "@/lib/types";

/** Current scoring as of Trivia 56 (2026). The public
 *  https://90fmtrivia.org/pointstructure.html page is out of date — these
 *  values come from a scoring spreadsheet provided by the contest organizer
 *  and supersede the HTML page.
 *
 *  Reading: when *at least* `teamsCorrect` teams got the question right
 *  (but fewer than the next row's threshold), each correct team earns `points`. */
export const pointStructure: PointStructureRow[] = [
  { teamsCorrect: 1, points: 500 },
  { teamsCorrect: 2, points: 400 },
  { teamsCorrect: 3, points: 375 },
  { teamsCorrect: 4, points: 350 },
  { teamsCorrect: 5, points: 325 },
  { teamsCorrect: 6, points: 300 },
  { teamsCorrect: 7, points: 275 },
  { teamsCorrect: 8, points: 250 },
  { teamsCorrect: 9, points: 235 },
  { teamsCorrect: 10, points: 225 },
  { teamsCorrect: 11, points: 210 },
  { teamsCorrect: 12, points: 200 },
  { teamsCorrect: 13, points: 175 },
  { teamsCorrect: 14, points: 165 },
  { teamsCorrect: 15, points: 150 },
  { teamsCorrect: 16, points: 135 },
  { teamsCorrect: 17, points: 125 },
  { teamsCorrect: 18, points: 110 },
  { teamsCorrect: 20, points: 100 },
  { teamsCorrect: 23, points: 95 },
  { teamsCorrect: 27, points: 90 },
  { teamsCorrect: 32, points: 85 },
  { teamsCorrect: 38, points: 80 },
  { teamsCorrect: 46, points: 75 },
  { teamsCorrect: 56, points: 70 },
  { teamsCorrect: 68, points: 65 },
  { teamsCorrect: 82, points: 60 },
  { teamsCorrect: 98, points: 55 },
  { teamsCorrect: 113, points: 50 },
  { teamsCorrect: 131, points: 45 },
  { teamsCorrect: 151, points: 40 },
  { teamsCorrect: 173, points: 35 },
  { teamsCorrect: 197, points: 30 },
  { teamsCorrect: 223, points: 25 },
  { teamsCorrect: 249, points: 20 },
  { teamsCorrect: 283, points: 15 },
  { teamsCorrect: 322, points: 10 },
  { teamsCorrect: 368, points: 5 },
];
