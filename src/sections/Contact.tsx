import { Section } from '../components/Section'

const lines = [
  {
    label: 'email',
    value: 'michaelcrowley931@gmail.com',
    href: 'mailto:michaelcrowley931@gmail.com',
    isEmail: true,
  },
  {
    label: 'github',
    value: 'mcrowley19',
    href: 'https://github.com/mcrowley19',
    isEmail: false,
  },
  {
    label: 'twitter',
    value: 'notmcrowley',
    href: 'https://x.com/notmcrowley',
    isEmail: false,
  },
]

export function Contact() {
  return (
    <Section id="contact" numeral="V." kicker="Contact">
      <ul className="space-y-3 font-mono text-numeral text-ink-primary">
        {lines.map((line) => (
          <li
            key={line.label}
            className="flex flex-wrap items-baseline gap-x-4 gap-y-1 sm:gap-x-6"
          >
            <span className="w-20 text-ink-tertiary sm:w-24">{line.label}</span>
            <span className="hidden text-ink-tertiary sm:inline">—</span>
            <a
              href={line.href}
              target={line.isEmail ? undefined : '_blank'}
              rel={line.isEmail ? undefined : 'noreferrer'}
              className="break-all underline decoration-ink-tertiary underline-offset-4 transition-colors hover:text-accent-vermilion hover:decoration-accent-vermilion"
            >
              {line.value}
            </a>
          </li>
        ))}
      </ul>
    </Section>
  )
}
