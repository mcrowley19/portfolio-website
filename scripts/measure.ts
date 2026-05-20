/**
 * Measure cold-cache load of the local vite preview server.
 * Reports total bytes, request count, FCP, LCP, and DOMContentLoaded.
 *
 * Usage:
 *   npx vite preview --port 4173 &  (then once it's listening)
 *   npx tsx scripts/measure.ts
 */
import puppeteer from 'puppeteer'

const URL = process.env.MEASURE_URL ?? 'http://localhost:4173/'
const RUNS = Number(process.env.MEASURE_RUNS ?? '3')

type Sample = {
  totalBytes: number
  requestCount: number
  jsBytes: number
  cssBytes: number
  imageBytes: number
  fontBytes: number
  videoBytes: number
  fcpMs: number
  lcpMs: number
  domContentLoadedMs: number
  loadMs: number
  ttfbMs: number
}

async function measureOnce(): Promise<Sample> {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox'],
  })
  try {
    const page = await browser.newPage()
    await page.setViewport({ width: 1280, height: 800 })

    let totalBytes = 0
    let requestCount = 0
    let jsBytes = 0
    let cssBytes = 0
    let imageBytes = 0
    let fontBytes = 0
    let videoBytes = 0

    page.on('response', async (res) => {
      try {
        const buf = await res.buffer().catch(() => null)
        const size = buf?.length ?? 0
        totalBytes += size
        requestCount += 1
        const ct = res.headers()['content-type'] ?? ''
        if (ct.includes('javascript')) jsBytes += size
        else if (ct.includes('css')) cssBytes += size
        else if (ct.startsWith('image/')) imageBytes += size
        else if (ct.includes('font') || ct.includes('woff')) fontBytes += size
        else if (ct.startsWith('video/')) videoBytes += size
      } catch {
        /* ignore */
      }
    })

    const navStart = Date.now()
    await page.goto(URL, { waitUntil: 'networkidle0', timeout: 30000 })

    const metrics = await page.evaluate(() => {
      const paintEntries = performance.getEntriesByType(
        'paint',
      ) as PerformanceEntry[]
      const fcp = paintEntries.find((p) => p.name === 'first-contentful-paint')
      const nav = performance.getEntriesByType(
        'navigation',
      )[0] as PerformanceNavigationTiming
      return {
        fcp: fcp?.startTime ?? -1,
        domContentLoaded: nav?.domContentLoadedEventEnd ?? -1,
        load: nav?.loadEventEnd ?? -1,
        ttfb: nav?.responseStart ?? -1,
      }
    })

    const lcp = await page.evaluate(
      () =>
        new Promise<number>((resolve) => {
          let last = -1
          const obs = new PerformanceObserver((list) => {
            const entries = list.getEntries()
            if (entries.length > 0) {
              last = entries[entries.length - 1].startTime
            }
          })
          obs.observe({ type: 'largest-contentful-paint', buffered: true })
          setTimeout(() => {
            obs.disconnect()
            resolve(last)
          }, 500)
        }),
    )

    void navStart
    return {
      totalBytes,
      requestCount,
      jsBytes,
      cssBytes,
      imageBytes,
      fontBytes,
      videoBytes,
      fcpMs: metrics.fcp,
      lcpMs: lcp,
      domContentLoadedMs: metrics.domContentLoaded,
      loadMs: metrics.load,
      ttfbMs: metrics.ttfb,
    }
  } finally {
    await browser.close()
  }
}

function median(nums: number[]): number {
  const s = [...nums].sort((a, b) => a - b)
  const m = Math.floor(s.length / 2)
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2
}

async function main() {
  const samples: Sample[] = []
  for (let i = 0; i < RUNS; i++) {
    process.stderr.write(`run ${i + 1}/${RUNS}…\n`)
    samples.push(await measureOnce())
  }
  const fmt = (n: number) => n.toFixed(0).padStart(8)
  const fmtKB = (n: number) => (n / 1024).toFixed(1).padStart(8) + ' KB'

  const keys: (keyof Sample)[] = [
    'requestCount',
    'totalBytes',
    'jsBytes',
    'cssBytes',
    'imageBytes',
    'fontBytes',
    'videoBytes',
    'ttfbMs',
    'fcpMs',
    'lcpMs',
    'domContentLoadedMs',
    'loadMs',
  ]

  console.log(`\nMedian over ${RUNS} runs against ${URL}:\n`)
  for (const k of keys) {
    const med = median(samples.map((s) => s[k] as number))
    const formatted = /Bytes/.test(k) ? fmtKB(med) : fmt(med)
    console.log(`  ${k.padEnd(22)} ${formatted}`)
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
