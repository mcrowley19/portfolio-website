import { useParams, useNavigate } from 'react-router-dom'
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

export default function ProjectDetail() {
  const { projectName } = useParams()
  const navigate = useNavigate()
  const [ref, isInView] = useInView()

  const project = projects.find((p) => p.name === projectName)

  if (!project) {
    return (
      <div className="px-6 md:px-10 pt-24 pb-16 max-w-6xl mx-auto min-h-screen">
        <p className="text-text-muted">Project not found</p>
      </div>
    )
  }

  return (
    <div className="px-6 md:px-10 pt-24 pb-16 max-w-6xl mx-auto min-h-screen">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-accent transition-colors mb-12 font-mono"
      >
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M10 13l-5-5 5-5" />
        </svg>
        Back
      </button>

      {/* Header */}
      <div ref={ref} className={`reveal ${isInView ? 'visible' : ''} mb-12`}>
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-text-bright leading-[0.95] mb-2">
              {project.name}
            </h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: langColors[project.lang] || '#666' }}
                />
                <span className="text-sm text-text-muted font-mono">{project.lang}</span>
              </div>
              {project.live && (
                <span className="text-xs text-accent font-mono tracking-wider uppercase">Live</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Thumbnail */}
      <div className="aspect-video overflow-hidden border border-border bg-bg-card mb-12">
        <img
          src={project.thumbnail}
          alt={project.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="max-w-3xl">
        {/* Description */}
        <div className="mb-12">
          <p className="text-text-dim text-[10px] tracking-widest uppercase mb-3">About</p>
          <p className="text-text text-base leading-relaxed">
            {project.long}
          </p>
        </div>

        {/* Links */}
        <div className="border-t border-border pt-8 flex gap-6">
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
    </div>
  )
}
