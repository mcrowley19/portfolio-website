import { useState } from 'react'
import { useInView } from '../hooks/useInView'

const projects = [
  {
    name: 'mars-food-simulation',
    description: 'A simulation model for food production systems on Mars — exploring agricultural viability in extraterrestrial environments.',
    long: 'Models crop growth cycles, resource constraints, and environmental variables for hypothetical Martian greenhouses. Built with vanilla JavaScript to keep the simulation logic transparent and hackable.',
    lang: 'JavaScript',
    url: 'https://github.com/mcrowley19/mars-food-simulation',
    thumbnail: 'https://opengraph.githubassets.com/1/mcrowley19/mars-food-simulation',
  },
  {
    name: 'micrograd-java',
    description: 'A Java remake of Andrej Karpathy\'s micrograd engine. A tiny scalar-valued autograd engine and a neural net library on top of it.',
    long: 'Implements reverse-mode automatic differentiation from scratch. Supports building and training small neural networks entirely through scalar operations — useful for understanding backpropagation at the lowest level.',
    lang: 'Java',
    url: 'https://github.com/mcrowley19/micrograd-java',
    thumbnail: 'https://opengraph.githubassets.com/1/mcrowley19/micrograd-java',
  },
  {
    name: 'dashboard',
    description: 'A metrics dashboard application. Live at metricare.vercel.app.',
    long: 'Full-stack TypeScript dashboard for visualizing and tracking metrics. Deployed on Vercel with a responsive layout and real-time data rendering.',
    lang: 'TypeScript',
    url: 'https://github.com/mcrowley19/dashboard',
    live: 'https://metricare.vercel.app/',
    thumbnail: 'https://opengraph.githubassets.com/1/mcrowley19/dashboard',
  },
  {
    name: 'LinearOps',
    description: 'A Python library for linear algebra operations — supports matrix and vector computations.',
    long: 'Designed for clarity over performance. Implements core matrix operations (multiplication, transposition, determinants, inverses) and vector operations without NumPy, as a learning exercise in computational mathematics.',
    lang: 'Python',
    url: 'https://github.com/mcrowley19/LinearOps',
    thumbnail: 'https://opengraph.githubassets.com/1/mcrowley19/LinearOps',
  },
  {
    name: 'shoelace',
    description: 'A TypeScript project exploring component architecture and design systems.',
    long: 'Experiments with composable UI components, theming patterns, and type-safe prop APIs. A sandbox for learning modern frontend architecture.',
    lang: 'TypeScript',
    url: 'https://github.com/mcrowley19/shoelace',
    thumbnail: 'https://opengraph.githubassets.com/1/mcrowley19/shoelace',
  },
  {
    name: 'programming-project',
    description: 'A Python project built as part of university coursework.',
    long: 'University programming project developed during CS studies at Trinity College Dublin.',
    lang: 'Python',
    url: 'https://github.com/mcrowley19/programming-project',
    thumbnail: 'https://opengraph.githubassets.com/1/mcrowley19/programming-project',
  },
]

const langColors = {
  JavaScript: '#f7df1e',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  Java: '#b07219',
}

function ProjectCard({ project, index, onOpen }) {
  const [ref, isInView] = useInView()

  return (
    <div
      ref={ref}
      className={`transition-all duration-600 ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <button
        onClick={() => onOpen(project)}
        className="w-full text-left group cursor-pointer"
      >
        {/* Thumbnail */}
        <div className="aspect-video overflow-hidden border border-border bg-bg-card mb-4 relative">
          <img
            src={project.thumbnail}
            alt={project.name}
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-linear-to-t from-bg/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Title row */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-baseline gap-3 min-w-0">
            <span className="font-mono text-[10px] text-text-dim shrink-0">
              {String(index + 1).padStart(2, '0')}
            </span>
            <h3 className="text-text-bright text-sm font-medium group-hover:text-accent transition-colors duration-300 truncate">
              {project.name}
            </h3>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: langColors[project.lang] || '#666' }}
            />
            <span className="text-xs text-text-muted font-mono">{project.lang}</span>
            {project.live && (
              <span className="text-[9px] text-accent font-mono tracking-wider uppercase">Live</span>
            )}
          </div>
        </div>
        <p className="text-text-muted text-xs leading-relaxed mt-1.5 pl-7">
          {project.description}
        </p>
      </button>
    </div>
  )
}

function ProjectModal({ project, onClose }) {
  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-bg/40 backdrop-blur-sm z-40 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-4 md:inset-16 z-50 flex flex-col bg-bg-elevated border border-border overflow-hidden">
        {/* Header */}
        <div className="border-b border-border px-6 md:px-10 py-6 flex items-center justify-between shrink-0">
          <h2 className="text-lg md:text-xl font-bold text-text-bright">{project.name}</h2>
          <button
            onClick={onClose}
            className="text-text-muted hover:text-text transition-colors p-1"
            aria-label="Close"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 6l12 12M6 18L18 6" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 md:px-10 py-8">
          {/* Thumbnail */}
          <div className="aspect-video overflow-hidden border border-border bg-bg-card mb-8">
            <img
              src={project.thumbnail}
              alt={project.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Description */}
          <div className="max-w-3xl">
            <div className="mb-8">
              <p className="text-text-dim text-[10px] tracking-widest uppercase mb-3">About</p>
              <p className="text-text text-base leading-relaxed">
                {project.long}
              </p>
            </div>

            {/* Meta */}
            <div className="border-t border-border pt-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <p className="text-text-dim text-[10px] tracking-widest uppercase mb-2">Language</p>
                  <p className="text-text text-sm font-mono">{project.lang}</p>
                </div>
                {project.live && (
                  <div>
                    <p className="text-text-dim text-[10px] tracking-widest uppercase mb-2">Status</p>
                    <span className="text-accent text-sm font-mono">Live</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer — Links */}
        <div className="border-t border-border px-6 md:px-10 py-6 flex gap-4 shrink-0">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-text-muted hover:text-accent transition-colors font-mono"
          >
            Source Code
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 3l5 5-5 5" />
            </svg>
          </a>
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-accent hover:text-accent-hover transition-colors font-mono"
            >
              View Live
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 3l5 5-5 5" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </>
  )
}

export default function Projects() {
  const [headerRef, headerInView] = useInView()
  const [selectedProject, setSelectedProject] = useState(null)

  return (
    <section className="px-6 md:px-10 py-24 max-w-6xl mx-auto">
      <div ref={headerRef} className={`reveal ${headerInView ? 'visible' : ''}`}>
        <div className="flex items-baseline justify-between mb-12">
          <div>
            <p className="text-text-dim text-[10px] tracking-widest uppercase mb-2">Work</p>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-text-bright">
              Selected Projects
            </h2>
          </div>
          <span className="text-text-dim font-mono text-xs">{projects.length} projects</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-10">
        {projects.map((project, i) => (
          <ProjectCard
            key={project.name}
            project={project}
            index={i}
            onOpen={setSelectedProject}
          />
        ))}
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  )
}
