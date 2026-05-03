import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  numeral: string;
  kicker?: string;
  children: ReactNode;
  className?: string;
};

export function Section({
  id,
  kicker,
  children,
  className = "",
}: SectionProps) {
  return (
    <section id={id} className={`scroll-mt-16 ${className}`}>
      {kicker ? (
        <header className="mb-10 flex items-baseline gap-6">
          <span className="font-mono text-kicker uppercase text-ink-secondary">
            {kicker}
          </span>
        </header>
      ) : null}
      {children}
    </section>
  );
}
