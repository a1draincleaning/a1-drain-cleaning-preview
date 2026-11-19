import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://a1draincleaning.github.io',
  base: '/a1-drain-cleaning-preview',
  output: 'static',
  trailingSlash: 'always',
  integrations: [sitemap()],
  vite: { plugins: [tailwindcss()] }
});
