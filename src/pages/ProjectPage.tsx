import { useParams, Link } from 'react-router-dom'
import { projects } from '../data/projects'

export function ProjectPage() {
  const { slug } = useParams<{ slug: string }>()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <main className="mx-auto min-h-screen w-full max-w-[80rem] px-6 pb-32 sm:px-10 md:px-16 pt-32 md:pt-48">
        <p className="font-display text-body-l text-ink-secondary">Project not found.</p>
        <Link to="/" className="mt-6 block font-mono text-numeral text-ink-primary underline decoration-ink-tertiary underline-offset-4 hover:text-accent-vermilion hover:decoration-accent-vermilion">
          ← Back
        </Link>
      </main>
    )
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-[80rem] px-6 pb-32 sm:px-10 md:px-16">
      <div className="grid grid-cols-12 gap-x-6">
        <div className="col-span-12 md:col-span-10 md:col-start-2 pt-32 md:pt-48">
          <Link
            to="/"
            className="font-mono text-numeral text-ink-tertiary transition-colors hover:text-accent-vermilion"
          >
            ← Index
          </Link>

          <article className="mt-12 border-t border-rule-line pt-12">
            <header className="mb-8 flex items-baseline gap-6">
              <span className="font-mono text-numeral text-ink-tertiary">{project.numeral}</span>
              <h1 className="font-display text-display-m">{project.name}</h1>
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
        </div>
      </div>
    </main>
  )
}
