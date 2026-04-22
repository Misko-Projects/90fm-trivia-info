import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { getArchiveYear, getArchiveYears } from "@/lib/content";

type Params = { year: string };

export function generateStaticParams(): Params[] {
  return getArchiveYears().map((y) => ({ year: String(y.year) }));
}

export async function generateMetadata(
  props: PageProps<"/archive/[year]">,
): Promise<Metadata> {
  const { year } = await props.params;
  const data = getArchiveYear(Number(year));
  if (!data) return { title: `${year} archive` };
  const title = data.title ?? `Trivia ${data.contestNumber ?? ""}`.trim();
  return {
    title: `${data.year} · ${title}`,
    description: `${title} — winner${data.winner ? ` ${data.winner}` : ""}, top finishers, and notes from the ${data.year} 90FM Trivia Contest.`,
  };
}

const previousYear = (years: number[], year: number) =>
  [...years].reverse().find((y) => y < year);

const nextYear = (years: number[], year: number) =>
  years.find((y) => y > year);

export default async function ArchiveYearPage(
  props: PageProps<"/archive/[year]">,
) {
  const { year: yearStr } = await props.params;
  const year = Number(yearStr);
  const data = getArchiveYear(year);
  if (!data) notFound();

  const allYears = getArchiveYears().map((y) => y.year).sort((a, b) => a - b);
  const prev = previousYear(allYears, year);
  const next = nextYear(allYears, year);

  const title = data.title ?? `Trivia ${data.contestNumber ?? year}`;

  return (
    <>
      <PageHero
        eyebrow={`Archive · ${year}`}
        title={title}
        lede={
          data.theme && !data.title?.toLowerCase().includes(data.theme.toLowerCase())
            ? data.theme
            : undefined
        }
      >
        <div className="flex flex-wrap gap-3">
          {prev ? (
            <Link
              href={`/archive/${prev}`}
              className="font-mono text-xs uppercase tracking-[0.15em] text-ink-mute underline decoration-rule underline-offset-4 hover:text-maroon"
            >
              ← {prev}
            </Link>
          ) : null}
          <Link
            href="/archive"
            className="font-mono text-xs uppercase tracking-[0.15em] text-ink-mute underline decoration-rule underline-offset-4 hover:text-maroon"
          >
            All years
          </Link>
          {next ? (
            <Link
              href={`/archive/${next}`}
              className="font-mono text-xs uppercase tracking-[0.15em] text-ink-mute underline decoration-rule underline-offset-4 hover:text-maroon"
            >
              {next} →
            </Link>
          ) : null}
        </div>
      </PageHero>

      <Section>
        <dl className="mb-10 grid gap-x-8 gap-y-5 rounded-[var(--radius-card)] border border-rule bg-paper p-6 shadow-paper sm:grid-cols-3 sm:p-8">
          <Detail label="Contest #">
            {data.contestNumber ?? "—"}
          </Detail>
          <Detail label="Total teams">
            {data.totalTeams !== undefined ? data.totalTeams.toLocaleString() : "—"}
          </Detail>
          <Detail label="Winner">
            <span className="font-display text-lg font-semibold text-ink">
              {data.winner ?? "Unknown"}
            </span>
          </Detail>
        </dl>

        {data.topFinishers && data.topFinishers.length > 0 ? (
          <div>
            <h2 className="mb-5 font-display text-2xl font-semibold tracking-tight text-ink">
              Top finishers
            </h2>
            <ol className="overflow-hidden rounded-[var(--radius-card)] border border-rule bg-paper shadow-paper">
              {data.topFinishers.map((f) => (
                <li
                  key={`${f.rank}-${f.team}`}
                  className="flex items-baseline justify-between gap-4 border-b border-rule px-5 py-3 text-ink-soft last:border-b-0"
                >
                  <div className="flex items-baseline gap-4 min-w-0">
                    <span className="font-mono text-sm font-bold text-maroon w-6">
                      {f.rank.toString().padStart(2, "0")}
                    </span>
                    <span className="truncate font-display text-base font-semibold text-ink">
                      {f.team}
                    </span>
                  </div>
                  {f.score !== undefined ? (
                    <span className="shrink-0 font-mono text-base text-ink-soft tabular-nums">
                      {f.score.toLocaleString()}
                    </span>
                  ) : null}
                </li>
              ))}
            </ol>
          </div>
        ) : (
          <p className="text-base text-ink-mute">
            No top-finisher data available for this year.
          </p>
        )}

        {data.notes ? (
          <p className="mt-8 max-w-2xl border-l-2 border-amber pl-4 text-sm italic text-ink-mute">
            {data.notes}
          </p>
        ) : null}

        {data.sourceUrl ? (
          <p className="mt-10 font-mono text-xs text-ink-mute">
            Source:{" "}
            <a
              href={data.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="underline decoration-rule underline-offset-4 hover:text-maroon"
            >
              {data.sourceUrl.replace(/^https?:\/\//, "")}
            </a>
          </p>
        ) : null}
      </Section>
    </>
  );
}

function Detail({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <dt className="mb-1 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-ink-mute">
        {label}
      </dt>
      <dd className="text-base text-ink-soft">{children}</dd>
    </div>
  );
}
