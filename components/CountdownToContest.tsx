"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

type Props = {
  startsAt: string;
  endsAt: string;
  className?: string;
};

type View =
  | { state: "before"; days: number; hours: number; minutes: number }
  | { state: "live"; daysLeft: number; hoursLeft: number; minutesLeft: number }
  | { state: "after" };

function compute(now: number, start: number, end: number): View {
  if (now < start) {
    const ms = start - now;
    const minutes = Math.floor(ms / 60_000);
    const days = Math.floor(minutes / (60 * 24));
    const hours = Math.floor((minutes - days * 60 * 24) / 60);
    const mins = minutes - days * 60 * 24 - hours * 60;
    return { state: "before", days, hours, minutes: mins };
  }
  if (now <= end) {
    const ms = end - now;
    const minutes = Math.floor(ms / 60_000);
    const daysLeft = Math.floor(minutes / (60 * 24));
    const hoursLeft = Math.floor((minutes - daysLeft * 60 * 24) / 60);
    const minutesLeft = minutes - daysLeft * 60 * 24 - hoursLeft * 60;
    return { state: "live", daysLeft, hoursLeft, minutesLeft };
  }
  return { state: "after" };
}

export function CountdownToContest({ startsAt, endsAt, className }: Props) {
  const start = new Date(startsAt).getTime();
  const end = new Date(endsAt).getTime();
  const [view, setView] = useState<View | null>(null);

  useEffect(() => {
    const tick = () => setView(compute(Date.now(), start, end));
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, [start, end]);

  if (!view) {
    // Reserve space so the hero doesn't reflow on hydration
    return (
      <div
        aria-hidden
        className={cn(
          "h-[88px] rounded-[var(--radius-card)] border border-rule bg-paper",
          className,
        )}
      />
    );
  }

  if (view.state === "after") {
    return (
      <div
        className={cn(
          "rounded-[var(--radius-card)] border border-rule bg-paper px-5 py-4 shadow-paper",
          className,
        )}
      >
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-ink-mute">
          Trivia is wrapped
        </p>
        <p className="mt-1 font-display text-xl font-semibold text-ink">
          See you next April.
        </p>
      </div>
    );
  }

  if (view.state === "live") {
    return (
      <div
        className={cn(
          "rounded-[var(--radius-card)] border border-maroon bg-maroon px-5 py-4 text-paper shadow-paper",
          className,
        )}
      >
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-amber">
          On air now · Trivia in progress
        </p>
        <div className="mt-2 flex items-baseline gap-3">
          <Cell label="days left" value={view.daysLeft} accent />
          <Cell label="hours" value={view.hoursLeft} accent />
          <Cell label="minutes" value={view.minutesLeft} accent />
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "rounded-[var(--radius-card)] border border-rule bg-paper px-5 py-4 shadow-paper",
        className,
      )}
    >
      <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-maroon">
        Until contest begins
      </p>
      <div className="mt-2 flex items-baseline gap-3">
        <Cell label="days" value={view.days} />
        <Cell label="hours" value={view.hours} />
        <Cell label="minutes" value={view.minutes} />
      </div>
    </div>
  );
}

function Cell({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: number;
  accent?: boolean;
}) {
  return (
    <div className="flex items-baseline gap-1.5">
      <span
        className={cn(
          "font-mono text-3xl font-bold tabular-nums",
          accent ? "text-paper" : "text-ink",
        )}
      >
        {value.toString().padStart(2, "0")}
      </span>
      <span
        className={cn(
          "font-mono text-[0.65rem] uppercase tracking-[0.15em]",
          accent ? "text-paper/80" : "text-ink-mute",
        )}
      >
        {label}
      </span>
    </div>
  );
}
