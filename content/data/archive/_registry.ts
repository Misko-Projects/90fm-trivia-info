import type { ArchiveYear } from "@/lib/types";
import y1997 from "./1997";
import y1998 from "./1998";
import y1999 from "./1999";
import y2000 from "./2000";
import y2004 from "./2004";
import y2005 from "./2005";
import y2006 from "./2006";
import y2007 from "./2007";
import y2008 from "./2008";
import y2009 from "./2009";
import y2010 from "./2010";
import y2011 from "./2011";
import y2012 from "./2012";
import y2013 from "./2013";
import y2014 from "./2014";
import y2015 from "./2015";
import y2016 from "./2016";
import y2017 from "./2017";
import y2018 from "./2018";
import y2021 from "./2021";
import y2022 from "./2022";
import y2023 from "./2023";
import y2024 from "./2024";
import y2025 from "./2025";

/** Static registry of all per-year archive entries.
 *  Static imports keep Turbopack happy and let `getArchiveYear` stay sync. */
export const archiveByYear: Record<number, ArchiveYear> = {
  1997: y1997,
  1998: y1998,
  1999: y1999,
  2000: y2000,
  2004: y2004,
  2005: y2005,
  2006: y2006,
  2007: y2007,
  2008: y2008,
  2009: y2009,
  2010: y2010,
  2011: y2011,
  2012: y2012,
  2013: y2013,
  2014: y2014,
  2015: y2015,
  2016: y2016,
  2017: y2017,
  2018: y2018,
  2021: y2021,
  2022: y2022,
  2023: y2023,
  2024: y2024,
  2025: y2025,
};
