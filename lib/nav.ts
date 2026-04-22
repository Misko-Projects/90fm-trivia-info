export type NavItem = {
  href: string;
  label: string;
  /** Short description shown in mobile drawer & footer sitemap */
  hint?: string;
};

export const primaryNav: NavItem[] = [
  { href: "/about", label: "About", hint: "What is this contest, anyway?" },
  { href: "/play", label: "Play", hint: "Register, in person or online" },
  { href: "/listen", label: "Listen", hint: "Tune in to 90FM during the contest" },
  { href: "/rules", label: "Rules", hint: "How the contest works + scoring" },
  { href: "/schedule", label: "Schedule", hint: "Headline events, hour by hour" },
  { href: "/archive", label: "Archive", hint: "Every contest since 1997" },
  { href: "/sponsors", label: "Sponsors", hint: "The folks who make it possible" },
  { href: "/merch", label: "Merch", hint: "Shirts, pins, the movie, more" },
  { href: "/contact", label: "Contact", hint: "Reach OZ, donate, report a fix" },
];
