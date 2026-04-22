/**
 * Typed content accessor layer.
 *
 * Pages and components call these getters instead of importing data files
 * directly. This is the seam that lets us swap the storage backend later
 * (e.g. to a CMS like Sanity) without touching anything in `app/` or
 * `components/`.
 */

import type { ArchiveYear } from "@/lib/types";
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
export const getFutureContests = () => futureContests;
export const getRegistrationCosts = () => ({
  inPerson: inPersonRegistrationCost,
  online: onlineRegistrationCost,
});

export const getContact = () => contact;
export const getSponsors = () => sponsors;
export const getMerch = () => merch;

export const getPointStructure = () => pointStructure;
export const getHeadlineSchedule = () => headlineSchedule;
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
