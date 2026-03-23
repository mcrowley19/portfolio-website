import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './pages/Home'
import Reading from './pages/Reading'
import ProjectDetail from './pages/ProjectDetail'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <div className="noise min-h-screen flex flex-col">
      <Nav />
      <ScrollToTop />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reading" element={<Reading />} />
          <Route path="/project/:projectName" element={<ProjectDetail />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
