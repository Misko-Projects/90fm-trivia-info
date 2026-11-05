/**
 * Typed content accessor layer.
 *
 * Pages and components call these getters instead of importing data files
 * directly. This is the seam that lets us swap the storage backend later
 * (e.g. to a CMS like Sanity) without touching anything in `app/` or
 * `components/`.
 */

import type { ArchiveYear, Contest } from "@/lib/types";
import { archiveYears } from "@/content/data/archive";
import { archiveByYear } from "@/content/data/archive/_registry";
import { contact } from "@/content/data/contact";
import {
  currentContest,
  futureContests,
  inPersonRegistrationCost,
  onlineRegistrationCost,
} from "@/content/data/contest";
import { merch } from "@/content/data/merch";
import { pointStructure } from "@/content/data/point-structure";
import {
  headlineSchedule,
  hourFormat,
  musicSnippetRounds,
  stoneStampValues,
} from "@/content/data/schedule";
import { sponsors } from "@/content/data/sponsors";

export const getCurrentContest = () => currentContest;

/** Contests announced for years after the current one. */
export const getFutureContests = () => {
  const currentYear = Number(currentContest.startsAt.slice(0, 4));
  return futureContests.filter((f) => f.year > currentYear);
};

/** "Trivia 56: The Love Contest", or just "Trivia 57" before a theme is
 *  announced. */
export const getContestLabel = (contest: Contest = currentContest) =>
  contest.theme
    ? `Trivia ${contest.number}: ${contest.theme}`
    : `Trivia ${contest.number}`;

const CONTEST_TIME_ZONE = "America/Chicago";
const inContestZone = (date: Date, options: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat("en-US", {
    timeZone: CONTEST_TIME_ZONE,
    ...options,
  }).format(date);

/** Display strings for a contest's dates, derived from `startsAt`/`endsAt`.
 *  Pages use these instead of writing dates into their copy, so rolling over
 *  to the next contest is a data-only change.
 *
 *  `endsAt` is midnight at the end of Sunday, stored as 00:00 Monday, so the
 *  last day of play is read from one millisecond earlier. */
export function getContestDates(contest: Contest = currentContest) {
  const start = new Date(contest.startsAt);
  const lastDay = new Date(new Date(contest.endsAt).getTime() - 1);
  const startMonth = inContestZone(start, { month: "long" });
  const endMonth = inContestZone(lastDay, { month: "long" });
  const startDate = inContestZone(start, { day: "numeric" });
  const endDate = inContestZone(lastDay, { day: "numeric" });
  const year = inContestZone(lastDay, { year: "numeric" });
  const dayOptions: Intl.DateTimeFormatOptions = {
    weekday: "long",
    month: "long",
    day: "numeric",
  };
  return {
    /** e.g. "April 9–11, 2027" */
    range:
      startMonth === endMonth
        ? `${startMonth} ${startDate}–${endDate}, ${year}`
        : `${startMonth} ${startDate} – ${endMonth} ${endDate}, ${year}`,
    /** e.g. "Friday, April 9" */
    startDay: inContestZone(start, dayOptions),
    /** e.g. "6:00 PM" */
    startTime: inContestZone(start, { hour: "numeric", minute: "2-digit" }),
    /** e.g. "Sunday, April 11" */
    endDay: inContestZone(lastDay, dayOptions),
  };
}
export const getRegistrationCosts = () => ({
  inPerson: inPersonRegistrationCost,
  online: onlineRegistrationCost,
});

export const getContact = () => contact;
export const getSponsors = () => sponsors;
export const getMerch = () => merch;

export const getPointStructure = () => pointStructure;
export const getHeadlineSchedule = () => headlineSchedule;

/** True when the stored headline schedule belongs to the current contest:
 *  every event falls on the contest weekend. A day of slack either side covers
 *  the parade, which is a few hours before the first question. After a
 *  rollover this is false until the new schedule is entered. */
export function isHeadlineScheduleCurrent(): boolean {
  const DAY_MS = 24 * 60 * 60 * 1000;
  const from = new Date(currentContest.startsAt).getTime() - DAY_MS;
  const to = new Date(currentContest.endsAt).getTime() + DAY_MS;
  return (
    headlineSchedule.length > 0 &&
    headlineSchedule.every((ev) => {
      const at = new Date(ev.at).getTime();
      return at >= from && at <= to;
    })
  );
}
export const getMusicSnippetRounds = () => musicSnippetRounds;
export const getStoneStampValues = () => stoneStampValues;
export const getHourFormat = () => hourFormat;

/** Index of every catalogued year, enriched with theme + contest # from each
 *  year's detail file. Sorted oldest to newest. */
export function getArchiveYears() {
  return archiveYears.map((entry) => {
    const detail = archiveByYear[entry.year];
    return {
      ...entry,
      theme: detail?.theme,
      contestNumber: detail?.contestNumber,
    };
  });
}

/** Returns the per-year archive entry, or null if the year isn't catalogued. */
export function getArchiveYear(year: number): ArchiveYear | null {
  return archiveByYear[year] ?? null;
}
