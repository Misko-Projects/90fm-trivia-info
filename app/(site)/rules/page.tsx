import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { Prose } from "@/components/Prose";
import { PointTable } from "@/components/PointTable";
import { getHourFormat, getStoneStampValues } from "@/lib/content";

export const metadata: Metadata = {
  title: "Rules & Scoring",
  description:
    "How the 90FM Trivia Contest works — eight questions an hour, two-song answer windows, one phone attempt per question, and inverse-correctness scoring from 5 to 500 points.",
};

export default function RulesPage() {
  const fmt = getHourFormat();
  const stone = getStoneStampValues();

  return (
    <>
      <PageHero
        eyebrow="Rules & Scoring"
        title="How the contest works"
        lede="Simple to play, brutal to win. Here are the mechanics, the scoring formula, and the side events."
      />

      <Section eyebrow="The basics" title="Each hour, on the hour">
        <Prose>
          <p>
            Eight questions are read over the air every hour, for{" "}
            <strong>{fmt.totalHours} consecutive hours</strong>. After each
            question, your team has{" "}
            <strong>{fmt.answerWindow}</strong> to phone in your answer. You get{" "}
            <strong>one attempt per question</strong> — calling back to change
            your answer forfeits the points for that question.
          </p>
          <p>
            As of 2026, each team receives a unique phone number for calling
            in answers. You&rsquo;ll find your number in your New Trivia Times
            packet — walk-in teams get it at registration, mail-in teams get
            it with their shipped packet.
          </p>

          <p className="font-mono text-sm text-ink-mute">
            All rules are subject to change, depending on OZ.
          </p>
        </Prose>
      </Section>

      <Section
        eyebrow="Scoring"
        title="Fewer correct, more points"
        description="Each question's value depends on how many teams answered it correctly. Hard questions reward sharply; easy ones almost nothing."
      >
        <PointTable />
        <p className="mt-6 max-w-2xl text-sm text-ink-mute">
          Each row is a threshold — for example, if 12 teams answer correctly,
          each earns 200 points; if 13–15 teams do, each earns the next tier
          down. Standings are updated live during the contest and read on-air
          at the top of each subsequent hour.
        </p>
      </Section>

      <Section
        eyebrow="Side events"
        title="Beyond the regular hours"
        description="Three special challenges run alongside the main contest. They are how good teams pull away from great teams."
      >
        <div className="grid gap-6 md:grid-cols-3">
          <SideEventCard
            label="Trivia Stone"
            description="Solve clues hidden in the contest broadcasts to find three stamping locations around Stevens Point and the surrounding countryside. Stamps must be collected by 6:30 PM Sunday."
          >
            <ul className="mt-4 space-y-1.5 font-mono text-sm">
              {stone.map((s) => (
                <li key={s.stamps} className="flex justify-between text-ink-soft">
                  <span>
                    {s.stamps} stamp{s.stamps === 1 ? "" : "s"}
                  </span>
                  <span className="text-maroon">{s.points} pts</span>
                </li>
              ))}
            </ul>
          </SideEventCard>
          <SideEventCard
            label="Running Questions"
            description="Saturday and Sunday at 7 AM. Questions whose answers require physically going somewhere in Stevens Point. Teams must answer in person within a reasonable travel radius."
          />
          <SideEventCard
            label="Music Snippets"
            description="Three rounds throughout the weekend, each playing eight short song snippets. Identify them and submit by the deadline announced on-air."
          />
        </div>
        <p className="mt-6 max-w-2xl text-sm text-ink-mute">
          Exact times for stones, music snippets, and the parade live on the{" "}
          <Link href="/schedule" className="text-maroon underline decoration-rule underline-offset-4">
            Schedule
          </Link>{" "}
          page.
        </p>
      </Section>

      <Section eyebrow="Trophies" title="What you play for">
        <Prose>
          <p>
            Trophies for first through tenth place are donated by Point Trophy.
            Past winners and full standings going back to 1997 live on the{" "}
            <Link href="/archive">Archive</Link>.
          </p>
        </Prose>
      </Section>
    </>
  );
}

function SideEventCard({
  label,
  description,
  children,
}: {
  label: string;
  description: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="rounded-[var(--radius-card)] border border-rule bg-paper p-6 shadow-paper">
      <h3 className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-maroon">
        {label}
      </h3>
      <p className="mt-3 text-base leading-relaxed text-ink-soft">
        {description}
      </p>
      {children}
    </div>
  );
}
