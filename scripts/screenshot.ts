import { mkdir } from 'node:fs/promises'
import { resolve } from 'node:path'
import puppeteer, { type Viewport } from 'puppeteer'

const URL = process.env.SCREENSHOT_URL ?? 'http://localhost:5173'
const OUT_DIR = resolve(process.cwd(), '.screenshots')

const SYSTEM_CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

const VIEWPORTS: Array<{ name: string; viewport: Viewport }> = [
  { name: 'desktop-1440x900', viewport: { width: 1440, height: 900, deviceScaleFactor: 2 } },
  { name: 'tablet-768x1024', viewport: { width: 768, height: 1024, deviceScaleFactor: 2 } },
  { name: 'mobile-375x812', viewport: { width: 375, height: 812, deviceScaleFactor: 3 } },
  { name: 'mobile-390x844', viewport: { width: 390, height: 844, deviceScaleFactor: 3 } },
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
      await page.emulateMediaFeatures([
        { name: 'prefers-reduced-motion', value: 'reduce' },
      ])
      await page.setViewport(viewport)
      await page.goto(URL, { waitUntil: 'networkidle0', timeout: 30000 })
      // give fonts a moment
      await new Promise((r) => setTimeout(r, 600))
      // scroll through the page so whileInView animations fire, then wait
      // for them to finish before scrolling back to the top
      await page.evaluate(async () => {
        const total = document.documentElement.scrollHeight
        const step = window.innerHeight * 0.4
        for (let y = 0; y < total + window.innerHeight; y += step) {
          window.scrollTo(0, y)
          await new Promise((r) => setTimeout(r, 250))
        }
        // hold at bottom to let final entries finish animating
        await new Promise((r) => setTimeout(r, 800))
        window.scrollTo(0, 0)
        await new Promise((r) => setTimeout(r, 800))
      })
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
