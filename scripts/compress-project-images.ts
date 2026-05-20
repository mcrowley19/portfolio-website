/**
 * One-shot recompression of src/assets/projects/*.{png,jpg,jpeg} into WebP.
 * Thumbnails render at 140x90 in ProjectsPage; targeting a 640px longest
 * edge gives ~2.3x headroom for retina without bloating the asset pipeline.
 *
 * Usage: npx tsx scripts/compress-project-images.ts
 */
import { promises as fs } from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const PROJECTS_DIR = path.resolve('src/assets/projects')
const TARGET_LONGEST_EDGE = 640
const WEBP_QUALITY = 80

async function main() {
  const entries = await fs.readdir(PROJECTS_DIR)
  const sources = entries.filter((name) => /\.(png|jpe?g)$/i.test(name))
  if (sources.length === 0) {
    console.log('No source images found in', PROJECTS_DIR)
    return
  }

  let totalIn = 0
  let totalOut = 0

  for (const name of sources) {
    const inPath = path.join(PROJECTS_DIR, name)
    const outName = name.replace(/\.(png|jpe?g)$/i, '.webp')
    const outPath = path.join(PROJECTS_DIR, outName)

    const inStat = await fs.stat(inPath)
    await sharp(inPath)
      .resize({
        width: TARGET_LONGEST_EDGE,
        height: TARGET_LONGEST_EDGE,
        fit: 'inside',
        withoutEnlargement: true,
      })
      .webp({ quality: WEBP_QUALITY })
      .toFile(outPath)
    const outStat = await fs.stat(outPath)

    totalIn += inStat.size
    totalOut += outStat.size

    const pct = ((1 - outStat.size / inStat.size) * 100).toFixed(1)
    console.log(
      `${name.padEnd(28)} ${(inStat.size / 1024).toFixed(0).padStart(6)} KB -> ` +
        `${outName.padEnd(28)} ${(outStat.size / 1024).toFixed(0).padStart(6)} KB  (-${pct}%)`,
    )
  }

  const savedPct = ((1 - totalOut / totalIn) * 100).toFixed(1)
  console.log(
    `\nTotal: ${(totalIn / 1024 / 1024).toFixed(2)} MB -> ` +
      `${(totalOut / 1024 / 1024).toFixed(2)} MB  (-${savedPct}%)`,
  )
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
