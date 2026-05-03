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
          <li key={line.label} className="flex items-baseline gap-6">
            <span className="w-24 text-ink-tertiary">{line.label}</span>
            <span className="text-ink-tertiary">—</span>
            <a
              href={line.href}
              target={line.isEmail ? undefined : '_blank'}
              rel={line.isEmail ? undefined : 'noreferrer'}
              className="underline decoration-ink-tertiary underline-offset-4 transition-colors hover:text-accent-vermilion hover:decoration-accent-vermilion"
            >
              {line.value}
            </a>
          </li>
        ))}
      </ul>
    </Section>
  )
}
