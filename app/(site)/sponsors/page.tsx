import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { getContact, getSponsors } from "@/lib/content";

export const metadata: Metadata = {
  title: "Sponsors",
  description:
    "The local and regional businesses who fund the World's Largest Trivia Contest and keep 90FM, the UWSP student radio station, on the air.",
};

export default function SponsorsPage() {
  const sponsors = getSponsors();
  const contact = getContact();

  return (
    <>
      <PageHero
        eyebrow="Made possible by"
        title="The folks who fund the contest"
        lede="The contest is a fundraiser for the radio station — these are the businesses paying to make it happen. Visit them. Buy their stuff. Tell them you saw them here."
      />

      <Section>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sponsors.map((s) => (
            <li key={s.url}>
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                data-sponsor={s.name}
                className="group flex h-full flex-col rounded-[var(--radius-card)] border border-rule bg-paper p-6 shadow-paper transition-colors hover:border-amber"
              >
                <span className="font-display text-xl font-semibold leading-tight text-ink group-hover:text-maroon">
                  {s.name}
                </span>
                {s.tagline ? (
                  <span className="mt-2 text-sm leading-relaxed text-ink-soft">
                    {s.tagline}
                  </span>
                ) : null}
                <span className="mt-auto pt-6 font-mono text-[0.7rem] uppercase tracking-[0.15em] text-ink-mute group-hover:text-amber-deep">
                  {new URL(s.url).hostname.replace(/^www\./, "")} →
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        eyebrow="The bigger picture"
        title="Why this matters"
        description="90FM is student-run. Every dollar these sponsors put in, plus every team registration and merch sale, keeps the station broadcasting all year."
      >
        <div className="rounded-[var(--radius-card)] border border-rule bg-paper p-6 shadow-paper sm:p-8">
          <p className="text-base leading-relaxed text-ink-soft">
            Want to add to it? You can{" "}
            <a
              href={contact.donate}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-maroon underline decoration-rule underline-offset-4 hover:decoration-amber-deep"
            >
              donate to Friends of 90FM
            </a>{" "}
            directly, or to sponsor the contest reach out to the coordinator at{" "}
            <a
              href={`mailto:${contact.coordinatorEmail}`}
              className="font-mono text-maroon underline decoration-rule underline-offset-4 hover:decoration-amber-deep"
            >
              {contact.coordinatorEmail}
            </a>
            .
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={contact.donate}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full bg-amber px-4 py-2 font-mono text-xs font-bold uppercase tracking-[0.12em] text-ink shadow-paper transition-colors hover:bg-amber-deep hover:text-paper"
            >
              Donate to Friends of 90FM
            </a>
            <Link
              href="/merch"
              className="inline-flex items-center rounded-full border border-rule bg-cream px-4 py-2 font-mono text-xs font-bold uppercase tracking-[0.12em] text-ink-soft transition-colors hover:border-amber hover:text-maroon"
            >
              Buy contest merch
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
