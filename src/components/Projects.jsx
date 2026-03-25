import { useState, lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { useInView } from "../hooks/useInView";
import { projects, techColors } from "../data/projects";

const SolScene = lazy(() => import("./scenes/SolScene"));
const MetricareScene = lazy(() => import("./scenes/MetricareScene"));
const ShoelaceScene = lazy(() => import("./scenes/ShoelaceScene"));

const sceneMap = {
  "Sol-450": SolScene,
  Metricare: MetricareScene,
  Shoelace: ShoelaceScene,
};

const featured = projects.slice(0, 3);

function SceneWithFade({ Scene, visible }) {
  const [ready, setReady] = useState(false);

  return (
    <div
      className="absolute inset-0"
      style={{
        visibility: ready ? "visible" : "hidden",
        opacity: ready && visible ? 1 : 0,
        transition: "opacity 400ms ease",
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      <Scene onReady={() => setReady(true)} />
    </div>
  );
}

export default function Projects() {
  const [current, setCurrent] = useState(0);
  const [headerRef, headerInView] = useInView();
  const navigate = useNavigate();

  const prev = () =>
    setCurrent((c) => (c - 1 + featured.length) % featured.length);
  const next = () => setCurrent((c) => (c + 1) % featured.length);

  const project = featured[current];

  return (
    <section className="px-6 md:px-10 py-14 md:py-24 max-w-6xl mx-auto">
      <div
        ref={headerRef}
        className={`reveal ${headerInView ? "visible" : ""}`}
      >
        <div className="flex items-baseline justify-between mb-12">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-text-bright">
            Selected Projects
          </h2>
          <button
            onClick={() => navigate("/projects")}
            className="text-xs text-text font-mono flex items-center gap-1.5 px-3 py-1.5 border border-border-hover hover:text-accent hover:border-accent transition-colors duration-200"
          >
            View all
            <svg
              width="12"
              height="12"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M6 3l5 5-5 5" />
            </svg>
          </button>
        </div>
      </div>

      <div className="relative">
        {/* Carousel */}
        <div className="flex items-center gap-4">
          {/* Desktop-only side arrows */}
          <button
            onClick={prev}
            className="hidden md:flex shrink-0 w-10 h-10 items-center justify-center border border-border-hover bg-surface text-text hover:text-accent hover:border-accent transition-colors duration-200 cursor-pointer"
            aria-label="Previous project"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M10 13l-5-5 5-5" />
            </svg>
          </button>

          <div className="block w-full min-w-0 text-left group">
            <button
              onClick={() => navigate(`/project/${project.name}`)}
              className="block w-full text-left cursor-pointer"
            >
              <div className="aspect-video overflow-hidden border border-border bg-bg-card mb-4 md:mb-6 relative">
                {/* All placeholder images, crossfade */}
                {featured.map((p, i) => (
                  <img
                    key={p.name}
                    src={p.carouselPlaceholder || p.thumbnail}
                    alt={p.name}
                    className="w-full h-full object-cover absolute inset-0"
                    style={{
                      opacity: i === current ? 1 : 0,
                      transition: "opacity 400ms ease",
                    }}
                  />
                ))}
                {/* All 3D scenes, kept mounted, crossfade */}
                {featured.map((p, i) => {
                  const S = sceneMap[p.name];
                  return S ? (
                    <Suspense key={p.name} fallback={null}>
                      <SceneWithFade Scene={S} visible={i === current} />
                    </Suspense>
                  ) : null;
                })}
                <div className="absolute inset-0 bg-linear-to-t from-bg/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            </button>

            {/* Text info crossfade */}
            <div className="relative h-16 md:h-12">
              {featured.map((p, i) => (
                <div
                  key={p.name}
                  className="absolute inset-0"
                  style={{
                    opacity: i === current ? 1 : 0,
                    transition: "opacity 400ms ease",
                    pointerEvents: i === current ? "auto" : "none",
                  }}
                >
                  <button
                    onClick={() => navigate(`/project/${p.name}`)}
                    className="w-full text-left cursor-pointer group"
                  >
                    <div className="flex items-start justify-between gap-3 mb-1.5">
                      <h3 className="text-text-bright text-sm font-medium group-hover:text-accent transition-colors duration-300">
                        {p.name}
                      </h3>
                      <div className="flex items-center gap-1.5 shrink-0 flex-wrap justify-end">
                        {p.tech.slice(0, 3).map((t) => (
                          <span
                            key={t}
                            className="text-[9px] font-mono px-1.5 py-0.5 rounded border text-text-muted"
                            style={{
                              borderColor: techColors[t] || undefined,
                              color: techColors[t] || undefined,
                            }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-text-muted text-xs leading-relaxed">
                      {p.description}
                    </p>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop-only side arrow */}
          <button
            onClick={next}
            className="hidden md:flex shrink-0 w-10 h-10 items-center justify-center border border-border-hover bg-surface text-text hover:text-accent hover:border-accent transition-colors duration-200 cursor-pointer"
            aria-label="Next project"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M6 3l5 5-5 5" />
            </svg>
          </button>
        </div>

        {/* Mobile arrows + dot indicators */}
        <div className="flex items-center justify-center gap-4 mt-8 md:mt-6">
          <button
            onClick={prev}
            className="md:hidden shrink-0 w-9 h-9 flex items-center justify-center border border-border-hover bg-surface text-text hover:text-accent hover:border-accent transition-colors duration-200 cursor-pointer"
            aria-label="Previous project"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M10 13l-5-5 5-5" />
            </svg>
          </button>

          <div className="flex items-center gap-2">
            {featured.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-1.5 h-1.5 rounded-full transition-colors duration-200 cursor-pointer ${
                  i === current ? "bg-accent" : "bg-border hover:bg-text-muted"
                }`}
                aria-label={`Go to project ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="md:hidden shrink-0 w-9 h-9 flex items-center justify-center border border-border-hover bg-surface text-text hover:text-accent hover:border-accent transition-colors duration-200 cursor-pointer"
            aria-label="Next project"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M6 3l5 5-5 5" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
