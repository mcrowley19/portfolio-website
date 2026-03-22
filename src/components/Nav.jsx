import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function Nav() {
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [time, setTime] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const update = () => {
      const now = new Date()
      setTime(
        now.toLocaleTimeString('en-IE', {
          hour: '2-digit',
          minute: '2-digit',
          timeZone: 'Europe/Dublin',
          hour12: false,
        })
      )
    }
    update()
    const id = setInterval(update, 60000)
    return () => clearInterval(id)
  }, [])

  const isActive = (path) => location.pathname === path

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-bg/90 backdrop-blur-lg' : ''
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10 h-14 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link
            to="/"
            className={`text-xs tracking-wide transition-colors duration-300 ${
              isActive('/') ? 'text-text-bright' : 'text-text-muted hover:text-text'
            }`}
          >
            Index
          </Link>
          <Link
            to="/reading"
            className={`text-xs tracking-wide transition-colors duration-300 ${
              isActive('/reading') ? 'text-text-bright' : 'text-text-muted hover:text-text'
            }`}
          >
            Reading
          </Link>
          <a
            href="https://github.com/mcrowley19"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs tracking-wide text-text-muted hover:text-text transition-colors duration-300"
          >
            GitHub
          </a>
        </div>

        <span className="font-mono text-[10px] text-text-dim tracking-wider">
          Dublin {time}
        </span>
      </div>
    </nav>
  )
}
