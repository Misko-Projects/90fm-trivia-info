import type { ArchiveIndexEntry } from "@/lib/types";

/** The years that have score pages, mostly linked from
 *  https://90fmtrivia.org/vault.html. Per-year detail (theme, top finishers,
 *  etc.) lives in archive/<year>.ts. 2001-2003 are not on the vault (the
 *  contest site was at momsfamilies.com/trivia then), so they come from the
 *  Wayback Machine; 2019 and 2020 are on 90fmtrivia.org but not linked from
 *  the vault. 2020 was the October online "Experiment in Trivia". */
export const archiveYears: ArchiveIndexEntry[] = [
  { year: 1997, hasDetail: true },
  { year: 1998, hasDetail: true },
  { year: 1999, hasDetail: true },
  { year: 2000, hasDetail: true },
  { year: 2001, hasDetail: true },
  { year: 2002, hasDetail: true },
  { year: 2003, hasDetail: true },
  { year: 2004, hasDetail: true },
  { year: 2005, hasDetail: true },
  { year: 2006, hasDetail: true },
  { year: 2007, hasDetail: true },
  { year: 2008, hasDetail: true },
  { year: 2009, hasDetail: true },
  { year: 2010, hasDetail: true },
  { year: 2011, hasDetail: true },
  { year: 2012, hasDetail: true },
  { year: 2013, hasDetail: true },
  { year: 2014, hasDetail: true },
  { year: 2015, hasDetail: true },
  { year: 2016, hasDetail: true },
  { year: 2017, hasDetail: true },
  { year: 2018, hasDetail: true },
  { year: 2019, hasDetail: true },
  { year: 2020, hasDetail: true },
  { year: 2021, hasDetail: true },
  { year: 2022, hasDetail: true },
  { year: 2023, hasDetail: true },
  { year: 2024, hasDetail: true },
  { year: 2025, hasDetail: true },
  { year: 2026, hasDetail: true },
];
