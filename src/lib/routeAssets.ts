// Per-route image URLs for background prefetching. Importing with ?url
// emits the hashed asset path at build time without pulling the binary
// into the JS bundle. Vite dedupes against the same imports used by the
// pages themselves, so adding entries here doesn't bloat the build.

import lockupImg from '../assets/projects/lockup.png?url'
import sol450Img from '../assets/projects/sol-450.png?url'
import shoelaceImg from '../assets/projects/shoelace(1).png?url'
import metricareImg from '../assets/projects/metricare.png?url'
import kangratImg from '../assets/projects/kangrat.png?url'
import micrograJavaImg from '../assets/projects/micrograd-java.png?url'
import snapswingImg from '../assets/projects/snapswing.png?url'
import linearOpsImg from '../assets/projects/linear-ops.png?url'
import learnquotesImg from '../assets/projects/learnquotes.png?url'
import tempHumidityImg from '../assets/projects/temp&h.jpg?url'

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
