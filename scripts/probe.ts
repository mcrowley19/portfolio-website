import puppeteer from 'puppeteer'

const SYSTEM_CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

async function main() {
  const browser = await puppeteer.launch({ executablePath: SYSTEM_CHROME, headless: true })
  const page = await browser.newPage()
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }])
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 })
  await page.goto('http://localhost:5174', { waitUntil: 'networkidle0' })
  await new Promise((r) => setTimeout(r, 1500))

  // scroll
  await page.evaluate(async () => {
    const total = document.documentElement.scrollHeight
    const step = window.innerHeight * 0.4
    for (let y = 0; y < total + window.innerHeight; y += step) {
      window.scrollTo(0, y)
      await new Promise((r) => setTimeout(r, 250))
    }
    await new Promise((r) => setTimeout(r, 800))
    window.scrollTo(0, 0)
    await new Promise((r) => setTimeout(r, 800))
  })

  const articleStates = await page.evaluate(() => {
    const arts = Array.from(document.querySelectorAll('article'))
    return arts.map((a) => ({
      id: a.id,
      opacity: getComputedStyle(a).opacity,
      transform: getComputedStyle(a).transform,
      rect: a.getBoundingClientRect().top,
    }))
  })
  console.log(JSON.stringify(articleStates, null, 2))

  const sectionStates = await page.evaluate(() => {
    const ss = Array.from(document.querySelectorAll('section'))
    return ss.map((a) => ({
      id: a.id,
      opacity: getComputedStyle(a).opacity,
    }))
  })
  console.log('sections:', JSON.stringify(sectionStates, null, 2))

  await browser.close()
}
main().catch((e) => { console.error(e); process.exit(1) })
