import { mkdir } from 'node:fs/promises'
import { resolve } from 'node:path'
import puppeteer from 'puppeteer'

const URL = process.env.SCREENSHOT_URL ?? 'http://localhost:5173'
const OUT_DIR = resolve(process.cwd(), '.screenshots')
const SYSTEM_CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

async function main() {
  await mkdir(OUT_DIR, { recursive: true })
  const browser = await puppeteer.launch({
    executablePath: SYSTEM_CHROME,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })
  try {
    const page = await browser.newPage()
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 })
    // make sure sessionStorage is empty so the entrance plays
    await page.goto(URL, { waitUntil: 'domcontentloaded' })
    await page.evaluate(() => sessionStorage.clear())
    page.on('console', (m) => console.log('[browser]', m.type(), m.text()))
    page.on('pageerror', (e) => console.log('[pageerror]', e.message))
    await page.evaluateOnNewDocument(() => {
      try { sessionStorage.clear() } catch {}
    })
    await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 30000 })

    // Wait for the overlay (the fixed cream div) to mount, then wait for the
    // hamilton frame's <img> opacity to flip to 1. This is robust to load timing.
    await page.waitForFunction(
      () => {
        const hamilton = Array.from(
          document.querySelectorAll('img[aria-hidden="true"]'),
        ).find((img) =>
          (img as HTMLImageElement).src.includes('hamilton'),
        ) as HTMLImageElement | undefined
        if (!hamilton) return false
        return parseFloat(getComputedStyle(hamilton).opacity) > 0.95
      },
      { timeout: 15000 },
    )
    // hold so the crossfade fully completes and we're mid-hold on hamilton
    await new Promise((r) => setTimeout(r, 400))
    const info = await page.evaluate(() => {
      const imgs = Array.from(document.querySelectorAll('img[aria-hidden="true"]'))
      return imgs.map((img) => ({
        src: (img as HTMLImageElement).src.split('/').pop(),
        opacity: getComputedStyle(img).opacity,
        filter: getComputedStyle(img).filter,
        nat: (img as HTMLImageElement).naturalWidth,
      }))
    })
    console.log('[imgs]', JSON.stringify(info, null, 2))

    const path = resolve(OUT_DIR, 'hamilton-frame.png')
    await page.screenshot({ path: path as `${string}.png` })
    console.log(`saved ${path}`)
    await page.close()
  } finally {
    await browser.close()
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
