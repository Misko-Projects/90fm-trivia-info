import type { ScheduleEvent } from "@/lib/types";

/** Headline events for Trivia 56 — 2026-04-17 through 2026-04-19, Central Time.
 *  We don't enumerate every regular hour (there are 54 of them) — only the
 *  signature events players plan their weekend around. */
export const headlineSchedule: ScheduleEvent[] = [
  {
    at: "2026-04-17T16:00:00-05:00",
    type: "parade",
    title: "Trivia Parade",
    description:
      "Floats, candy, and the most absurd collection of trivia players ever assembled. Starts in Lot Q, winds west through campus, ends at the P.J. Jacobs parking lot.",
  },
  {
    at: "2026-04-17T18:00:00-05:00",
    type: "contest-start",
    title: "Contest begins",
    description: "First question of Trivia 56 hits the airwaves at 6:00 PM sharp.",
  },
  {
    at: "2026-04-18T07:00:00-05:00",
    type: "running-questions",
    title: "Saturday Running Questions",
    description:
      "Questions you have to physically run to answer. Locations announced on-air; teams have a reasonable travel radius.",
  },
  {
    at: "2026-04-19T07:00:00-05:00",
    type: "running-questions",
    title: "Sunday Running Questions",
    description: "Second running questions round.",
  },
  {
    at: "2026-04-19T18:30:00-05:00",
    type: "stone-deadline",
    title: "Trivia Stone deadline",
    description:
      "All three Stone stamps must be collected by 6:30 PM Sunday for the 300-point reward.",
  },
  {
    at: "2026-04-19T23:59:00-05:00",
    type: "contest-end",
    title: "Contest ends",
    description:
      "54 hours of trivia. Winners announced shortly after. Trophies through 10th place donated by Point Trophy.",
  },
];

/** Music Snippet rounds — three segments with eight snippets each.
 *  Exact times come from the official Music Snippet Schedule PDF on
 *  90fmtrivia.org and refresh annually; the watcher should keep this current. */
export const musicSnippetRounds = [
  {
    label: "Round 1",
    description: "Eight song snippets — submit by the deadline announced on-air.",
  },
  {
    label: "Round 2",
    description: "Eight song snippets.",
  },
  {
    label: "Round 3",
    description: "Eight song snippets.",
  },
];

export const stoneStampValues = [
  { stamps: 1, points: 50 },
  { stamps: 2, points: 150 },
  { stamps: 3, points: 300 },
];

/** Regular question format: 8 questions per hour, points scaled by point structure,
 *  one phone attempt per question, "two songs" answer window. */
export const hourFormat = {
  regularQuestionsPerHour: 8,
  attemptsPerQuestion: 1,
  answerWindow: "the length of two songs",
  totalHours: 54,
};
