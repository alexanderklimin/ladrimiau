import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://ladrimiau.com',
  trailingSlash: 'always',
  integrations: [sitemap({ lastmod: new Date() })],
  build: { inlineStylesheets: 'always' },
});
