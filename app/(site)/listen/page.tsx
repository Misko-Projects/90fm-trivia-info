import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { OnAirBadge } from "@/components/OnAirBadge";
import { getContact, getCurrentContest } from "@/lib/content";

export const metadata: Metadata = {
  title: "Listen",
  description:
    "Tune in to 90FM during the contest — over the air at 89.9 FM in Stevens Point, online via the live stream, or via the Twitch video broadcast.",
};

export default function ListenPage() {
  const contact = getContact();
  const contest = getCurrentContest();

  return (
    <>
      <PageHero
        eyebrow="Tune in"
        title="Listen to the contest"
        lede="Three ways to follow along — over the air in Stevens Point, online from anywhere, or via the live Twitch broadcast."
      >
        <OnAirBadge
          startsAt={contest.startsAt}
          endsAt={contest.endsAt}
          showUpcoming
        />
      </PageHero>

      <Section>
        <div className="grid gap-6 md:grid-cols-3">
          <ListenCard
            label="Over the air"
            value="89.9 FM"
            note="WWSP-FM, Stevens Point area"
            cta="Stevens Point coverage map"
            href="https://en.wikipedia.org/wiki/WWSP"
          />
          <ListenCard
            label="Online stream"
            value="Live audio"
            note="Plays in any modern browser or media player"
            cta="Open the stream"
            href={contact.listenStream}
            primary
          />
          <ListenCard
            label="Video broadcast"
            value="Twitch"
            note="The studio camera and the in-person scene"
            cta="Watch on Twitch"
            href={contact.twitch}
          />
        </div>
      </Section>

      <Section eyebrow="When to tune in" title="Contest hours">
        <div className="rounded-[var(--radius-card)] border border-rule bg-paper p-6 shadow-paper sm:p-8">
          <p className="text-base text-ink-soft">
            Trivia {contest.number} runs continuously for 54 hours, from{" "}
            <strong className="text-ink">Friday April 17 at 6:00 PM</strong>{" "}
            through <strong className="text-ink">Sunday April 19</strong>.
            Eight questions per hour.
          </p>
          <p className="mt-4 text-base text-ink-soft">
            Outside the contest weekend, 90FM still streams 24/7 — student-run
            radio with rotating shows. The same{" "}
            <a
              href={contact.listenStream}
              className="font-medium text-maroon underline decoration-rule underline-offset-4 hover:decoration-amber-deep"
            >
              stream link
            </a>{" "}
            works year-round.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/schedule"
              className="inline-flex items-center rounded-full bg-maroon px-4 py-2 font-mono text-xs font-bold uppercase tracking-[0.12em] text-paper shadow-paper transition-colors hover:bg-maroon-deep"
            >
              See contest schedule
            </Link>
            <Link
              href="/rules"
              className="inline-flex items-center rounded-full border border-rule bg-cream px-4 py-2 font-mono text-xs font-bold uppercase tracking-[0.12em] text-ink-soft transition-colors hover:border-amber hover:text-maroon"
            >
              How the contest works
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}

function ListenCard({
  label,
  value,
  note,
  cta,
  href,
  primary = false,
}: {
  label: string;
  value: string;
  note: string;
  cta: string;
  href: string;
  primary?: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group flex flex-col rounded-[var(--radius-card)] border p-6 shadow-paper transition-colors ${
        primary
          ? "border-maroon bg-maroon text-paper hover:bg-maroon-deep"
          : "border-rule bg-paper text-ink-soft hover:border-amber"
      }`}
    >
      <span
        className={`font-mono text-[0.7rem] uppercase tracking-[0.18em] ${
          primary ? "text-paper/80" : "text-ink-mute"
        }`}
      >
        {label}
      </span>
      <span
        className={`mt-2 font-display text-3xl font-semibold leading-tight ${
          primary ? "text-paper" : "text-ink"
        }`}
      >
        {value}
      </span>
      <span
        className={`mt-3 text-sm ${primary ? "text-paper/85" : "text-ink-soft"}`}
      >
        {note}
      </span>
      <span
        className={`mt-6 inline-flex items-center font-mono text-xs uppercase tracking-[0.12em] ${
          primary
            ? "text-amber group-hover:text-paper"
            : "text-maroon group-hover:text-maroon-deep"
        }`}
      >
        {cta} →
      </span>
    </a>
  );
}
