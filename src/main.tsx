import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { entranceFrame } from './lib/entranceFrame'

// Race the chosen entrance frame against the JS bundle. The browser only
// learns about the URL once React mounts and the Entrance component
// constructs `new Image()`; this preload bumps it forward so the frame is
// already in flight while the bundle parses. The hashed asset URL is
// served with a long immutable Cache-Control so subsequent sessions hit
// the browser cache instantly.
const SESSION_KEY = 'hasVisited'
const shouldPreloadEntrance = (() => {
  try {
    return !window.sessionStorage.getItem(SESSION_KEY)
  } catch {
    return true
  }
})()

if (shouldPreloadEntrance) {
  const link = document.createElement('link')
  link.rel = 'preload'
  link.as = 'image'
  link.href = entranceFrame.src
  link.fetchPriority = 'high'
  document.head.appendChild(link)
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
