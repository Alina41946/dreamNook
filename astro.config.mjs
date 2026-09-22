import {defineConfig} from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://alina41946.github.io',
  base: '/dreamNook',

  integrations: [
    sitemap({
      filter: (page) => !page.includes('/sArea/'),
    }),
  ],
});
