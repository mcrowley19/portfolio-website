import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import trinityImage from '../assets/trinity.jpg'

const ARCHIVAL_IMAGE = trinityImage

const SESSION_KEY = 'hasVisited'

const HOLD_MS = 1500
const WIPE_MS = 1800
const NAME_OFFSET_MS = HOLD_MS + WIPE_MS / 2 // 2400ms after image-ready

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
  /** True once the orchestrated reveal should begin. */
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

type Phase = 'loading-image' | 'holding' | 'wiping' | 'done'

export function EntranceProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<EntranceMode>(readInitialMode)
  const [phase, setPhase] = useState<Phase>(
    mode === 'first-visit' ? 'loading-image' : 'done',
  )

  // Mark visited immediately so a refresh skips the intro on subsequent loads.
  useEffect(() => {
    if (mode !== 'first-visit') return
    try {
      window.sessionStorage.setItem(SESSION_KEY, 'true')
    } catch {
      /* ignore */
    }
  }, [mode])

  // Preload the archival image. Once ready, kick off the hold → wipe schedule.
  useEffect(() => {
    if (mode !== 'first-visit') return
    let cancelled = false
    const img = new Image()
    img.onload = () => {
      if (cancelled) return
      setPhase('holding')
      const holdTimer = setTimeout(() => {
        if (cancelled) return
        setPhase('wiping')
        const wipeTimer = setTimeout(() => {
          if (cancelled) return
          setPhase('done')
        }, WIPE_MS)
        ;(img as unknown as { _wipeTimer?: ReturnType<typeof setTimeout> })._wipeTimer = wipeTimer
      }, HOLD_MS)
      ;(img as unknown as { _holdTimer?: ReturnType<typeof setTimeout> })._holdTimer = holdTimer
    }
    img.onerror = () => {
      if (cancelled) return
      setMode('returning')
      setPhase('done')
    }
    img.src = ARCHIVAL_IMAGE
    return () => {
      cancelled = true
      img.onload = null
      img.onerror = null
      const ref = img as unknown as {
        _holdTimer?: ReturnType<typeof setTimeout>
        _wipeTimer?: ReturnType<typeof setTimeout>
      }
      if (ref._holdTimer) clearTimeout(ref._holdTimer)
      if (ref._wipeTimer) clearTimeout(ref._wipeTimer)
    }
  }, [mode])

  // Reveal begins once the image has loaded (i.e. we have left 'loading-image').
  const revealStarted = mode === 'returning' || phase !== 'loading-image'

  const value = useMemo<EntranceContextValue>(
    () => ({ mode, revealStarted, delays: ENTRANCE_DELAYS_S }),
    [mode, revealStarted],
  )

  const showOverlay = mode === 'first-visit' && phase !== 'done'

  return (
    <EntranceContext.Provider value={value}>
      {children}
      {showOverlay ? <ArchivalOverlay wiping={phase === 'wiping'} /> : null}
    </EntranceContext.Provider>
  )
}

function ArchivalOverlay({ wiping }: { wiping: boolean }) {
  return (
    <motion.div
      initial={{ y: '0%' }}
      animate={{ y: wiping ? '-100%' : '0%' }}
      transition={{
        duration: WIPE_MS / 1000,
        ease: [0.76, 0, 0.24, 1],
      }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        pointerEvents: 'none',
        backgroundColor: '#F4EFE6',
      }}
    >
      <img
        src={ARCHIVAL_IMAGE}
        alt=""
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          filter: 'grayscale(100%) contrast(1.3) brightness(0.85)',
          display: 'block',
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at center, rgba(0,0,0,0) 40%, rgba(0,0,0,0.3) 100%)',
        }}
      />
    </motion.div>
  )
}
