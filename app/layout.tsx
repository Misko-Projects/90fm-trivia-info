import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Mono, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz", "SOFT"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://90fmtrivia.info"),
  title: {
    default: "90FM Trivia — The World's Largest Trivia Contest",
    template: "%s · 90FM Trivia .info",
  },
  description:
    "An unofficial, modern guide to the World's Largest Trivia Contest — a 54-hour annual fundraiser run by 90FM, the student radio station of UW–Stevens Point. Rules, schedule, sponsors, history, and how to play.",
  applicationName: "90FM Trivia .info",
  keywords: [
    "90FM",
    "Trivia Contest",
    "World's Largest Trivia Contest",
    "Stevens Point",
    "UWSP",
    "Friends of 90FM",
  ],
  authors: [{ name: "90fmtrivia.info" }],
  openGraph: {
    title: "90FM Trivia — World's Largest Trivia Contest",
    description:
      "Unofficial companion site for the 54-hour annual trivia contest run by 90FM in Stevens Point, WI.",
    url: "https://90fmtrivia.info",
    siteName: "90FM Trivia .info",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "90FM Trivia .info",
    description:
      "Unofficial companion site for the World's Largest Trivia Contest.",
  },
  robots: { index: true, follow: true },
  other: {
    "x-unofficial-site": "true",
    "x-source-of-truth": "https://90fmtrivia.org",
  },
};

/* No-flash theme initializer. Runs synchronously before the browser paints,
 * so dark-mode users don't see a cream flash. Reads localStorage "theme" —
 * values: "light" | "dark" | "system" (default). */
const themeInitScript = `(function(){try{var t=localStorage.getItem("theme")||"system";var d=t==="dark"||(t==="system"&&window.matchMedia("(prefers-color-scheme: dark)").matches);document.documentElement.dataset.theme=d?"dark":"light";}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fraunces.variable} ${inter.variable} ${plexMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="flex min-h-full flex-col bg-cream text-ink">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
