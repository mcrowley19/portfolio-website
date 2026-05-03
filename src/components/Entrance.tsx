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

const SESSION_KEY = 'hasVisited'

// Flicker timing: each image holds for ~600ms. Frames are stacked in the DOM
// (all preloaded, opacity-toggled) so swaps are GPU-cheap and don't repaint
// a single <img> tag — that's what was causing the jarring stutter before.
// A short blank between frames keeps the "cut" feel without a hard repaint.
const HOLD_MS = 1100
// Crossfade between frames. Both layers are stacked and only opacity
// transitions, so the swap is GPU-cheap. ~280ms feels deliberate without
// drifting into slideshow territory.
const CROSSFADE_MS = 280
// Disintegration: blur 0→12px, opacity 1→0, scale 1→1.02. The image stays
// anchored — only filter and a tiny scale change run. 1200ms with a soft
// cubic-out feels like dispersal without dragging.
const DISINTEGRATE_MS = 1200
const DISINTEGRATE_EASE = 'cubic-bezier(0.4, 0, 0.2, 1)'

const FLICKER_FRAMES = [
  { src: trinityImage, filter: 'grayscale(100%) contrast(1.3) brightness(0.85)' },
  // Deep Blue retains its original colour treatment — no filter applied.
  { src: deepBlueImage, filter: 'none' },
  {
    src: hamiltonImage,
    filter:
      'grayscale(1) contrast(1.75) brightness(1.1) sepia(0.15)',
  },
] as const

// Frames overlap during the crossfade rather than being separated by a blank.
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
  const [mode, setMode] = useState<EntranceMode>(readInitialMode)
  const [phase, setPhase] = useState<Phase>(mode === 'first-visit' ? 'loading' : 'done')
  // -1 = blank (between cuts), 0..N = which preloaded frame is on top.
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (mode !== 'first-visit') return
    try {
      window.sessionStorage.setItem(SESSION_KEY, 'true')
    } catch {
      /* ignore */
    }
  }, [mode])

  // Preload every flicker frame so all <img> elements have decoded pixels
  // before they're shown. Once preloaded, kick off the flicker.
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

  // Run the flicker sequence. Schedule everything up front so the effect
  // doesn't depend on state it changes (which previously caused re-runs that
  // cleared the disintegrate→done timer and left the overlay mounted forever).
  useEffect(() => {
    if (phase !== 'flicker') return
    const timers: ReturnType<typeof setTimeout>[] = []
    setActiveIndex(0)

    // After the first hold, advance to each next frame. The image layer
    // crossfades via its own CSS transition (CROSSFADE_MS), so we don't
    // insert a blank — the previous frame fades out as the next fades in.
    let elapsed = HOLD_MS
    for (let i = 1; i < FLICKER_FRAMES.length; i++) {
      const idx = i
      timers.push(setTimeout(() => setActiveIndex(idx), elapsed))
      elapsed += CROSSFADE_MS + HOLD_MS
    }
    timers.push(setTimeout(() => setPhase('disintegrate'), elapsed))
    return () => timers.forEach(clearTimeout)
    // Intentionally empty deps after the phase guard — we only want this to
    // run once when entering 'flicker'.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase])

  // Separate effect so the disintegrate→done timer is owned by the
  // disintegrate phase and isn't torn down when the flicker effect cleans up.
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
        />
      ) : null}
    </EntranceContext.Provider>
  )
}

function ArchivalOverlay({
  activeIndex,
  disintegrating,
}: {
  activeIndex: number
  disintegrating: boolean
}) {
  // All frames stacked. Only opacity toggles between them — no <img> src
  // swap, no layout work, no repaint of a single shared element. The whole
  // stack disintegrates together when `disintegrating` flips.
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        pointerEvents: 'none',
        backgroundColor: '#F4EFE6',
        overflow: 'hidden',
        opacity: disintegrating ? 0 : 1,
        transform: disintegrating ? 'scale(1.02)' : 'scale(1)',
        transition: disintegrating
          ? `opacity ${DISINTEGRATE_MS}ms ${DISINTEGRATE_EASE}, transform ${DISINTEGRATE_MS}ms ${DISINTEGRATE_EASE}, filter ${DISINTEGRATE_MS}ms ${DISINTEGRATE_EASE}`
          : 'none',
        filter: disintegrating ? 'blur(12px)' : 'blur(0px)',
        willChange: 'opacity, transform, filter',
      }}
    >
      {FLICKER_FRAMES.map((frame, i) => (
        <img
          key={i}
          src={frame.src}
          alt=""
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            display: 'block',
            opacity: i === activeIndex ? 1 : 0,
            filter: frame.filter === 'none' ? undefined : frame.filter,
            transition: `opacity ${CROSSFADE_MS}ms ease-in-out`,
          }}
        />
      ))}
    </div>
  )
}
