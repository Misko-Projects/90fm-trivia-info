import { cn } from "@/lib/cn";

type Props = {
  eyebrow?: string;
  title: string;
  lede?: string;
  className?: string;
  children?: React.ReactNode;
};

export function PageHero({ eyebrow, title, lede, className, children }: Props) {
  return (
    <section
      className={cn(
        "border-b border-rule bg-paper-grain px-4 py-16 sm:px-6 sm:py-20",
        className,
      )}
    >
      <div className="mx-auto max-w-4xl">
        {eyebrow ? (
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-maroon">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-5xl">
          {title}
        </h1>
        {lede ? (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft sm:text-xl">
            {lede}
          </p>
        ) : null}
        {children ? <div className="mt-8">{children}</div> : null}
      </div>
    </section>
  );
}
