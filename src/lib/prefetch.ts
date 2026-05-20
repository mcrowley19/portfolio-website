// Cheap idempotent image prefetch. Drops <link rel="prefetch" as="image">
// tags into <head> at the browser's lowest priority so they land in the
// HTTP cache before the user navigates and an <img> actually needs them.

const injected = new Set<string>()

type NetworkInformation = {
  saveData?: boolean
  effectiveType?: string
}

function isConstrainedNetwork(): boolean {
  if (typeof navigator === 'undefined') return false
  const conn = (navigator as Navigator & { connection?: NetworkInformation }).connection
  if (!conn) return false
  if (conn.saveData) return true
  return conn.effectiveType === '2g' || conn.effectiveType === 'slow-2g'
}

export function prefetchImages(urls: readonly string[]) {
  if (typeof document === 'undefined') return
  if (isConstrainedNetwork()) return
  for (const href of urls) {
    if (injected.has(href)) continue
    injected.add(href)
    const link = document.createElement('link')
    link.rel = 'prefetch'
    link.as = 'image'
    link.href = href
    document.head.appendChild(link)
  }
}

type IdleCallback = (cb: () => void, opts?: { timeout: number }) => number

export function schedulePrefetch(urls: readonly string[], timeoutMs = 2500) {
  if (typeof window === 'undefined') return
  const run = () => prefetchImages(urls)
  const ric = (window as Window & { requestIdleCallback?: IdleCallback })
    .requestIdleCallback
  if (ric) {
    ric(run, { timeout: timeoutMs })
  } else {
    setTimeout(run, timeoutMs)
  }
}
