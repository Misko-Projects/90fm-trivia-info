"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { primaryNav } from "@/lib/nav";

export function MobileNav({ className }: { className?: string }) {
  // The drawer closes itself via Dialog.Close wrappers on each link, so a
  // separate useEffect-pathname watcher would be redundant (and trip the
  // react-hooks/set-state-in-effect rule).
  return (
    <Dialog.Root>
      <Dialog.Trigger
        aria-label="Open navigation menu"
        className={cn(
          "inline-flex size-10 items-center justify-center rounded-md border border-rule bg-paper text-ink-soft transition-colors hover:border-amber hover:text-maroon",
          className,
        )}
      >
        <Menu className="size-5" />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-ink/40 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed inset-y-0 right-0 z-50 flex w-[88vw] max-w-sm flex-col gap-2 bg-cream p-6 shadow-paper data-[state=open]:animate-in data-[state=open]:slide-in-from-right">
          <div className="flex items-center justify-between">
            <Dialog.Title className="font-display text-lg font-semibold text-ink">
              90FM Trivia
            </Dialog.Title>
            <Dialog.Close
              aria-label="Close navigation menu"
              className="inline-flex size-8 items-center justify-center rounded-md text-ink-mute hover:bg-paper hover:text-maroon"
            >
              <X className="size-5" />
            </Dialog.Close>
          </div>
          <Dialog.Description className="font-mono text-[0.65rem] uppercase tracking-[0.15em] text-ink-mute">
            Unofficial companion site
          </Dialog.Description>
          <nav className="mt-4 flex flex-col" aria-label="Primary">
            {primaryNav.map((item) => (
              <Dialog.Close asChild key={item.href}>
                <Link
                  href={item.href}
                  className="group -mx-2 flex flex-col gap-0.5 rounded-md px-2 py-2 transition-colors hover:bg-paper"
                >
                  <span className="font-display text-lg font-semibold leading-tight text-ink group-hover:text-maroon">
                    {item.label}
                  </span>
                  {item.hint ? (
                    <span className="text-sm text-ink-mute">{item.hint}</span>
                  ) : null}
                </Link>
              </Dialog.Close>
            ))}
          </nav>
          <Dialog.Close asChild>
            <Link
              href="/play"
              className="mt-4 inline-flex items-center justify-center rounded-full bg-maroon px-4 py-2 font-mono text-xs font-bold uppercase tracking-[0.12em] text-paper shadow-paper transition-colors hover:bg-maroon-deep"
            >
              Register a team
            </Link>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
