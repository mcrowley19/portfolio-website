// Per-route image URLs for background prefetching. Importing with ?url
// emits the hashed asset path at build time without pulling the binary
// into the JS bundle. Vite dedupes against the same imports used by the
// pages themselves, so adding entries here doesn't bloat the build.

import lockupImg from '../assets/projects/lockup.webp?url'
import sol450Img from '../assets/projects/sol-450.webp?url'
import shoelaceImg from '../assets/projects/shoelace(1).webp?url'
import metricareImg from '../assets/projects/metricare.webp?url'
import kangratImg from '../assets/projects/kangrat.webp?url'
import micrograJavaImg from '../assets/projects/micrograd-java.webp?url'
import snapswingImg from '../assets/projects/snapswing.webp?url'
import linearOpsImg from '../assets/projects/linear-ops.webp?url'
import learnquotesImg from '../assets/projects/learnquotes.webp?url'
import tempHumidityImg from '../assets/projects/temp&h.webp?url'

export const projectsRouteImages: readonly string[] = [
  lockupImg,
  sol450Img,
  shoelaceImg,
  metricareImg,
  kangratImg,
  micrograJavaImg,
  snapswingImg,
  linearOpsImg,
  learnquotesImg,
  tempHumidityImg,
]

export const routeImages: Record<string, readonly string[]> = {
  '/projects': projectsRouteImages,
  '/reading': [],
  '/': [],
}
