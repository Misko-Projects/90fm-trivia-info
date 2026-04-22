import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { getContact } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach the contest coordinator, the radio station, or report a correction to this site.",
};

export default function ContactPage() {
  const contact = getContact();

  return (
    <>
      <PageHero
        eyebrow="Get in touch"
        title="Contact"
        lede="The contest coordinator handles registrations, rule disputes, and almost everything else. The station has a phone too."
      />

      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          <article className="rounded-[var(--radius-card)] border border-rule bg-paper p-6 shadow-paper sm:p-8">
            <h2 className="font-display text-xl font-semibold text-ink">
              Trivia coordinator
            </h2>
            <p className="mt-3 text-base text-ink-soft">
              {contact.coordinatorName} runs the contest. Email is the fastest
              path for anything contest-related.
            </p>
            <ul className="mt-5 space-y-2.5 font-mono text-sm">
              <li>
                <a
                  href={`mailto:${contact.coordinatorEmail}`}
                  className="text-maroon underline decoration-rule underline-offset-4 hover:decoration-amber-deep"
                >
                  {contact.coordinatorEmail}
                </a>
              </li>
            </ul>
          </article>

          <article className="rounded-[var(--radius-card)] border border-rule bg-paper p-6 shadow-paper sm:p-8">
            <h2 className="font-display text-xl font-semibold text-ink">
              90FM studios
            </h2>
            <p className="mt-3 text-base text-ink-soft">
              The radio station itself. Often unstaffed — leave a message.
            </p>
            <ul className="mt-5 space-y-2.5 font-mono text-sm">
              <li>
                <a
                  href={`tel:${contact.studioPhone.replaceAll("-", "")}`}
                  className="text-maroon underline decoration-rule underline-offset-4 hover:decoration-amber-deep"
                >
                  {contact.studioPhone}
                </a>
              </li>
              <li className="text-ink-soft">
                {contact.studioAddress.line1}
              </li>
              <li className="text-ink-soft">
                {contact.studioAddress.city}, {contact.studioAddress.state}
              </li>
              <li className="text-xs text-ink-mute">
                {contact.studioAddress.note}
              </li>
            </ul>
          </article>
        </div>
      </Section>

      <Section eyebrow="Online" title="Where 90FM lives on the internet">
        <ul className="grid gap-3 sm:grid-cols-2">
          <ContactLink
            label="Official site"
            value="90fmtrivia.org"
            href={contact.sourceSite}
          />
          <ContactLink
            label="Facebook"
            value="90FM Trivia"
            href={contact.facebook}
          />
          <ContactLink
            label="Twitch"
            value="trivia90"
            href={contact.twitch}
          />
          <ContactLink
            label="Live stream"
            value="Listen now"
            href={contact.listenStream}
          />
        </ul>
      </Section>

      <Section
        id="correction"
        eyebrow="Spotted something off?"
        title="Report a correction"
        description="This is an unofficial site that tracks the official one daily, but humans are still in the loop and we miss things."
      >
        <div className="rounded-[var(--radius-card)] border border-rule bg-paper p-6 shadow-paper sm:p-8">
          <p className="text-base leading-relaxed text-ink-soft">
            If anything on{" "}
            <strong className="text-ink">90fmtrivia.info</strong> is wrong,
            outdated, or contradicts the official site, send an email and
            we&rsquo;ll fix it fast. Tell us the page URL and what&rsquo;s
            wrong.
          </p>
          <div className="mt-6">
            <a
              href={`mailto:hello@90fmtrivia.info?subject=Correction%3A%20`}
              className="inline-flex items-center rounded-full bg-maroon px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-[0.12em] text-paper shadow-paper transition-colors hover:bg-maroon-deep"
            >
              Email a correction
            </a>
          </div>
        </div>
      </Section>

      <Section eyebrow="Support the station" title="Donate">
        <p className="text-base text-ink-soft">
          The whole reason this contest exists is to fund 90FM. Donations go to
          Friends of 90FM, the non-profit that supports the station.
        </p>
        <div className="mt-5">
          <a
            href={contact.donate}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-full bg-amber px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-[0.12em] text-ink shadow-paper transition-colors hover:bg-amber-deep hover:text-paper"
          >
            Donate to Friends of 90FM
          </a>
        </div>
      </Section>
    </>
  );
}

function ContactLink({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href: string;
}) {
  return (
    <li>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center justify-between rounded-[var(--radius-card)] border border-rule bg-paper px-4 py-3 shadow-paper transition-colors hover:border-amber"
      >
        <div>
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-ink-mute">
            {label}
          </p>
          <p className="mt-1 font-display text-base font-semibold text-ink group-hover:text-maroon">
            {value}
          </p>
        </div>
        <span className="font-mono text-xs text-ink-mute group-hover:text-maroon">
          →
        </span>
      </a>
    </li>
  );
}
