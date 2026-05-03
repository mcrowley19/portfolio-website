import type { Project } from '../data/projects'

export function ProjectEntry({ project }: { project: Project }) {
  return (
    <article
      id={`project-${project.slug}`}
      className="scroll-mt-24 border-t border-rule-line pt-12"
    >
      <header className="mb-8 flex items-baseline gap-6">
        <span className="font-mono text-numeral text-ink-tertiary">{project.numeral}</span>
        <h3 className="font-display text-display-m">{project.name}</h3>
      </header>

      <div className="max-w-[65ch] space-y-6 font-display text-body-m text-ink-primary">
        {project.paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      <dl className="mt-10 grid grid-cols-1 gap-x-12 gap-y-3 font-mono text-numeral text-ink-secondary sm:grid-cols-[max-content_1fr]">
        <dt className="uppercase text-ink-tertiary">Role</dt>
        <dd>{project.role}</dd>
        <dt className="uppercase text-ink-tertiary">Timeframe</dt>
        <dd>{project.timeframe}</dd>
        <dt className="uppercase text-ink-tertiary">Status</dt>
        <dd>{project.status}</dd>
      </dl>

      <p className="mt-8 font-mono text-numeral">
        <a
          href={project.link.href}
          target="_blank"
          rel="noreferrer"
          className="text-ink-primary underline decoration-ink-tertiary underline-offset-4 transition-colors hover:text-accent-vermilion hover:decoration-accent-vermilion"
        >
          {project.link.label}
        </a>
      </p>
    </article>
  )
}
