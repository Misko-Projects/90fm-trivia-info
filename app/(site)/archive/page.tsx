import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { getArchiveYears } from "@/lib/content";

export const metadata: Metadata = {
  title: "Archive",
  description:
    "Every 90FM Trivia Contest with published scores — from 1997 through last year. Themes, winners, top finishers.",
};

export default function ArchivePage() {
  const years = [...getArchiveYears()].sort((a, b) => b.year - a.year);

  // Group years by decade for visual rhythm
  const byDecade = new Map<string, typeof years>();
  for (const y of years) {
    const decade = `${Math.floor(y.year / 10) * 10}s`;
    if (!byDecade.has(decade)) byDecade.set(decade, []);
    byDecade.get(decade)!.push(y);
  }

  return (
    <>
      <PageHero
        eyebrow="Archive"
        title="Past contests"
        lede="Themes, winners, and top finishers from every published contest. Some years have full standings, some only have winners. The 2020 contest was famously not held."
      />

      <Section>
        <div className="space-y-12">
          {[...byDecade.entries()].map(([decade, list]) => (
            <div key={decade}>
              <h2 className="mb-5 font-mono text-sm font-semibold uppercase tracking-[0.2em] text-ink-mute">
                {decade}
              </h2>
              <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {list.map((y) => (
                  <li key={y.year}>
                    <Link
                      href={`/archive/${y.year}`}
                      className="group flex h-full flex-col rounded-[var(--radius-card)] border border-rule bg-paper p-5 shadow-paper transition-colors hover:border-amber"
                    >
                      <span className="font-display text-3xl font-semibold leading-none text-ink group-hover:text-maroon">
                        {y.year}
                      </span>
                      {y.theme ? (
                        <span className="mt-2 text-sm text-ink-soft">
                          {y.theme}
                        </span>
                      ) : (
                        <span className="mt-2 text-sm text-ink-mute">
                          Trivia {y.contestNumber ?? "—"}
                        </span>
                      )}
                      <span className="mt-auto pt-4 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-ink-mute group-hover:text-amber-deep">
                        See details →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
