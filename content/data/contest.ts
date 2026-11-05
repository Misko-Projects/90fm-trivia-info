import type { Contest, FutureContest } from "@/lib/types";

export const currentContest: Contest = {
  number: 57,
  title: "Trivia 57",
  shortTitle: "Trivia 57",
  theme: "To be announced",
  startsAt: "2027-04-09T18:00:00-05:00",
  // Midnight at the end of Sunday — written as 00:00 of the following day,
  // since "T24:00:00" is rejected by JS Date as invalid ISO 8601.
  endsAt: "2027-04-12T00:00:00-05:00",
  mailRegistrationPostmarkBy: "2027-03-29",
  mailRegistrationArriveBy: "2027-04-02",
  packetShipsOn: "2027-04-05",
};

export const futureContests: FutureContest[] = [
  { year: 2027, dates: "April 9-11", number: 57 },
];

export const inPersonRegistrationCost = 40;
export const onlineRegistrationCost = 75;
