import { useInView } from "../hooks/useInView";

export default function Hero() {
  const [ref, isInView] = useInView();

  return (
    <section ref={ref} className="px-6 md:px-10 py-20 max-w-6xl mx-auto">
      <div className={`reveal ${isInView ? "visible" : ""}`}>
        {/* Portrait */}
        <div className="w-full max-w-60 mx-auto mb-12">
          <div className="aspect-3/4 overflow-hidden">
            <img
              src="https://github.com/mcrowley19.png"
              alt="Michael Crowley"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              loading="eager"
            />
          </div>
        </div>

        {/* Name + details below */}
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-5xl font-bold leading-[0.95] tracking-tight text-text-bright mb-3">
              Michael Crowley
            </h1>
            <p className="text-sm text-text">Computer Science</p>
            <p className="text-xs text-text-muted">Trinity College Dublin</p>
          </div>

          <div className="flex gap-6 text-xs text-text-muted font-mono pb-1">
            <span>53.3N, 6.2W</span>
            <span>Dublin, IE</span>
          </div>
        </div>
      </div>

      <div className="mt-8 flex items-center gap-3">
        <div className="h-px flex-1 bg-border" />
        <span className="text-[10px] text-text-dim tracking-widest uppercase">
          Scroll
        </span>
        <div className="w-4 h-px bg-text-dim" />
      </div>
    </section>
  );
}
