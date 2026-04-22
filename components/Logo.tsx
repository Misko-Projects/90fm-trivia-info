import Link from "next/link";
import { cn } from "@/lib/cn";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="90FM Trivia .info — home"
      className={cn(
        "group inline-flex items-baseline gap-1 font-display tracking-tight text-ink",
        className,
      )}
    >
      <span className="whitespace-nowrap text-2xl font-bold leading-none">
        <span className="text-maroon">90FM</span> Trivia
      </span>
      <span className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-ink-mute group-hover:text-amber-deep">
        .info
      </span>
    </Link>
  );
}
