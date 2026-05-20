import { NavLink } from 'react-router-dom'
import { prefetchImages } from '../lib/prefetch'
import { routeImages } from '../lib/routeAssets'

const links = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Projects' },
  { to: '/reading', label: 'Reading' },
]

// Warm the lazy chunk for each route on first user intent. Vite hashes
// these dynamic imports into their own chunks; running the import now
// fetches the chunk and parses it so the route swap is instant when the
// click lands.
const chunkLoaders: Record<string, () => Promise<unknown>> = {
  '/projects': () => import('../pages/ProjectsPage'),
  '/reading': () => import('../pages/ReadingPage'),
}

const warmedChunks = new Set<string>()

function warmRoute(to: string) {
  const imgs = routeImages[to]
  if (imgs && imgs.length) prefetchImages(imgs)
  if (!warmedChunks.has(to)) {
    warmedChunks.add(to)
    chunkLoaders[to]?.().catch(() => warmedChunks.delete(to))
  }
}

export function Nav() {
  return (
    <nav className="mx-auto w-full max-w-[80rem] px-6 sm:px-10 md:px-16 pt-10 flex gap-8 justify-end">
      {links.map(({ to, label }) => (
        <NavLink
          key={to}
          to={to}
          onMouseEnter={() => warmRoute(to)}
          onFocus={() => warmRoute(to)}
          onTouchStart={() => warmRoute(to)}
          className={({ isActive }) =>
            [
              'font-body font-light text-[0.9rem] lowercase tracking-normal transition-colors',
              isActive ? 'text-accent-vermilion' : 'text-ink-primary/70 hover:text-ink-primary',
            ].join(' ')
          }
        >
          {label}
        </NavLink>
      ))}
    </nav>
  )
}
