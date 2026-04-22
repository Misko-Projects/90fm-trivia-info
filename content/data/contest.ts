import type { Contest, FutureContest } from "@/lib/types";

export const currentContest: Contest = {
  number: 56,
  title: "Trivia 56 — The Love Contest",
  shortTitle: "The Love Contest",
  theme: "The Love Contest",
  startsAt: "2026-04-17T18:00:00-05:00",
  // Midnight at the end of Sunday — written as 00:00 of the following day,
  // since "T24:00:00" is rejected by JS Date as invalid ISO 8601.
  endsAt: "2026-04-20T00:00:00-05:00",
  mailRegistrationPostmarkBy: "2026-04-06",
  mailRegistrationArriveBy: "2026-04-10",
  packetShipsOn: "2026-04-13",
};

export const futureContests: FutureContest[] = [
  { year: 2027, dates: "April 9-11", number: 57 },
];

export const inPersonRegistrationCost = 40;
export const onlineRegistrationCost = 75;
