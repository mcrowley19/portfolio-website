import { useParams, useNavigate } from "react-router-dom";
import { useInView } from "../hooks/useInView";
import { projects, techColors } from "../data/projects";

export default function ProjectDetail() {
  const { projectName } = useParams();
  const navigate = useNavigate();
  const [ref, isInView] = useInView();

  const project = projects.find((p) => p.name === projectName);

  if (!project) {
    return (
      <div className="px-6 md:px-10 pt-24 pb-16 max-w-6xl mx-auto min-h-screen">
        <p className="text-text-muted">Project not found</p>
      </div>
    );
  }

  return (
    <div className="px-6 md:px-10 pt-24 pb-16 max-w-6xl mx-auto min-h-screen">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-accent transition-colors mb-12 font-mono"
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
        Back
      </button>

      <div ref={ref} className={`reveal ${isInView ? "visible" : ""} mb-12`}>
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-text-bright leading-[0.95] mb-2">
              {project.name}
            </h1>
            <div className="flex items-center gap-4">
              {project.date && (
                <span className="text-sm text-text-dim font-mono">
                  {project.date}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-[10px] font-mono px-2 py-1 rounded border text-text-muted"
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

      <div className="max-w-3xl overflow-hidden border border-border bg-bg-card mb-12">
        <img
          src={project.thumbnail}
          alt={project.name}
          className={`w-full h-auto ${
            project.imageStyle === "contain" ? "object-contain" : "object-cover"
          }`}
          style={project.imageBg ? { backgroundColor: project.imageBg } : undefined}
        />
      </div>

      <div>
        <div className="mb-12">
          <p className="text-text-dim text-[10px] tracking-widest uppercase mb-3">
            About
          </p>
          <div className="text-text text-base leading-relaxed space-y-4">
            {project.long.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>

        <div className="border-t border-border pt-8 flex gap-6">
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-text-muted hover:text-accent transition-colors font-mono"
            >
              Source Code
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
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-text-muted hover:text-accent transition-colors font-mono"
            >
              Live Site
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
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
