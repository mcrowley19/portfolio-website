import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import trinityImage from '../assets/trinity.jpg'
import deepBlueImage from '../assets/deepblue.jpg'
// Hamilton plaque: Wikimedia Commons, "Inscription on Broom Bridge ...
// Quaternions multiplication by Sir William Rowan Hamilton" (3803x2487).
// A direct photograph rather than a line drawing: it sits adjacent to the
// Trinity engraving once colour-graded (grayscale + raised contrast), and
// keeps the documentary register the entrance is built around. Lower-res
// alternatives on Commons washed out at the entrance scale.
import hamiltonImage from '../assets/hamilton.jpg'
import { usePrefersReducedMotion } from '../lib/useReducedMotion'

const SESSION_KEY = 'hasVisited'

const HOLD_MS = 1500
const CROSSFADE_MS = 320
// Quick white-flash + chromatic kick at the cut between frames. Sits inside
// the crossfade window so the next frame "snaps" into existence.
const FLASH_MS = 220
const DISINTEGRATE_MS = 1300
const DISINTEGRATE_EASE = 'cubic-bezier(0.22, 1, 0.36, 1)'

type Frame = {
  src: string
  filter: string
  // Ken Burns start/end transforms. The image holds at `from` for ~80ms,
  // then runs to `to` over the remaining hold + crossfade duration.
  from: string
  to: string
  caption: string
  year: string
}

const FLICKER_FRAMES: readonly Frame[] = [
  {
    src: trinityImage,
    filter: 'grayscale(100%) contrast(1.3) brightness(0.85)',
    from: 'scale(1.08) translate3d(-1.5%, 1%, 0)',
    to: 'scale(1.18) translate3d(2%, -1.5%, 0)',
    caption: 'Trinity College · Dublin',
    year: '1592',
  },
  {
    src: deepBlueImage,
    filter: 'none',
    from: 'scale(1.10) translate3d(2%, -1%, 0)',
    to: 'scale(1.20) translate3d(-2%, 1.5%, 0)',
    caption: 'Deep Blue vs Kasparov',
    year: '1997',
  },
  {
    src: hamiltonImage,
    filter: 'grayscale(1) contrast(1.75) brightness(1.1) sepia(0.15)',
    from: 'scale(1.08) translate3d(0%, 1.5%, 0)',
    to: 'scale(1.20) translate3d(-1.5%, -1.5%, 0)',
    caption: 'Broom Bridge · Dublin',
    year: '1843',
  },
] as const

const FLICKER_TOTAL_MS =
  FLICKER_FRAMES.length * HOLD_MS + (FLICKER_FRAMES.length - 1) * CROSSFADE_MS

const NAME_OFFSET_MS = FLICKER_TOTAL_MS + DISINTEGRATE_MS / 2

const ENTRANCE_DELAYS_S = {
  name: NAME_OFFSET_MS / 1000,
  bio1: (NAME_OFFSET_MS + 100) / 1000,
  bio2: (NAME_OFFSET_MS + 200) / 1000,
  bio3: (NAME_OFFSET_MS + 300) / 1000,
  about1: (NAME_OFFSET_MS + 450) / 1000,
  about2: (NAME_OFFSET_MS + 550) / 1000,
}

type EntranceMode = 'first-visit' | 'returning'

type EntranceContextValue = {
  mode: EntranceMode
  revealStarted: boolean
  delays: typeof ENTRANCE_DELAYS_S
}

const EntranceContext = createContext<EntranceContextValue>({
  mode: 'returning',
  revealStarted: true,
  delays: ENTRANCE_DELAYS_S,
})

export function useEntrance() {
  return useContext(EntranceContext)
}

function readInitialMode(): EntranceMode {
  if (typeof window === 'undefined') return 'returning'
  try {
    return window.sessionStorage.getItem(SESSION_KEY) ? 'returning' : 'first-visit'
  } catch {
    return 'returning'
  }
}

type Phase = 'loading' | 'flicker' | 'disintegrate' | 'done'

export function EntranceProvider({ children }: { children: ReactNode }) {
  const reducedMotion = usePrefersReducedMotion()
  const [mode, setMode] = useState<EntranceMode>(readInitialMode)
  const [phase, setPhase] = useState<Phase>(mode === 'first-visit' ? 'loading' : 'done')
  const [activeIndex, setActiveIndex] = useState(0)
  const [flashing, setFlashing] = useState(false)

  useEffect(() => {
    if (mode !== 'first-visit') return
    try {
      window.sessionStorage.setItem(SESSION_KEY, 'true')
    } catch {
      /* ignore */
    }
  }, [mode])

  useEffect(() => {
    if (mode !== 'first-visit') return
    let cancelled = false
    const sources = FLICKER_FRAMES.map((f) => f.src)
    let loaded = 0
    let errored = false
    const imgs = sources.map((src) => {
      const img = new Image()
      img.onload = () => {
        if (cancelled || errored) return
        loaded += 1
        if (loaded === sources.length) setPhase('flicker')
      }
      img.onerror = () => {
        if (cancelled) return
        errored = true
        setMode('returning')
        setPhase('done')
      }
      img.src = src
      return img
    })
    return () => {
      cancelled = true
      imgs.forEach((img) => {
        img.onload = null
        img.onerror = null
      })
    }
  }, [mode])

  useEffect(() => {
    if (phase !== 'flicker') return
    const timers: ReturnType<typeof setTimeout>[] = []
    setActiveIndex(0)

    let elapsed = HOLD_MS
    for (let i = 1; i < FLICKER_FRAMES.length; i++) {
      const idx = i
      // Trigger the flash a hair before the active index changes so the white
      // hit lands on the cut, not after it.
      const flashAt = elapsed - FLASH_MS / 2
      timers.push(
        setTimeout(() => {
          setFlashing(true)
          setTimeout(() => setFlashing(false), FLASH_MS)
        }, Math.max(0, flashAt)),
      )
      timers.push(setTimeout(() => setActiveIndex(idx), elapsed))
      elapsed += CROSSFADE_MS + HOLD_MS
    }
    timers.push(setTimeout(() => setPhase('disintegrate'), elapsed))
    return () => timers.forEach(clearTimeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase])

  useEffect(() => {
    if (phase !== 'disintegrate') return
    const t = setTimeout(() => setPhase('done'), DISINTEGRATE_MS)
    return () => clearTimeout(t)
  }, [phase])

  const revealStarted =
    mode === 'returning' || phase === 'disintegrate' || phase === 'done'

  const value = useMemo<EntranceContextValue>(
    () => ({ mode, revealStarted, delays: ENTRANCE_DELAYS_S }),
    [mode, revealStarted],
  )

  const showOverlay = mode === 'first-visit' && phase !== 'done'

  return (
    <EntranceContext.Provider value={value}>
      {children}
      {showOverlay ? (
        <ArchivalOverlay
          activeIndex={activeIndex}
          disintegrating={phase === 'disintegrate'}
          flashing={flashing}
          reducedMotion={reducedMotion}
        />
      ) : null}
    </EntranceContext.Provider>
  )
}

const FRAME_HOLD_TOTAL_MS = HOLD_MS + CROSSFADE_MS

function ArchivalOverlay({
  activeIndex,
  disintegrating,
  flashing,
  reducedMotion,
}: {
  activeIndex: number
  disintegrating: boolean
  flashing: boolean
  reducedMotion: boolean
}) {
  const frame = FLICKER_FRAMES[activeIndex]
  const counter = `${String(activeIndex + 1).padStart(2, '0')} / ${String(
    FLICKER_FRAMES.length,
  ).padStart(2, '0')}`

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        pointerEvents: 'none',
        backgroundColor: '#0E0C09',
        overflow: 'hidden',
        opacity: disintegrating ? 0 : 1,
        transform: disintegrating ? 'scale(1.04)' : 'scale(1)',
        transition: disintegrating
          ? `opacity ${DISINTEGRATE_MS}ms ${DISINTEGRATE_EASE}, transform ${DISINTEGRATE_MS}ms ${DISINTEGRATE_EASE}, filter ${DISINTEGRATE_MS}ms ${DISINTEGRATE_EASE}`
          : 'none',
        filter: disintegrating ? 'blur(14px)' : 'blur(0px)',
        willChange: 'opacity, transform, filter',
      }}
    >
      <style>{`
        @keyframes entrance-kenburns-0 {
          from { transform: ${FLICKER_FRAMES[0].from}; }
          to { transform: ${FLICKER_FRAMES[0].to}; }
        }
        @keyframes entrance-kenburns-1 {
          from { transform: ${FLICKER_FRAMES[1].from}; }
          to { transform: ${FLICKER_FRAMES[1].to}; }
        }
        @keyframes entrance-kenburns-2 {
          from { transform: ${FLICKER_FRAMES[2].from}; }
          to { transform: ${FLICKER_FRAMES[2].to}; }
        }
        @keyframes entrance-grain {
          0%   { transform: translate3d(0, 0, 0); }
          20%  { transform: translate3d(-3%, 2%, 0); }
          40%  { transform: translate3d(2%, -3%, 0); }
          60%  { transform: translate3d(-2%, -1%, 0); }
          80%  { transform: translate3d(3%, 2%, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        @keyframes entrance-caption-in {
          from { opacity: 0; transform: translateY(8px); letter-spacing: 0.4em; }
          to   { opacity: 1; transform: translateY(0);   letter-spacing: 0.18em; }
        }
        @keyframes entrance-year-in {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes entrance-rule {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
      `}</style>

      {FLICKER_FRAMES.map((f, i) => {
        const isActive = i === activeIndex
        const kenBurnsDuration = FRAME_HOLD_TOTAL_MS + 200
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              inset: 0,
              opacity: isActive ? 1 : 0,
              transition: `opacity ${CROSSFADE_MS}ms ease-in-out`,
              willChange: 'opacity',
            }}
          >
            <img
              src={f.src}
              alt=""
              aria-hidden="true"
              fetchPriority={isActive ? 'high' : 'low'}
              decoding="async"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                display: 'block',
                filter: f.filter === 'none' ? undefined : f.filter,
                transform: reducedMotion ? 'scale(1.05)' : f.from,
                animation:
                  isActive && !reducedMotion
                    ? `entrance-kenburns-${i} ${kenBurnsDuration}ms cubic-bezier(0.22, 1, 0.36, 1) forwards`
                    : 'none',
                willChange: 'transform',
              }}
            />
          </div>
        )
      })}

      {/* Vignette + soft scanline overlay */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background:
            'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.55) 100%)',
          mixBlendMode: 'multiply',
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          backgroundImage:
            'repeating-linear-gradient(to bottom, rgba(0,0,0,0.18) 0px, rgba(0,0,0,0.18) 1px, transparent 1px, transparent 3px)',
          mixBlendMode: 'overlay',
          opacity: 0.35,
        }}
      />

      {/* Film grain — SVG noise tiled across the screen, gently drifting */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: '-10%',
          pointerEvents: 'none',
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.65 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          backgroundSize: '240px 240px',
          opacity: 0.22,
          mixBlendMode: 'overlay',
          animation: reducedMotion ? 'none' : 'entrance-grain 1.4s steps(6) infinite',
        }}
      />

      {/* Top frame counter + timestamp */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 'clamp(0.875rem, 3vw, 1.75rem)',
          left: 'clamp(0.875rem, 3vw, 1.75rem)',
          right: 'clamp(0.875rem, 3vw, 1.75rem)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          color: 'rgba(244, 239, 230, 0.75)',
          fontFamily: 'var(--font-mono)',
          fontSize: 'clamp(0.625rem, 1.6vw, 0.75rem)',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          textShadow: '0 1px 2px rgba(0,0,0,0.6)',
        }}
      >
        <span>REC · ARCHIVE</span>
        <span>{counter}</span>
      </div>

      {/* Caption — location + year, reanimates per frame via key */}
      <div
        key={`caption-${activeIndex}`}
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: 'clamp(0.875rem, 4vw, 2.25rem)',
          right: 'clamp(0.875rem, 4vw, 2.25rem)',
          bottom: 'clamp(1.25rem, 5vw, 2.5rem)',
          color: '#F4EFE6',
          textShadow: '0 1px 4px rgba(0,0,0,0.7)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.55rem',
          maxWidth: '32rem',
        }}
      >
        <div
          style={{
            height: '1px',
            background: 'rgba(244, 239, 230, 0.7)',
            transformOrigin: 'left',
            animation: reducedMotion
              ? 'none'
              : `entrance-rule 700ms cubic-bezier(0.22, 1, 0.36, 1) 120ms both`,
          }}
        />
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            gap: '1rem',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(0.875rem, 2.6vw, 1.1rem)',
              fontWeight: 400,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              animation: reducedMotion
                ? 'none'
                : 'entrance-caption-in 800ms cubic-bezier(0.22, 1, 0.36, 1) 200ms both',
            }}
          >
            {frame.caption}
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(0.75rem, 2vw, 0.9375rem)',
              letterSpacing: '0.1em',
              color: 'rgba(244, 239, 230, 0.85)',
              animation: reducedMotion
                ? 'none'
                : 'entrance-year-in 600ms cubic-bezier(0.22, 1, 0.36, 1) 380ms both',
              whiteSpace: 'nowrap',
            }}
          >
            EST. {frame.year}
          </span>
        </div>
      </div>

      {/* Flash hit at cuts — quick white burst riding inside the crossfade */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          backgroundColor: '#F4EFE6',
          opacity: flashing && !reducedMotion ? 0.55 : 0,
          transition: `opacity ${FLASH_MS}ms ease-out`,
          mixBlendMode: 'screen',
        }}
      />
    </div>
  )
}
