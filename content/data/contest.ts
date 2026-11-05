import type { Contest, FutureContest } from "@/lib/types";

export const currentContest: Contest = {
  number: 57,
  title: "Trivia 57",
  shortTitle: "Trivia 57",
  // No `theme` yet: the official site has not announced one. Add it (and put
  // it in `title`, e.g. "Trivia 57 — <theme>") when it does.
  startsAt: "2027-04-09T18:00:00-05:00",
  // Midnight at the end of Sunday — written as 00:00 of the following day,
  // since "T24:00:00" is rejected by JS Date as invalid ISO 8601.
  endsAt: "2027-04-12T00:00:00-05:00",
  // No mail-registration dates yet: the official "Playing Online" page still
  // lists the 2026 deadlines. Add `mailRegistrationPostmarkBy`,
  // `mailRegistrationArriveBy` and `packetShipsOn` only once the 2027 dates
  // are published. Do not estimate them from the previous year.
};

/** Mirrors the official "Future Dates" page, which keeps listing the upcoming
 *  contest even after it is the current one above. `getFutureContests()`
 *  filters that year out, so leave the entry here. */
export const futureContests: FutureContest[] = [
  { year: 2027, dates: "April 9-11", number: 57 },
];

export const inPersonRegistrationCost = 40;
export const onlineRegistrationCost = 75;
