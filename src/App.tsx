import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Nav } from './components/Nav'
import { EntranceProvider } from './components/Entrance'
import { HomePage } from './pages/HomePage'
import { schedulePrefetch } from './lib/prefetch'
import { allRouteImages } from './lib/routeAssets'

const ProjectsPage = lazy(() =>
  import('./pages/ProjectsPage').then((m) => ({ default: m.ProjectsPage })),
)
const ProjectPage = lazy(() =>
  import('./pages/ProjectPage').then((m) => ({ default: m.ProjectPage })),
)
const ReadingPage = lazy(() =>
  import('./pages/ReadingPage').then((m) => ({ default: m.ReadingPage })),
)

function App() {
  useEffect(() => {
    schedulePrefetch(allRouteImages)
  }, [])

  return (
    <BrowserRouter>
      <EntranceProvider>
        <Nav />
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:slug" element={<ProjectPage />} />
            <Route path="/reading" element={<ReadingPage />} />
          </Routes>
        </Suspense>
      </EntranceProvider>
    </BrowserRouter>
  )
}

export default App
