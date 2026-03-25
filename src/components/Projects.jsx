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

function SceneWithFade({ Scene }) {
  const [ready, setReady] = useState(false);

  return (
    <div
      className="absolute inset-0"
      style={{
        visibility: ready ? "visible" : "hidden",
        opacity: ready ? 1 : 0,
        transition: "opacity 700ms ease, visibility 0s",
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
  const Scene = sceneMap[project.name];

  return (
    <section className="px-6 md:px-10 py-24 max-w-6xl mx-auto">
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
        {/* Carousel with flanking arrows */}
        <div className="flex items-center gap-4">
          <button
            onClick={prev}
            className="shrink-0 w-10 h-10 flex items-center justify-center border border-border-hover bg-surface text-text hover:text-accent hover:border-accent transition-colors duration-200 cursor-pointer"
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

          <button
            onClick={() => navigate(`/project/${project.name}`)}
            className="block w-full min-w-0 text-left group cursor-pointer"
          >
            <div className="aspect-video overflow-hidden border border-border bg-bg-card mb-6 relative">
              <img
                src={project.carouselPlaceholder || project.thumbnail}
                alt={project.name}
                className="w-full h-full object-cover absolute inset-0"
              />
              {Scene && (
                <Suspense fallback={null}>
                  <SceneWithFade key={project.name} Scene={Scene} />
                </Suspense>
              )}
              <div className="absolute inset-0 bg-linear-to-t from-bg/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>

            <div className="flex items-start justify-between gap-3 mb-1.5">
              <h3 className="text-text-bright text-sm font-medium group-hover:text-accent transition-colors duration-300">
                {project.name}
              </h3>
              <div className="flex items-center gap-1.5 shrink-0 flex-wrap justify-end">
                {project.tech.slice(0, 3).map((t) => (
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
              {project.description}
            </p>
          </button>

          <button
            onClick={next}
            className="shrink-0 w-10 h-10 flex items-center justify-center border border-border-hover bg-surface text-text hover:text-accent hover:border-accent transition-colors duration-200 cursor-pointer"
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

        {/* Dot indicators */}
        <div className="flex items-center justify-center gap-2 mt-6">
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
      </div>
    </section>
  );
}
