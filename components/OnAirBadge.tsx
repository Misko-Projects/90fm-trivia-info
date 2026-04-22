"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

type Props = {
  startsAt: string;
  endsAt: string;
  className?: string;
  /** When true, also render an "Up Next" badge if the contest hasn't started yet. */
  showUpcoming?: boolean;
};

type Status = "before" | "live" | "after";

function statusFor(now: number, start: number, end: number): Status {
  if (now < start) return "before";
  if (now > end) return "after";
  return "live";
}

export function OnAirBadge({ startsAt, endsAt, className, showUpcoming = false }: Props) {
  const start = new Date(startsAt).getTime();
  const end = new Date(endsAt).getTime();

  // Render nothing on the server to avoid hydration mismatch on the time check.
  const [status, setStatus] = useState<Status | null>(null);

  useEffect(() => {
    const tick = () => setStatus(statusFor(Date.now(), start, end));
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, [start, end]);

  if (status === null) return null;
  if (status === "after") return null;
  if (status === "before" && !showUpcoming) return null;

  if (status === "live") {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1.5 rounded-sm bg-maroon px-2 py-0.5 font-mono text-[0.65rem] font-bold uppercase tracking-[0.18em] text-paper",
          className,
        )}
      >
        <span className="relative flex size-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber opacity-75" />
          <span className="relative inline-flex size-2 rounded-full bg-amber" />
        </span>
        On Air
      </span>
    );
  }

  // "before" with showUpcoming
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-sm border border-rule bg-paper px-2 py-0.5 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-ink-mute",
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-amber-deep" aria-hidden />
      Up Next
    </span>
  );
}
