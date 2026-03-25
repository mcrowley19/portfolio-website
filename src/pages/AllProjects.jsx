import { useNavigate } from "react-router-dom";
import { useInView } from "../hooks/useInView";
import { projects, techColors } from "../data/projects";

function ProjectCard({ project }) {
  const navigate = useNavigate();

  return (
    <div>
      <button
        onClick={() => navigate(`/project/${project.name}`)}
        className="w-full text-left group cursor-pointer"
      >
        <div className="aspect-video overflow-hidden border border-border bg-bg-card mb-4 relative">
          <img
            src={project.thumbnail}
            alt={project.name}
            className={`w-full h-full opacity-80 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-500 ${
              project.imageStyle === "contain"
                ? "object-contain"
                : "object-cover"
            }`}
            style={
              project.imageBg ? { backgroundColor: project.imageBg } : undefined
            }
            loading="lazy"
          />
          <div className="absolute inset-0 bg-linear-to-t from-bg/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <div className="flex items-start justify-between gap-3 mb-1.5">
          <h3 className="text-text-bright text-sm font-medium group-hover:text-accent transition-colors duration-300 truncate">
            {project.name}
          </h3>
          {project.date && (
            <span className="text-xs text-text font-mono shrink-0">
              {project.date}
            </span>
          )}
        </div>
        <div className="flex flex-wrap gap-1.5 mb-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-[7px] font-mono px-1 py-px rounded border text-text-muted"
              style={{
                borderColor: techColors[t] || undefined,
                color: techColors[t] || undefined,
              }}
            >
              {t}
            </span>
          ))}
        </div>
        <p className="text-text-muted text-xs leading-relaxed">
          {project.description}
        </p>
      </button>
    </div>
  );
}

export default function AllProjects() {
  const [headerRef, headerInView] = useInView();

  const sorted = [...projects].sort((a, b) => {
    if (!a.sortDate && !b.sortDate) return 0;
    if (!a.sortDate) return 1;
    if (!b.sortDate) return -1;
    return b.sortDate.localeCompare(a.sortDate);
  });

  return (
    <div className="px-6 md:px-10 pt-24 pb-16 max-w-6xl mx-auto min-h-screen">
      <div
        ref={headerRef}
        className={`reveal ${headerInView ? "visible" : ""}`}
      >
        <div className="mb-20">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-text-bright leading-[0.95] mb-6">
            Projects
          </h1>
          <p className="text-text-muted text-sm max-w-md leading-relaxed">
            A collection of things I've built.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-14 gap-y-16">
        {sorted.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
    </div>
  );
}
