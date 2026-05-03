import { Link } from 'react-router-dom'
import { projects } from '../data/projects'

export function Work() {
  return (
    <section id="work" className="scroll-mt-16">
      <header className="mb-12 flex items-baseline gap-6">
        <span className="font-mono text-numeral text-ink-tertiary">II.</span>
        <span className="font-mono text-kicker uppercase text-ink-secondary">Selected Work</span>
      </header>

      <ol className="border-t border-rule-line">
        {projects.map((p) => (
          <li key={p.slug} className="border-b border-rule-line">
            <Link
              to={`/projects/${p.slug}`}
              className="group grid grid-cols-[3rem_1fr_auto] items-baseline gap-x-6 gap-y-2 py-6 sm:grid-cols-[3rem_1fr_1.5fr_auto]"
            >
              <span className="font-mono text-numeral text-ink-tertiary transition-colors duration-200 group-hover:text-accent-vermilion">
                {p.numeral}
              </span>

              <span className="relative font-display text-[1.75rem] leading-tight tracking-[-0.02em] sm:text-display-m">
                <span className="relative">
                  {p.name}
                  <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-ink-primary transition-transform duration-[240ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
                </span>
              </span>

              <span className="hidden font-display text-body-m italic text-ink-secondary sm:inline">
                {p.description}
              </span>

              <span className="font-mono text-numeral text-ink-tertiary">{p.year}</span>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  )
}
