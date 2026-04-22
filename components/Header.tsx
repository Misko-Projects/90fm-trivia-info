import Link from "next/link";
import { Logo } from "@/components/Logo";
import { OnAirBadge } from "@/components/OnAirBadge";
import { UnofficialBadge } from "@/components/UnofficialBadge";
import { MobileNav } from "@/components/MobileNav";
import { ThemeToggle } from "@/components/ThemeToggle";
import { primaryNav } from "@/lib/nav";
import { getCurrentContest } from "@/lib/content";

export function Header() {
  const contest = getCurrentContest();

  return (
    <header className="sticky top-0 z-30 border-b border-rule bg-cream/85 backdrop-blur-md supports-[backdrop-filter]:bg-cream/70">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <Logo />
          <UnofficialBadge className="hidden sm:inline-flex" />
        </div>
        <OnAirBadge
          startsAt={contest.startsAt}
          endsAt={contest.endsAt}
          className="hidden sm:inline-flex"
        />
        <nav className="ml-auto hidden items-center gap-1 lg:flex" aria-label="Primary">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded px-2.5 py-1.5 text-sm font-medium text-ink-soft transition-colors hover:bg-paper hover:text-maroon"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2 lg:ml-2">
          <ThemeToggle />
          <Link
            href="/play"
            className="hidden rounded-full bg-maroon px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-[0.12em] text-paper shadow-paper transition-colors hover:bg-maroon-deep lg:inline-flex"
          >
            Register
          </Link>
          <MobileNav className="lg:hidden" />
        </div>
      </div>
    </header>
  );
}
