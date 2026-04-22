import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import {
  getContact,
  getCurrentContest,
  getRegistrationCosts,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Play",
  description:
    "Register a team for the World's Largest Trivia Contest — in person at the 90FM studios in Stevens Point, or remotely from anywhere.",
};

const friendlyDate = (iso: string) =>
  new Date(iso + "T00:00:00").toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

export default function PlayPage() {
  const contact = getContact();
  const contest = getCurrentContest();
  const cost = getRegistrationCosts();

  return (
    <>
      <PageHero
        eyebrow="Register a team"
        title="Anyone can play"
        lede="Teams of any size, any location. Two ways in: walk into the studios in Stevens Point, or mail in a form and dial into the contest from anywhere."
      />

      <Section
        id="in-person"
        eyebrow="Option 1"
        title="Register in person at the studios"
        description="Easiest if you're local. Show up during contest week, fill out a form, get a New Trivia Times packet with everything you need."
      >
        <div className="rounded-[var(--radius-card)] border border-rule bg-paper p-6 shadow-paper sm:p-8">
          <dl className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
            <Detail label="Where">
              <p>{contact.studioAddress.line1}</p>
              <p>
                {contact.studioAddress.city}, {contact.studioAddress.state}
              </p>
              <p className="text-sm text-ink-mute">
                {contact.studioAddress.note}
              </p>
            </Detail>
            <Detail label="When (contest week)">
              <p>Mon–Thu: 3:00–7:00 PM</p>
              <p>Friday: 12:00 noon – 6:00 PM</p>
            </Detail>
            <Detail label="Cost">
              <p>
                <strong className="font-mono text-2xl text-ink">
                  ${cost.inPerson}
                </strong>{" "}
                per team
              </p>
              <p className="text-sm text-ink-mute">
                Make checks payable to{" "}
                <em>{contact.mailRegistration.payable}</em>.
              </p>
            </Detail>
            <Detail label="What you get">
              <p>One copy of the New Trivia Times</p>
              <p className="text-sm text-ink-mute">
                Contains the rulebook, sponsor info, and everything you need to
                play.
              </p>
            </Detail>
          </dl>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="https://90fmtrivia.org/REGFORM.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full bg-maroon px-4 py-2 font-mono text-xs font-bold uppercase tracking-[0.12em] text-paper shadow-paper transition-colors hover:bg-maroon-deep"
            >
              Download registration form (PDF)
            </a>
            <Link
              href="/schedule"
              className="inline-flex items-center rounded-full border border-rule bg-cream px-4 py-2 font-mono text-xs font-bold uppercase tracking-[0.12em] text-ink-soft transition-colors hover:border-amber hover:text-maroon"
            >
              See contest schedule
            </Link>
          </div>
        </div>
      </Section>

      <Section
        id="online"
        eyebrow="Option 2"
        title="Register by mail · play remotely"
        description="The contest is broadcast over the air and online. Out-of-town teams print the registration form, mail it in with a check, and dial in to phone in answers."
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-[var(--radius-card)] border border-rule bg-paper p-6 shadow-paper sm:p-8">
            <h3 className="font-display text-lg font-semibold text-ink">
              Step by step
            </h3>
            <ol className="mt-4 space-y-3 text-base text-ink-soft">
              <li>
                <span className="font-mono text-sm text-maroon">01</span>{" "}
                Print the official registration form from{" "}
                <a
                  href="https://90fmtrivia.org/REGFORM.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-maroon underline decoration-rule underline-offset-4 hover:decoration-amber-deep"
                >
                  90fmtrivia.org
                </a>
                .
              </li>
              <li>
                <span className="font-mono text-sm text-maroon">02</span> Mail
                it with a ${cost.online} check made out to{" "}
                <em>{contact.mailRegistration.payable}</em> to the address at
                right.
              </li>
              <li>
                <span className="font-mono text-sm text-maroon">03</span>{" "}
                Postmark by{" "}
                <strong>{friendlyDate(contest.mailRegistrationPostmarkBy)}</strong>
                . Materials must arrive by{" "}
                <strong>{friendlyDate(contest.mailRegistrationArriveBy)}</strong>
                .
              </li>
              <li>
                <span className="font-mono text-sm text-maroon">04</span>{" "}
                Packets ship{" "}
                <strong>{friendlyDate(contest.packetShipsOn)}</strong> with your
                team ID, the New Trivia Times, and the phone number to dial
                during the contest.
              </li>
              <li>
                <span className="font-mono text-sm text-maroon">05</span> Tune
                in to <Link href="/listen">90FM&rsquo;s stream</Link> when the
                contest starts and call in your answers.
              </li>
            </ol>
          </div>
          <div className="rounded-[var(--radius-card)] border border-rule bg-paper p-6 shadow-paper sm:p-8">
            <h3 className="font-display text-lg font-semibold text-ink">
              Mail to
            </h3>
            <address className="mt-4 not-italic font-mono text-sm leading-relaxed text-ink">
              <p>{contact.mailRegistration.line1}</p>
              <p>{contact.mailRegistration.line2}</p>
              <p>
                {contact.mailRegistration.city},{" "}
                {contact.mailRegistration.state}{" "}
                {contact.mailRegistration.zip}
              </p>
            </address>
            <dl className="mt-6 space-y-3 text-sm text-ink-soft">
              <div className="flex justify-between border-b border-rule py-2">
                <dt className="font-mono text-xs uppercase tracking-[0.15em] text-ink-mute">
                  Cost
                </dt>
                <dd className="font-mono text-base text-ink">
                  ${cost.online}
                </dd>
              </div>
              <div className="flex justify-between border-b border-rule py-2">
                <dt className="font-mono text-xs uppercase tracking-[0.15em] text-ink-mute">
                  Payable to
                </dt>
                <dd className="text-ink">
                  {contact.mailRegistration.payable}
                </dd>
              </div>
              <div className="flex justify-between py-2">
                <dt className="font-mono text-xs uppercase tracking-[0.15em] text-ink-mute">
                  Questions?
                </dt>
                <dd>
                  <a
                    href={`mailto:${contact.coordinatorEmail}`}
                    className="font-mono text-maroon underline decoration-rule underline-offset-4 hover:decoration-amber-deep"
                  >
                    {contact.coordinatorEmail}
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </Section>

      <Section
        id="find-team"
        eyebrow="No team yet?"
        title="Find one"
        description={`Active community on Facebook — post that you're looking, or join an existing team.`}
      >
        <div className="flex flex-wrap items-center gap-3">
          <a
            href={contact.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-full bg-maroon px-4 py-2 font-mono text-xs font-bold uppercase tracking-[0.12em] text-paper shadow-paper transition-colors hover:bg-maroon-deep"
          >
            90FM Trivia on Facebook
          </a>
          <Link
            href="/contact"
            className="text-sm text-ink-soft underline decoration-rule underline-offset-4 hover:text-maroon"
          >
            Or contact the coordinator directly
          </Link>
        </div>
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
      <dt className="mb-2 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-ink-mute">
        {label}
      </dt>
      <dd className="space-y-1 text-base text-ink-soft">{children}</dd>
    </div>
  );
}
