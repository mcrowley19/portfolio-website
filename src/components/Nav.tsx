import { NavLink } from 'react-router-dom'
import { prefetchImages } from '../lib/prefetch'
import { routeImages } from '../lib/routeAssets'

const links = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Projects' },
  { to: '/reading', label: 'Reading' },
]

function warmRoute(to: string) {
  const imgs = routeImages[to]
  if (imgs && imgs.length) prefetchImages(imgs)
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
