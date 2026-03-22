import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-border px-6 md:px-10 py-12 mt-20">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-20">
          <div>
            <p className="text-text-dim text-[10px] tracking-widest uppercase mb-4">Navigate</p>
            <div className="flex flex-col gap-2">
              <Link to="/" className="text-text-muted text-sm hover:text-text transition-colors">Index</Link>
              <Link to="/reading" className="text-text-muted text-sm hover:text-text transition-colors">Reading</Link>
            </div>
          </div>
          <div>
            <p className="text-text-dim text-[10px] tracking-widest uppercase mb-4">Elsewhere</p>
            <div className="flex flex-col gap-2">
              <a href="https://github.com/mcrowley19" target="_blank" rel="noopener noreferrer" className="text-text-muted text-sm hover:text-text transition-colors">GitHub</a>
              <a href="https://www.linkedin.com/in/michael-crowley-2e3/" target="_blank" rel="noopener noreferrer" className="text-text-muted text-sm hover:text-text transition-colors">LinkedIn</a>
            </div>
          </div>
          <div className="md:text-right">
            <p className="text-text-dim text-[10px] tracking-widest uppercase mb-4">Colophon</p>
            <p className="text-text-muted text-sm">React, Tailwind, Vite</p>
            <p className="text-text-dim text-xs mt-2">&copy; {new Date().getFullYear()}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
