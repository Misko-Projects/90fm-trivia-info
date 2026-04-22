import { cn } from "@/lib/cn";

/** Long-form text container with consistent typography. */
export function Prose({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        // Spacing & rhythm
        "space-y-5 text-lg leading-relaxed text-ink-soft",
        // Headings
        "[&_h2]:mt-12 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-ink",
        "[&_h3]:mt-10 [&_h3]:font-display [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-ink",
        "[&_p]:max-w-2xl",
        "[&_a]:text-maroon [&_a]:underline [&_a]:decoration-rule [&_a]:decoration-1 [&_a]:underline-offset-4 [&_a]:transition-colors hover:[&_a]:decoration-amber-deep",
        "[&_strong]:font-semibold [&_strong]:text-ink",
        "[&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ul]:max-w-2xl",
        "[&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2 [&_ol]:max-w-2xl",
        "[&_blockquote]:border-l-2 [&_blockquote]:border-maroon [&_blockquote]:pl-4 [&_blockquote]:italic",
        "[&_code]:rounded [&_code]:bg-paper [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.9em]",
        className,
      )}
    >
      {children}
    </div>
  );
}
