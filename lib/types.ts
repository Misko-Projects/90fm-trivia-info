export type Sponsor = {
  name: string;
  url: string;
  /** Optional path under /public, e.g. "/sponsors/point-brewing.png" */
  logo?: string;
  /** Short tagline shown under the name on the sponsors page */
  tagline?: string;
  tier?: "presenting" | "major" | "supporting";
};

export type Contest = {
  number: number;
  title: string;
  shortTitle: string;
  /** Omit until the official site announces it. Pages fall back to the
   *  contest number. */
  theme?: string;
  /** Local-time ISO datetime (Central Time) for the contest start. */
  startsAt: string;
  /** Local-time ISO datetime for the contest end. */
  endsAt: string;
  /** Postmark deadline for mail-in registration. Omit until announced; never
   *  carry a previous contest's date forward or estimate one. */
  mailRegistrationPostmarkBy?: string;
  /** Date by which mail-in materials should arrive. Omit until announced. */
  mailRegistrationArriveBy?: string;
  /** Date that the New Trivia Times packet is shipped. Omit until announced. */
  packetShipsOn?: string;
};

export type FutureContest = {
  year: number;
  /** ISO date(s) for the contest weekend, e.g. "April 9-11". */
  dates: string;
  number?: number;
};

export type ContactInfo = {
  coordinatorName: string;
  coordinatorEmail: string;
  studioPhone: string;
  studioAddress: {
    line1: string;
    city: string;
    state: string;
    zip: string;
    note?: string;
  };
  mailRegistration: {
    line1: string;
    line2: string;
    city: string;
    state: string;
    zip: string;
    payable: string;
  };
  facebook: string;
  twitch: string;
  listenStream: string;
  donate: string;
  sourceSite: string;
};

export type PointStructureRow = {
  /** Threshold: when *at least* this many teams got the question correct,
   *  they earn this many points. Lower threshold rows take precedence. */
  teamsCorrect: number;
  points: number;
};

export type ScheduleEventType =
  | "parade"
  | "contest-start"
  | "contest-end"
  | "regular-hour"
  | "special-hour"
  | "running-questions"
  | "music-snippets"
  | "stone-deadline"
  | "registration";

export type ScheduleEvent = {
  /** ISO datetime in Central Time. */
  at: string;
  /** Optional ISO datetime end. */
  endsAt?: string;
  type: ScheduleEventType;
  title: string;
  description?: string;
};

export type MerchItem = {
  name: string;
  category: "apparel" | "headwear" | "accessory" | "drinkware" | "media";
  price: number;
  sizes?: string;
  note?: string;
};

export type ArchiveIndexEntry = {
  year: number;
  contestNumber?: number;
  theme?: string;
  /** True if a per-year detail file exists in archive/[year].ts. */
  hasDetail: boolean;
};

export type ArchiveYear = {
  year: number;
  contestNumber?: number;
  title?: string;
  theme?: string;
  /** ISO dates. By convention `end` is the Monday the final standings were
   *  posted: the contest runs through midnight Sunday. */
  dates?: { start?: string; end?: string };
  totalTeams?: number;
  winner?: string;
  topFinishers?: { rank: number; team: string; score?: number }[];
  notes?: string;
  sourceUrl?: string;
};
