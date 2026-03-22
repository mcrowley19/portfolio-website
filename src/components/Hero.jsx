import { useInView } from '../hooks/useInView'

export default function Hero() {
  const [ref, isInView] = useInView()

  return (
    <section ref={ref} className="flex flex-col justify-center px-6 md:px-10 py-20 max-w-6xl mx-auto">
      <div className={`reveal ${isInView ? 'visible' : ''}`}>
        <div className="flex flex-wrap items-end justify-between gap-8">
          {/* Left — name + info */}
          <div>
            <h1 className="text-3xl md:text-5xl font-bold leading-[0.95] tracking-tight text-text-bright mb-6">
              Michael<br />Crowley
            </h1>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-border-hover">
                <img
                  src="https://github.com/mcrowley19.png"
                  alt="Michael Crowley"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  loading="eager"
                />
              </div>
              <div>
                <p className="text-sm text-text">Computer Science</p>
                <p className="text-xs text-text-muted">Trinity College Dublin</p>
              </div>
            </div>
          </div>

          {/* Right — coordinates */}
          <div className="flex gap-6 text-xs text-text-muted font-mono pb-1">
            <span>53.3N, 6.2W</span>
            <span>Dublin, IE</span>
          </div>
        </div>
      </div>

      <div className="mt-8 flex items-center gap-3">
        <div className="h-px flex-1 bg-border" />
        <span className="text-[10px] text-text-dim tracking-widest uppercase">Scroll</span>
        <div className="w-4 h-px bg-text-dim" />
      </div>
    </section>
  )
}
