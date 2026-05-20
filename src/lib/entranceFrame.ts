import trinityUrl from '../assets/trinity.webp?url'
import deepBlueUrl from '../assets/deepblue.webp?url'
import hamiltonUrl from '../assets/hamilton.webp?url'

export type EntranceFrame = {
  src: string
  filter: string
  from: string
  to: string
}

const FRAMES: readonly EntranceFrame[] = [
  {
    src: trinityUrl,
    filter: 'grayscale(100%) contrast(1.3) brightness(0.85)',
    from: 'scale(1.08) translate3d(-1.5%, 1%, 0)',
    to: 'scale(1.18) translate3d(2%, -1.5%, 0)',
  },
  {
    src: deepBlueUrl,
    filter: 'none',
    from: 'scale(1.10) translate3d(2%, -1%, 0)',
    to: 'scale(1.20) translate3d(-2%, 1.5%, 0)',
  },
  {
    src: hamiltonUrl,
    filter: 'grayscale(1) contrast(1.75) brightness(1.1) sepia(0.15)',
    from: 'scale(1.08) translate3d(0%, 1.5%, 0)',
    to: 'scale(1.20) translate3d(-1.5%, -1.5%, 0)',
  },
] as const

// Picked once at module load so main.tsx and Entrance.tsx agree on which
// frame to preload and render. Re-picks on full page reload.
export const entranceFrame: EntranceFrame =
  FRAMES[Math.floor(Math.random() * FRAMES.length)]
