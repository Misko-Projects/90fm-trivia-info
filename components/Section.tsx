import { cn } from "@/lib/cn";

type Props = {
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
};

export function Section({
  id,
  eyebrow,
  title,
  description,
  className,
  containerClassName,
  children,
}: Props) {
  return (
    <section id={id} className={cn("px-4 py-12 sm:px-6 sm:py-16", className)}>
      <div className={cn("mx-auto max-w-4xl", containerClassName)}>
        {(eyebrow || title || description) && (
          <header className="mb-8">
            {eyebrow ? (
              <p className="mb-2 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-maroon">
                {eyebrow}
              </p>
            ) : null}
            {title ? (
              <h2 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                {title}
              </h2>
            ) : null}
            {description ? (
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink-soft">
                {description}
              </p>
            ) : null}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
