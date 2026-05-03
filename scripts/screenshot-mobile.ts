import { mkdir } from 'node:fs/promises'
import { resolve } from 'node:path'
import puppeteer, { type Viewport } from 'puppeteer'

const URL = process.env.SCREENSHOT_URL ?? 'http://localhost:5173'
const OUT_DIR = resolve(process.cwd(), '.screenshots')
const SYSTEM_CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

const VIEWPORTS: Array<{ name: string; viewport: Viewport }> = [
  { name: 'mobile-360', viewport: { width: 360, height: 800, deviceScaleFactor: 2 } },
  { name: 'mobile-375', viewport: { width: 375, height: 812, deviceScaleFactor: 2 } },
  { name: 'mobile-414', viewport: { width: 414, height: 896, deviceScaleFactor: 2 } },
  { name: 'mobile-430', viewport: { width: 430, height: 932, deviceScaleFactor: 2 } },
  { name: 'tablet-768', viewport: { width: 768, height: 1024, deviceScaleFactor: 2 } },
  { name: 'desktop-1440', viewport: { width: 1440, height: 900, deviceScaleFactor: 2 } },
]

async function main() {
  await mkdir(OUT_DIR, { recursive: true })
  const browser = await puppeteer.launch({
    executablePath: SYSTEM_CHROME,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })
  try {
    for (const { name, viewport } of VIEWPORTS) {
      const page = await browser.newPage()
      await page.evaluateOnNewDocument(() => {
        try { sessionStorage.setItem('hasVisited', 'true') } catch {}
      })
      await page.emulateMediaFeatures([
        { name: 'prefers-reduced-motion', value: 'reduce' },
      ])
      await page.setViewport(viewport)
      await page.goto(URL, { waitUntil: 'networkidle0', timeout: 30000 })
      await new Promise((r) => setTimeout(r, 600))
      const path = resolve(OUT_DIR, `${name}.png`)
      await page.screenshot({ path: path as `${string}.png`, fullPage: true })
      console.log(`saved ${path}`)
      await page.close()
    }
  } finally {
    await browser.close()
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
