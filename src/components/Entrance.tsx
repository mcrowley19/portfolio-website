import { useEffect, useState } from 'react'
import { entranceFrame } from '../lib/entranceFrame'
import { usePrefersReducedMotion } from '../lib/useReducedMotion'

const SESSION_KEY = 'hasVisited'

const HOLD_MS = 1800
const DISINTEGRATE_MS = 1300
const DISINTEGRATE_EASE = 'cubic-bezier(0.22, 1, 0.36, 1)'
const KEN_BURNS_DURATION_MS = HOLD_MS + 200

type EntranceMode = 'first-visit' | 'returning'

type Phase = 'loading' | 'hold' | 'disintegrate' | 'done'

function signalDone() {
  document.body.classList.add('entrance-done')
  window.dispatchEvent(new CustomEvent('entrance:done'))
}

function readInitialMode(): EntranceMode {
  if (typeof window === 'undefined') return 'returning'
  try {
    return window.sessionStorage.getItem(SESSION_KEY) ? 'returning' : 'first-visit'
  } catch {
    return 'returning'
  }
}

export function Entrance() {
  const reducedMotion = usePrefersReducedMotion()
  const [mode, setMode] = useState<EntranceMode>(readInitialMode)
  const [phase, setPhase] = useState<Phase>(mode === 'first-visit' ? 'loading' : 'done')

  // For returning visitors: signal immediately
  useEffect(() => {
    if (mode === 'returning') {
      signalDone()
    }
  }, [mode])

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
    const img = new Image()
    img.onload = () => {
      if (cancelled) return
      setPhase('hold')
    }
    img.onerror = () => {
      if (cancelled) return
      setMode('returning')
      setPhase('done')
    }
    img.src = entranceFrame.src
    return () => {
      cancelled = true
      img.onload = null
      img.onerror = null
    }
  }, [mode])

  useEffect(() => {
    if (phase !== 'hold') return
    const t = setTimeout(() => setPhase('disintegrate'), HOLD_MS)
    return () => clearTimeout(t)
  }, [phase])

  useEffect(() => {
    if (phase !== 'disintegrate') return
    const t = setTimeout(() => {
      setPhase('done')
      signalDone()
    }, DISINTEGRATE_MS)
    return () => clearTimeout(t)
  }, [phase])

  const showOverlay = mode === 'first-visit' && phase !== 'done'

  if (!showOverlay) return null

  return (
    <ArchivalOverlay
      disintegrating={phase === 'disintegrate'}
      reducedMotion={reducedMotion}
    />
  )
}

function ArchivalOverlay({
  disintegrating,
  reducedMotion,
}: {
  disintegrating: boolean
  reducedMotion: boolean
}) {
  return (
    <div
      className="entrance-overlay"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100dvh',
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
        @keyframes entrance-kenburns {
          from { transform: ${entranceFrame.from}; }
          to   { transform: ${entranceFrame.to}; }
        }
        @keyframes entrance-grain {
          0%   { transform: translate3d(0, 0, 0); }
          20%  { transform: translate3d(-3%, 2%, 0); }
          40%  { transform: translate3d(2%, -3%, 0); }
          60%  { transform: translate3d(-2%, -1%, 0); }
          80%  { transform: translate3d(3%, 2%, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        @media (max-width: 768px) {
          .entrance-frame-img {
            object-position: center top;
            object-fit: cover;
            width: 100vw !important;
            height: 100dvh !important;
          }
        }
      `}</style>

      <img
        src={entranceFrame.src}
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        decoding="async"
        className="entrance-frame-img"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          display: 'block',
          filter: entranceFrame.filter === 'none' ? undefined : entranceFrame.filter,
          transform: reducedMotion ? 'scale(1.05)' : entranceFrame.from,
          animation: reducedMotion
            ? 'none'
            : `entrance-kenburns ${KEN_BURNS_DURATION_MS}ms cubic-bezier(0.22, 1, 0.36, 1) forwards`,
          willChange: 'transform',
        }}
      />

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

      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: 'calc(1.5rem + env(safe-area-inset-bottom, 0px))',
          left: '1.5rem',
          right: '1.5rem',
          pointerEvents: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '0.625rem',
        }}
      >
        <div
          style={{
            flex: '0 0 20px',
            height: '1px',
            backgroundColor: 'rgba(255, 255, 255, 0.45)',
          }}
        />
        <span
          style={{
            fontFamily: 'JetBrains Mono, ui-monospace, monospace',
            fontSize: '0.6rem',
            letterSpacing: '0.14em',
            color: 'rgba(255, 255, 255, 0.55)',
            textTransform: 'uppercase',
            lineHeight: 1,
          }}
        >
          {entranceFrame.caption}
        </span>
      </div>
    </div>
  )
}
