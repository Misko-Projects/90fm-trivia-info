import type { ArchiveIndexEntry } from "@/lib/types";

/** The years that have score pages on https://90fmtrivia.org/vault.html.
 *  Per-year detail (theme, top finishers, etc.) lives in archive/<year>.ts.
 *  The 2001-2003 and 2019-2020 gaps are intentional — those years have no
 *  scores published on the source site (the 2020 contest was famously not held
 *  due to COVID; the others have no published archives). */
export const archiveYears: ArchiveIndexEntry[] = [
  { year: 1997, hasDetail: true },
  { year: 1998, hasDetail: true },
  { year: 1999, hasDetail: true },
  { year: 2000, hasDetail: true },
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
  { year: 2021, hasDetail: true },
  { year: 2022, hasDetail: true },
  { year: 2023, hasDetail: true },
  { year: 2024, hasDetail: true },
  { year: 2025, hasDetail: true },
];
