import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import {
  getCurrentContest,
  getHeadlineSchedule,
  getMusicSnippetRounds,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Schedule",
  description:
    "Headline events for the 90FM Trivia Contest weekend — the parade, running questions, the Stone scavenger hunt, and music snippet rounds.",
};

const formatDateTime = (iso: string) =>
  new Date(iso).toLocaleString("en-US", {
    weekday: "long",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "America/Chicago",
  });

const formatDay = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    timeZone: "America/Chicago",
  });

const typeLabel: Record<string, string> = {
  parade: "Parade",
  "contest-start": "Contest start",
  "contest-end": "Contest end",
  "regular-hour": "Regular hour",
  "special-hour": "Special hour",
  "running-questions": "Running questions",
  "music-snippets": "Music snippets",
  "stone-deadline": "Stone deadline",
  registration: "Registration",
};

export default function SchedulePage() {
  const contest = getCurrentContest();
  const events = getHeadlineSchedule();
  const musicRounds = getMusicSnippetRounds();

  // Group events by day
  const byDay = new Map<string, typeof events>();
  for (const ev of events) {
    const day = formatDay(ev.at);
    if (!byDay.has(day)) byDay.set(day, []);
    byDay.get(day)!.push(ev);
  }

  return (
    <>
      <PageHero
        eyebrow={`Trivia ${contest.number}`}
        title={`${contest.theme} schedule`}
        lede="The signature events. The 54 regular hours run continuously between them."
      />

      <Section>
        <div className="space-y-12">
          {[...byDay.entries()].map(([day, dayEvents]) => (
            <div key={day}>
              <h2 className="mb-6 font-display text-2xl font-semibold tracking-tight text-ink">
                {day}
              </h2>
              <ol className="relative space-y-3 border-l border-rule pl-6">
                {dayEvents.map((ev) => (
                  <li key={ev.at} className="relative">
                    <span
                      className="absolute -left-[27px] top-3 size-2.5 rounded-full bg-maroon ring-4 ring-cream"
                      aria-hidden
                    />
                    <article className="rounded-[var(--radius-card)] border border-rule bg-paper p-5 shadow-paper">
                      <div className="flex flex-wrap items-baseline justify-between gap-3">
                        <p className="font-mono text-sm font-semibold text-ink">
                          {formatDateTime(ev.at).replace(/^[A-Za-z]+, /, "")}
                        </p>
                        <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-maroon">
                          {typeLabel[ev.type] ?? ev.type}
                        </span>
                      </div>
                      <h3 className="mt-2 font-display text-lg font-semibold text-ink">
                        {ev.title}
                      </h3>
                      {ev.description ? (
                        <p className="mt-1.5 text-base leading-relaxed text-ink-soft">
                          {ev.description}
                        </p>
                      ) : null}
                    </article>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Throughout the weekend"
        title="Music snippet rounds"
        description="Three rounds, eight snippets each, scattered through the contest. Exact air times are announced on the broadcast and on the official Music Snippet PDF."
      >
        <div className="grid gap-4 sm:grid-cols-3">
          {musicRounds.map((round) => (
            <div
              key={round.label}
              className="rounded-[var(--radius-card)] border border-rule bg-paper p-5 shadow-paper"
            >
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-maroon">
                {round.label}
              </p>
              <p className="mt-2 text-base text-ink-soft">{round.description}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-ink-mute">
          Times not listed yet for this year? They&rsquo;re finalized close to
          contest week. Check the{" "}
          <a
            href="https://90fmtrivia.org/musicschedule.pdf"
            target="_blank"
            rel="noreferrer"
            className="text-maroon underline decoration-rule underline-offset-4 hover:decoration-amber-deep"
          >
            official Music Snippet PDF
          </a>{" "}
          and the{" "}
          <a
            href="https://90fmtrivia.org/stonescd.pdf"
            target="_blank"
            rel="noreferrer"
            className="text-maroon underline decoration-rule underline-offset-4 hover:decoration-amber-deep"
          >
            Stone Schedule PDF
          </a>{" "}
          for the most current times.
        </p>
      </Section>

      <Section eyebrow="Looking ahead" title="Future contests">
        <p className="text-base text-ink-soft">
          Trivia 57 is scheduled for{" "}
          <strong className="text-ink">April 9–11, 2027</strong>.
        </p>
        <p className="mt-3 text-sm text-ink-mute">
          For year-by-year history, see the{" "}
          <Link
            href="/archive"
            className="text-maroon underline decoration-rule underline-offset-4 hover:decoration-amber-deep"
          >
            Archive
          </Link>
          .
        </p>
      </Section>
    </>
  );
}
