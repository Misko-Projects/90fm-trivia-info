import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { Prose } from "@/components/Prose";
import { getContact, getCurrentContest } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "What 90FM Trivia is, why it exists, and why this site exists alongside the official one.",
};

export default function AboutPage() {
  const contact = getContact();
  const contest = getCurrentContest();

  return (
    <>
      <PageHero
        eyebrow="About"
        title="The World’s Largest Trivia Contest"
        lede="54 hours. 8 questions an hour. A parade, a scavenger hunt, running questions, three rounds of music snippets. Once a year. Since 1969."
      />

      <Section>
        <Prose>
          <p>
            Each April, 90FM — the student radio station of UW–Stevens Point —
            runs a continuous trivia contest over the airwaves. Hundreds of
            teams play from basements, bars, dorms, and remote dial-ins for the
            entire weekend. Eight questions an hour are broadcast live; teams
            have the length of two songs to phone in their answer; each team
            gets one shot per question.
          </p>
          <p>
            That&rsquo;s the contest in one paragraph. The thing it is in
            practice is harder to describe — a 54-hour endurance event that
            doubles as the city&rsquo;s biggest fundraiser for college radio,
            with rituals (the Friday parade, the Saturday and Sunday running
            questions, the Stone scavenger hunt) that have run for half a
            century.
          </p>

          <h2 id="how-it-scores">How scoring works</h2>
          <p>
            The fewer teams that get a question right, the more points it&rsquo;s
            worth. If only one team in the field nails it, that team earns 500
            points. If hundreds get it, everyone gets 5. The full table lives on
            the <Link href="/rules">Rules &amp; Scoring</Link> page.
          </p>

          <h2 id="this-year">{contest.title}</h2>
          <p>
            This year&rsquo;s contest runs <strong>April 17–19, 2026</strong>.
            See the <Link href="/schedule">Schedule</Link> for the headline
            events; <Link href="/play">Play</Link> for how to register a team
            from anywhere in the world; <Link href="/listen">Listen</Link> for
            how to tune in.
          </p>

          <h2 id="unofficial">Why this site exists</h2>
          <p>
            The official site is{" "}
            <a href={contact.sourceSite} target="_blank" rel="noreferrer">
              90fmtrivia.org
            </a>
            . It is also where this site sources every fact, schedule, and
            sponsor. We built <strong>90fmtrivia.info</strong>{" "}
            as an unofficial companion because the contest deserves a site you
            can actually share
            with someone who&rsquo;s never heard of it — readable on a phone,
            easy to navigate, and current. We are not affiliated with 90FM,
            UW–Stevens Point, or Friends of 90FM.
          </p>
          <p>
            <strong>If you take one thing from this site:</strong> the trivia
            contest is a fundraiser. Donate to{" "}
            <a href={contact.donate} target="_blank" rel="noreferrer">
              Friends of 90FM
            </a>
            . Buy <Link href="/merch">merch</Link>. Visit a{" "}
            <Link href="/sponsors">sponsor</Link>. Tell a friend.
          </p>
          <p>
            Spotted something out of date or wrong? Our{" "}
            <Link href="/contact#correction">contact page</Link> has a quick way
            to flag it. We watch the official site daily for updates and try to
            keep this one in sync, but humans are still in the loop.
          </p>
        </Prose>
      </Section>
    </>
  );
}
