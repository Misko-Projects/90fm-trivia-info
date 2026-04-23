import Link from "next/link";
import { getContact, getSponsors } from "@/lib/content";
import { primaryNav } from "@/lib/nav";

export function Footer() {
  const contact = getContact();
  const sponsors = getSponsors();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-rule bg-paper">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        {/* Sponsor strip */}
        <section aria-labelledby="footer-sponsors" className="mb-12">
          <h2
            id="footer-sponsors"
            className="mb-4 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-ink-mute"
          >
            Made possible by
          </h2>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {sponsors.map((s) => (
              <li key={s.url}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-ink-soft underline decoration-rule decoration-1 underline-offset-4 transition-colors hover:text-maroon hover:decoration-amber-deep"
                >
                  {s.name}
                </a>
              </li>
            ))}
          </ul>
        </section>

        <div className="grid gap-10 md:grid-cols-3">
          {/* About / disclaimer */}
          <div className="space-y-3">
            <p className="font-display text-xl font-semibold text-ink">
              90FM Trivia <span className="text-maroon">.info</span>
            </p>
            <p className="text-sm leading-relaxed text-ink-soft">
              An unofficial companion site for the World&rsquo;s Largest Trivia
              Contest, run as a fundraiser by 90FM, the student radio station of
              UW–Stevens Point.
            </p>
            <p className="text-sm leading-relaxed text-ink-soft">
              The official contest site is{" "}
              <a
                href={contact.sourceSite}
                target="_blank"
                rel="noreferrer"
                className="font-medium text-maroon underline decoration-dotted underline-offset-2"
              >
                90fmtrivia.org
              </a>
              . Donations support the radio station — please give if you can.
            </p>
            <a
              href={contact.donate}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full bg-amber px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-[0.12em] text-ink shadow-paper transition-colors hover:bg-amber-deep hover:text-paper"
            >
              Donate to Friends of 90FM
            </a>
          </div>

          {/* Sitemap */}
          <div>
            <h3 className="mb-3 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-ink-mute">
              Pages
            </h3>
            <ul className="grid grid-cols-2 gap-y-1.5">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-ink-soft transition-colors hover:text-maroon"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-3 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-ink-mute">
              Contact
            </h3>
            <ul className="space-y-1.5 text-sm text-ink-soft">
              <li>
                <a
                  href={`mailto:${contact.coordinatorEmail}`}
                  className="transition-colors hover:text-maroon"
                >
                  {contact.coordinatorName}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${contact.studioPhone.replaceAll("-", "")}`}
                  className="font-mono text-[0.85rem] transition-colors hover:text-maroon"
                >
                  {contact.studioPhone}
                </a>
              </li>
              <li>
                <a
                  href={contact.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-maroon"
                >
                  Facebook
                </a>
                <span className="px-1.5 text-ink-mute">·</span>
                <a
                  href={contact.twitch}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-maroon"
                >
                  Twitch
                </a>
              </li>
              <li className="pt-2">
                <Link
                  href="/contact#correction"
                  className="text-xs text-ink-mute underline decoration-dotted underline-offset-2 transition-colors hover:text-maroon"
                >
                  Spotted something wrong? Tell us.
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-rule pt-6 font-mono text-[0.7rem] text-ink-mute">
          <p>
            &copy; {year} — Built independently from 90FM. Trivia content remains
            the property of the contest organizers.
          </p>
          <p>
            Source:{" "}
            <a
              href="https://github.com/Misko-Projects/90fm-trivia-info"
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-dotted underline-offset-2 hover:text-maroon"
            >
              GitHub
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
