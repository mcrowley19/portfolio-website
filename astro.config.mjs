import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  site: 'https://michaelcrowley.dev',
  integrations: [sitemap()],
  build: {
    inlineStylesheets: 'always',
  },
  vite: {
    plugins: [tailwindcss()],
    build: {
      // Don't base64-inline small assets. The default 4kB threshold
      // was bundling a 2.7kB Cyrillic font file directly into the
      // HTML even though it's never requested for English content
      // (unicode-range filters it out).
      assetsInlineLimit: 0,
    },
  },
})
