import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.prietoreal.estate',
  trailingSlash: 'ignore',
  integrations: [react(), sitemap({ filter: (page) => !page.includes('/404') })],
});
