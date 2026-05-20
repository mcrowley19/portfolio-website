import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import trinityUrl from './assets/trinity.webp?url'
import deepBlueUrl from './assets/deepblue.webp?url'
import hamiltonUrl from './assets/hamilton.webp?url'

// Race the intro frames against the JS bundle. Without this preload the
// browser only learns about these URLs once React mounts and the Entrance
// component constructs `new Image()` — by then the bundle has already
// monopolised the connection. The hashed asset URLs are served with a
// long immutable Cache-Control, so subsequent sessions hit the browser
// cache instantly.
const SESSION_KEY = 'hasVisited'
const shouldPreloadEntrance = (() => {
  try {
    return !window.sessionStorage.getItem(SESSION_KEY)
  } catch {
    return true
  }
})()

if (shouldPreloadEntrance) {
  for (const href of [trinityUrl, deepBlueUrl, hamiltonUrl]) {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'image'
    link.href = href
    link.fetchPriority = 'high'
    document.head.appendChild(link)
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
