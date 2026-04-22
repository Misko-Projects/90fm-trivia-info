import type { Metadata } from "next";
import Link from "next/link";
import { CountdownToContest } from "@/components/CountdownToContest";
import { OnAirBadge } from "@/components/OnAirBadge";
import {
  getContact,
  getCurrentContest,
  getFutureContests,
  getRegistrationCosts,
  getSponsors,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "90FM Trivia — World's Largest Trivia Contest",
  description:
    "An unofficial, modern guide to the 54-hour annual trivia contest run by 90FM in Stevens Point, WI — Trivia 56: The Love Contest, April 17–19, 2026.",
};

const contestStartFormatted = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    timeZone: "America/Chicago",
  });

export default function Home() {
  const contest = getCurrentContest();
  const sponsors = getSponsors();
  const future = getFutureContests();
  const cost = getRegistrationCosts();
  const contact = getContact();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-rule bg-paper-grain">
        <DialOrnament />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.4fr_1fr] lg:gap-14 lg:py-24">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-maroon">
                Trivia {contest.number}
              </p>
              <OnAirBadge
                startsAt={contest.startsAt}
                endsAt={contest.endsAt}
                showUpcoming
              />
            </div>
            <h1 className="mt-4 font-display text-[clamp(2.75rem,8vw,5.5rem)] font-semibold leading-[0.95] tracking-tight text-ink">
              The Love
              <br />
              Contest
            </h1>
            <p className="mt-6 max-w-xl font-display text-xl leading-snug text-ink-soft sm:text-2xl">
              <strong className="text-ink">54 hours of trivia.</strong>{" "}
              {contestStartFormatted(contest.startsAt)} – April 19, 2026, on
              89.9 FM in Stevens Point — or anywhere with a phone.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/play"
                className="inline-flex items-center rounded-full bg-maroon px-5 py-3 font-mono text-xs font-bold uppercase tracking-[0.12em] text-paper shadow-paper transition-colors hover:bg-maroon-deep"
              >
                Register a team — ${cost.online} mail-in
              </Link>
              <Link
                href="/listen"
                className="inline-flex items-center rounded-full border border-ink bg-cream px-5 py-3 font-mono text-xs font-bold uppercase tracking-[0.12em] text-ink transition-colors hover:bg-paper"
              >
                Listen live →
              </Link>
            </div>
            <p className="mt-6 max-w-xl text-sm text-ink-mute">
              An unofficial companion site for the World&rsquo;s Largest Trivia
              Contest, the annual fundraiser for 90FM, the student radio
              station of UW–Stevens Point.{" "}
              <Link
                href="/about"
                className="text-ink underline decoration-rule decoration-1 underline-offset-4 hover:text-maroon"
              >
                Why this site exists
              </Link>
              .
            </p>
          </div>

          <div className="lg:pt-2">
            <CountdownToContest
              startsAt={contest.startsAt}
              endsAt={contest.endsAt}
            />
            <div className="mt-4 grid gap-3 text-sm text-ink-soft">
              <FactRow
                label="Where"
                value="89.9 FM · Stevens Point, WI"
                href="/listen"
              />
              <FactRow
                label="Cost"
                value={`$${cost.inPerson} in-person · $${cost.online} mail-in`}
                href="/play"
              />
              <FactRow
                label="Format"
                value="8 questions an hour · phone in your answers"
                href="/rules"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quick read */}
      <section className="border-b border-rule px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <p className="mb-3 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-maroon">
            The quick read
          </p>
          <h2 className="max-w-3xl font-display text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl">
            Hundreds of teams. One radio station. 54 continuous hours of
            trivia, once a year.
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <NavCard
              eyebrow="What it is"
              title="About the contest"
              hint="50+ years of student radio's biggest weekend."
              href="/about"
            />
            <NavCard
              eyebrow="How to play"
              title="Register a team"
              hint="Walk in, or mail in a form from anywhere."
              href="/play"
            />
            <NavCard
              eyebrow="How to listen"
              title="Tune in"
              hint="Live audio stream + Twitch broadcast."
              href="/listen"
            />
            <NavCard
              eyebrow="The mechanics"
              title="Rules & scoring"
              hint="The point table, the two-song answer window, the side events."
              href="/rules"
            />
          </div>
        </div>
      </section>

      {/* Sponsor wall */}
      <section className="border-b border-rule bg-paper px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <div>
              <p className="mb-3 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-maroon">
                Made possible by
              </p>
              <h2 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                These sponsors keep the station on the air.
              </h2>
            </div>
            <Link
              href="/sponsors"
              className="font-mono text-xs uppercase tracking-[0.15em] text-maroon underline decoration-rule underline-offset-4 hover:decoration-amber-deep"
            >
              See them all →
            </Link>
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
            {sponsors.map((s) => (
              <li key={s.url}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display text-lg font-semibold text-ink-soft underline decoration-transparent underline-offset-4 transition-colors hover:text-maroon hover:decoration-amber-deep"
                >
                  {s.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Future + donate strip */}
      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2">
          <div className="rounded-[var(--radius-card)] border border-rule bg-paper p-6 shadow-paper sm:p-8">
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-ink-mute">
              Looking ahead
            </p>
            <h3 className="mt-2 font-display text-2xl font-semibold text-ink">
              Future contests
            </h3>
            <ul className="mt-4 space-y-2 font-mono text-base text-ink-soft">
              {future.map((f) => (
                <li key={f.year} className="flex justify-between border-b border-rule py-2 last:border-b-0">
                  <span>{f.dates}, {f.year}</span>
                  {f.number ? <span className="text-maroon">Trivia {f.number}</span> : null}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[var(--radius-card)] border border-amber bg-amber/15 p-6 shadow-paper sm:p-8">
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-amber-deep">
              Even if you can&rsquo;t play
            </p>
            <h3 className="mt-2 font-display text-2xl font-semibold text-ink">
              Donate to Friends of 90FM
            </h3>
            <p className="mt-3 text-base text-ink-soft">
              The whole reason this contest exists. Donations go directly to
              keeping the student radio station broadcasting all year.
            </p>
            <a
              href={contact.donate}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center rounded-full bg-amber px-4 py-2 font-mono text-xs font-bold uppercase tracking-[0.12em] text-ink transition-colors hover:bg-amber-deep hover:text-paper"
            >
              Give to Friends of 90FM →
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

function NavCard({
  eyebrow,
  title,
  hint,
  href,
}: {
  eyebrow: string;
  title: React.ReactNode;
  hint: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group flex h-full flex-col rounded-[var(--radius-card)] border border-rule bg-paper p-5 shadow-paper transition-colors hover:border-amber"
    >
      <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-maroon">
        {eyebrow}
      </span>
      <span className="mt-2 font-display text-xl font-semibold text-ink group-hover:text-maroon">
        {title}
      </span>
      <span className="mt-2 text-sm leading-relaxed text-ink-soft">
        {hint}
      </span>
      <span className="mt-auto pt-4 font-mono text-[0.65rem] uppercase tracking-[0.15em] text-ink-mute group-hover:text-amber-deep">
        Open →
      </span>
    </Link>
  );
}

function FactRow({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href?: string;
}) {
  const inner = (
    <div className="flex items-baseline justify-between gap-4 border-b border-rule py-2 last:border-b-0">
      <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-ink-mute">
        {label}
      </span>
      <span className="text-right text-sm">{value}</span>
    </div>
  );
  if (!href) return inner;
  return (
    <Link
      href={href}
      className="rounded-md text-ink-soft transition-colors hover:text-maroon"
    >
      {inner}
    </Link>
  );
}

function DialOrnament() {
  // Faint vinyl dial in the top-right corner of the hero — pure decoration
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute -right-32 -top-32 size-[28rem] text-maroon/10"
      viewBox="0 0 400 400"
      fill="none"
    >
      <circle cx="200" cy="200" r="195" stroke="currentColor" strokeWidth="1" />
      <circle cx="200" cy="200" r="160" stroke="currentColor" strokeWidth="1" />
      <circle cx="200" cy="200" r="125" stroke="currentColor" strokeWidth="1" />
      <circle cx="200" cy="200" r="90" stroke="currentColor" strokeWidth="1" />
      <circle cx="200" cy="200" r="55" stroke="currentColor" strokeWidth="1" />
      <circle cx="200" cy="200" r="20" fill="currentColor" />
      {Array.from({ length: 36 }).map((_, i) => {
        const angle = (i * 360) / 36;
        return (
          <line
            key={i}
            x1="200"
            y1="5"
            x2="200"
            y2={i % 9 === 0 ? "20" : "12"}
            stroke="currentColor"
            strokeWidth={i % 9 === 0 ? "1.5" : "0.75"}
            transform={`rotate(${angle} 200 200)`}
          />
        );
      })}
    </svg>
  );
}
