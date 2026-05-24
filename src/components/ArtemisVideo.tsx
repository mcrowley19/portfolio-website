import { useEffect, useRef, useState } from 'react'
import artemisVideo from '../assets/artemis.mp4'

type ArtemisVideoProps = {
  width?: number | string
  maxHeight?: number | string
}

function useRevealStarted() {
  const [ready, setReady] = useState(() => {
    if (typeof document === 'undefined') return false
    return document.body.classList.contains('entrance-done')
  })
  useEffect(() => {
    if (ready) return
    const handler = () => setReady(true)
    window.addEventListener('entrance:done', handler, { once: true })
    const fallback = setTimeout(() => setReady(true), 5000)
    return () => {
      window.removeEventListener('entrance:done', handler)
      clearTimeout(fallback)
    }
  }, [ready])
  return ready
}

export function ArtemisVideo({ width, maxHeight }: ArtemisVideoProps = {}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const revealStarted = useRevealStarted()

  useEffect(() => {
    // Hold playback until the entrance overlay has finished — otherwise the
    // observer fires while the loading images are still on screen and the
    // clip plays out (and ends, loop={false}) behind the overlay.
    if (!revealStarted) return
    const video = videoRef.current
    if (!video) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            void video.play().catch(() => {})
            observer.disconnect()
            return
          }
        }
      },
      { threshold: 0.5 },
    )

    observer.observe(video)
    return () => observer.disconnect()
  }, [revealStarted])

  if (maxHeight !== undefined) {
    return (
      <div
        aria-hidden
        className="pointer-events-none relative overflow-hidden"
        style={{ width, height: maxHeight }}
      >
        <video
          ref={videoRef}
          src={artemisVideo}
          muted
          playsInline
          loop={false}
          preload="metadata"
          className="block h-full w-full"
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
      </div>
    )
  }

  if (width !== undefined) {
    // Native aspect ratio, no cropping. Caps at the requested width but
    // shrinks to fit narrower viewports so mobile doesn't horizontally scroll.
    return (
      <div
        aria-hidden
        className="pointer-events-none relative overflow-hidden"
        style={{ width: '100%', maxWidth: width }}
      >
        <video
          ref={videoRef}
          src={artemisVideo}
          muted
          playsInline
          loop={false}
          preload="metadata"
          className="block w-full"
        />
      </div>
    )
  }

  return (
    <div
      aria-hidden
      className="pointer-events-none relative w-[110px] overflow-hidden md:w-[170px]"
    >
      <video
        ref={videoRef}
        src={artemisVideo}
        muted
        playsInline
        loop={false}
        preload="auto"
        className="block w-full"
      />
    </div>
  )
}
