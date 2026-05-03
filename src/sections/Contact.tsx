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
            className="contact-line flex items-baseline gap-x-3 sm:gap-x-6"
          >
            <span className="contact-label w-16 shrink-0 text-ink-tertiary sm:w-24">
              {line.label}
            </span>
            <span className="hidden text-ink-tertiary sm:inline">—</span>
            <a
              href={line.href}
              target={line.isEmail ? undefined : '_blank'}
              rel={line.isEmail ? undefined : 'noreferrer'}
              className="contact-value min-w-0 whitespace-nowrap underline decoration-ink-tertiary underline-offset-4 transition-colors hover:text-accent-vermilion hover:decoration-accent-vermilion"
            >
              {line.value}
            </a>
          </li>
        ))}
      </ul>
    </Section>
  )
}
