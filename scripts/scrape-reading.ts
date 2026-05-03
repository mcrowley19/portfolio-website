import puppeteer from 'puppeteer'

const SYSTEM_CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

async function main() {
  const browser = await puppeteer.launch({
    executablePath: SYSTEM_CHROME,
    headless: true,
  })
  try {
    const page = await browser.newPage()
    await page.setViewport({ width: 1280, height: 1800 })

    for (const url of [
      'https://michaelcrowley.dev/reading',
      'https://michaelcrowley.dev/books',
      'https://michaelcrowley.dev/library',
      'https://michaelcrowley.dev/',
    ]) {
      try {
        await page.goto(url, { waitUntil: 'networkidle0', timeout: 20000 })
        await new Promise((r) => setTimeout(r, 1500))
        const data = await page.evaluate(() => {
          const title = document.title
          const links = Array.from(document.querySelectorAll('a')).map((a) => ({
            href: (a as HTMLAnchorElement).href,
            text: (a.textContent || '').trim(),
          }))
          const text = document.body.innerText
          return { title, url: location.href, links, text }
        })
        console.log('===', url, '===')
        console.log('title:', data.title)
        console.log('final url:', data.url)
        console.log('--- links ---')
        for (const l of data.links.slice(0, 80)) {
          console.log(`  [${l.text.slice(0, 60)}] -> ${l.href}`)
        }
        console.log('--- body text ---')
        console.log(data.text.slice(0, 4000))
        console.log()
      } catch (e) {
        console.log('===', url, 'failed:', String(e).slice(0, 200), '===\n')
      }
    }
  } finally {
    await browser.close()
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
