"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useEffect, useSyncExternalStore } from "react";
import { cn } from "@/lib/cn";

type Choice = "light" | "dark" | "system";

const CHOICES: Choice[] = ["light", "dark", "system"];
const LABEL: Record<Choice, string> = {
  light: "Light",
  dark: "Dark",
  system: "System",
};

function isChoice(v: unknown): v is Choice {
  return typeof v === "string" && (CHOICES as string[]).includes(v);
}

function readStoredChoice(): Choice {
  try {
    const v = localStorage.getItem("theme");
    return isChoice(v) ? v : "system";
  } catch {
    return "system";
  }
}

/** Subscribes to cross-tab changes of `localStorage.theme` so if the user
 *  changes the theme in another tab, this button updates. */
function subscribeToThemeChanges(cb: () => void) {
  const handler = (e: StorageEvent) => {
    if (e.key === "theme") cb();
  };
  window.addEventListener("storage", handler);
  return () => window.removeEventListener("storage", handler);
}

function resolve(choice: Choice): "light" | "dark" {
  if (choice === "system") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
  return choice;
}

function applyTheme(choice: Choice) {
  document.documentElement.dataset.theme = resolve(choice);
}

export function ThemeToggle({ className }: { className?: string }) {
  // `useSyncExternalStore` reads the persisted choice on mount and keeps
  // the component in sync across tabs. The server snapshot returns null,
  // which matches the pre-hydration markup (no icon rendered yet).
  const choice = useSyncExternalStore<Choice | null>(
    subscribeToThemeChanges,
    readStoredChoice,
    () => null,
  );

  // Follow the system preference dynamically when the user is on "system".
  useEffect(() => {
    if (choice !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => applyTheme("system");
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [choice]);

  function cycle() {
    const current = choice ?? "system";
    const next = CHOICES[(CHOICES.indexOf(current) + 1) % CHOICES.length];
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* private mode or blocked — fall through, theme still applies for session */
    }
    applyTheme(next);
    // Mirror the storage event within the same tab so useSyncExternalStore
    // re-reads: `storage` events only fire across tabs, not within the tab
    // that made the change.
    window.dispatchEvent(new StorageEvent("storage", { key: "theme" }));
  }

  const icon = !choice ? null : choice === "light" ? (
    <Sun className="size-4" />
  ) : choice === "dark" ? (
    <Moon className="size-4" />
  ) : (
    <Monitor className="size-4" />
  );

  return (
    <button
      type="button"
      onClick={cycle}
      suppressHydrationWarning
      aria-label={
        choice ? `Theme: ${LABEL[choice]}. Click to change.` : "Theme toggle"
      }
      title={choice ? `Theme: ${LABEL[choice]}` : "Theme"}
      className={cn(
        "inline-flex size-9 items-center justify-center rounded-md border border-rule bg-paper text-ink-soft transition-colors hover:border-amber hover:text-maroon",
        className,
      )}
    >
      {icon}
    </button>
  );
}
