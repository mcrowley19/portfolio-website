import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Nav } from './components/Nav'
import { EntranceProvider } from './components/Entrance'
import { HomePage } from './pages/HomePage'
import { ProjectsPage } from './pages/ProjectsPage'
import { ProjectPage } from './pages/ProjectPage'
import { ReadingPage } from './pages/ReadingPage'
import { schedulePrefetch } from './lib/prefetch'
import { projectsRouteImages } from './lib/routeAssets'

function App() {
  useEffect(() => {
    schedulePrefetch(projectsRouteImages)
  }, [])

  return (
    <BrowserRouter>
      <EntranceProvider>
        <Nav />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:slug" element={<ProjectPage />} />
          <Route path="/reading" element={<ReadingPage />} />
        </Routes>
      </EntranceProvider>
    </BrowserRouter>
  )
}

export default App
