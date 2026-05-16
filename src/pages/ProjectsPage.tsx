import { useState } from 'react'
import lockupImg from '../assets/webp/projects/lockup.webp'
import sol450Img from '../assets/webp/projects/sol-450.webp'
import shoelaceImg from '../assets/webp/projects/shoelace.webp'
import metricareImg from '../assets/webp/projects/metricare.webp'
import kangratImg from '../assets/webp/projects/kangrat.webp'
import micrograJavaImg from '../assets/webp/projects/micrograd-java.webp'
import snapswingImg from '../assets/webp/projects/snapswing.webp'
import linearOpsImg from '../assets/webp/projects/linear-ops.webp'
import learnquotesImg from '../assets/webp/projects/learnquotes.webp'
import tempHumidityImg from '../assets/webp/projects/temp-h.webp'

type Row = {
  name: string
  date: string
  tech: string
  description: string
  image?: string
  imageFilter?: string
  imageObjectFit?: 'cover' | 'contain'
  imageObjectPosition?: string
  link?: string
}

const rows: Row[] = [
  {
    name: 'Lockup',
    date: 'Apr 2026 – Present',
    tech: 'React Native',
    link: 'https://lockup-app.com',
    description:
      'Phone-free classrooms without the pouch drama. Teachers run sessions from a dashboard, students join on their real device, and compliance is visible without policing the door.',
    image: lockupImg,
  },
  {
    name: 'Sol-450',
    date: 'Mar 2026',
    tech: 'React, Three.js, Python, AWS',
    description:
      'A 3D simulation of a greenhouse on Mars. Food production managed using 6 AI agents to ensure a stable food supply.',
    image: sol450Img,
    imageFilter: 'saturate(1.4) brightness(1.05) contrast(0.95)',
    link: 'https://github.com/mcrowley19/mars-food-simulation',
  },
  {
    name: 'Shoelace',
    date: 'Mar 2026',
    tech: 'React, Python, FastAPI, Gemini API, Google Cloud',
    description:
      'An accessibility app that uses the Gemini Live API to guide children and those with disabilities through day-to-day tasks.',
    image: shoelaceImg,
    imageFilter: 'contrast(1.5) saturate(1.4) brightness(1.0) hue-rotate(10deg)',
    link: 'https://github.com/mcrowley19/shoelace',
  },
  {
    name: 'Metricare',
    date: 'Feb 2026',
    tech: 'React, TypeScript, Python, FastAPI, Gemini API, Vercel',
    description:
      'An AI medical dashboard designed to summarise patient data for clinicians.',
    image: metricareImg,
    imageFilter: 'saturate(0.75) contrast(0.85) brightness(1.05) sepia(0.2)',
    link: 'https://metricare.vercel.app/',
  },
  {
    name: 'Kangrat',
    date: 'Feb 2026',
    tech: 'React, TypeScript, Firebase, Algolia',
    description:
      'A professional networking platform with profiles, messaging, job discovery, and a gamified XP levelling system.',
    image: kangratImg,
    imageFilter: 'sepia(0.4) contrast(0.9) brightness(1.05)',
    link: 'https://www.kangrat.com/discover',
  },
  {
    name: 'micrograd-java',
    date: 'Jan 2026',
    tech: 'Java, Maven',
    description:
      "A Java remake of Andrej Karpathy's micrograd engine. A tiny scalar-valued autograd engine and a neural net library on top of it.",
    image: micrograJavaImg,
    imageFilter: 'sepia(0.35) contrast(0.85) brightness(1.08)',
    link: 'https://github.com/mcrowley19/micrograd-java',
  },
  {
    name: 'Snap and Swing',
    date: 'Dec 2025',
    tech: 'TypeScript, Snap Lens Studio',
    description:
      'A swinging Snapchat AR game. Winner of 2nd place in the 2D category at the Snap Lensathon.',
    image: snapswingImg,
    imageFilter: 'saturate(0.7) contrast(0.85) brightness(1.05) sepia(0.2)',
    link: 'https://devpost.com/software/snap-and-swing',
  },
  {
    name: 'LinearOps',
    date: 'Nov 2025',
    tech: 'Python',
    description:
      'A Python library for linear algebra operations that supports matrix and vector computations.',
    image: linearOpsImg,
    imageFilter: 'saturate(0.6) contrast(0.8) brightness(1.1) sepia(0.15)',
    link: 'https://github.com/mcrowley19/LinearOps',
  },
  {
    name: 'learnquotes.com',
    date: 'Jul 2025',
    tech: 'React, TypeScript, AWS',
    description:
      'A website for Leaving Cert students to revise Shakespeare quotes.',
    image: learnquotesImg,
    imageFilter: 'saturate(0.55) contrast(0.8) brightness(1.1) sepia(0.2)',
    link: 'https://learnquotes.com',
    imageObjectPosition: 'top left',
  },
  {
    name: 'Temperature and humidity tracker',
    date: 'March 2025',
    tech: 'Cloudflare, Flask, DHT22 Sensors, Raspberry Pi',
    description:
      'A website built for tracking temperature and humidity levels across the house.',
    image: tempHumidityImg,
    imageFilter: 'saturate(0.6) contrast(0.85) brightness(1.05) sepia(0.25)',
  },
]

const RULE = '1px solid rgba(26, 26, 26, 0.12)'

function ProjectImage({ src, filter = 'grayscale(1)', objectFit = 'cover', objectPosition = 'center' }: { src?: string; filter?: string; objectFit?: 'cover' | 'contain'; objectPosition?: string }) {
  const [failed, setFailed] = useState(false)
  const showPlaceholder = !src || failed
  if (showPlaceholder) {
    return (
      <div
        aria-hidden
        style={{
          width: '140px',
          height: '90px',
          backgroundColor: '#8A8682',
          flex: '0 0 140px',
        }}
      />
    )
  }
  return (
    <img
      src={src}
      alt=""
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      style={{
        width: '140px',
        height: '90px',
        objectFit,
        objectPosition,
        filter,
        flex: '0 0 140px',
        display: 'block',
      }}
    />
  )
}

export function ProjectsPage() {
  return (
    <main
      className="w-full pb-24"
      style={{ paddingLeft: '12vw', paddingRight: '1.5rem', paddingTop: '8vh' }}
    >
      <div style={{ maxWidth: '580px' }}>
        <h1
          className="font-display text-ink-primary"
          style={{ fontSize: '1.5rem', fontWeight: 300, lineHeight: 1.2 }}
        >
          Projects
        </h1>

        <ol
          style={{
            listStyle: 'none',
            margin: 0,
            padding: 0,
            marginTop: '3rem',
            borderTop: RULE,
          }}
        >
          {rows.map((p) => (
            <li
              key={p.name}
              style={{
                paddingTop: '1.8rem',
                paddingBottom: '1.8rem',
                borderBottom: RULE,
              }}
            >
              <div
                className="project-row"
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1.25rem',
                }}
              >
                <ProjectImage src={p.image} filter={p.imageFilter} objectFit={p.imageObjectFit} objectPosition={p.imageObjectPosition} />
                <div style={{ flex: '1 1 auto', minWidth: 0 }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      gap: '1rem',
                      width: '100%',
                    }}
                  >
                    <span
                      className="font-display text-ink-primary"
                      style={{ fontSize: '1.05rem', fontWeight: 400, lineHeight: 1.3 }}
                    >
                      {p.name}
                    </span>
                    <span
                      className="font-mono"
                      style={{
                        fontSize: '0.72rem',
                        color: 'rgba(26, 26, 26, 0.55)',
                        marginLeft: 'auto',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {p.date}
                    </span>
                  </div>
                  <p
                    className="font-display"
                    style={{
                      fontSize: '0.88rem',
                      lineHeight: 1.5,
                      color: 'rgba(26, 26, 26, 0.7)',
                      margin: '0.6rem 0 0.55rem 0',
                    }}
                  >
                    {p.description}
                  </p>
                  <div
                    className="font-mono"
                    style={{
                      fontSize: '0.7rem',
                      color: 'rgba(26, 26, 26, 0.5)',
                      letterSpacing: '0.02em',
                    }}
                  >
                    {p.tech}
                  </div>
                  {p.link && (
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono"
                      style={{
                        display: 'inline-block',
                        marginTop: '0.45rem',
                        fontSize: '0.7rem',
                        color: 'rgba(26, 26, 26, 0.5)',
                        textDecoration: 'underline',
                        textDecorationColor: 'rgba(26, 26, 26, 0.25)',
                        textUnderlineOffset: '3px',
                        letterSpacing: '0.02em',
                      }}
                    >
                      {p.link.replace(/^https?:\/\//, '')}
                    </a>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .project-row {
            flex-direction: column;
          }
          .project-row > div:last-child {
            width: 100%;
          }
        }
      `}</style>
    </main>
  )
}
