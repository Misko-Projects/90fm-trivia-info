import Link from "next/link";
import { cn } from "@/lib/cn";

export function UnofficialBadge({
  className,
  variant = "pill",
}: {
  className?: string;
  variant?: "pill" | "inline";
}) {
  if (variant === "inline") {
    return (
      <span className={cn("text-xs text-ink-mute", className)}>
        Unofficial fan site —{" "}
        <Link
          href="https://90fmtrivia.org"
          className="underline decoration-dotted underline-offset-2 hover:text-maroon"
          target="_blank"
          rel="noreferrer"
        >
          official site
        </Link>
      </span>
    );
  }

  return (
    <Link
      href="/about#unofficial"
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-rule bg-paper px-2.5 py-0.5 font-mono text-[0.6rem] font-semibold uppercase tracking-[0.15em] text-ink-mute transition-colors hover:border-amber hover:text-ink",
        className,
      )}
      title="Unofficial companion site — read why"
    >
      <span className="size-1.5 rounded-full bg-amber-deep" aria-hidden />
      Unofficial
    </Link>
  );
}
