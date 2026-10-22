import { defineConfig } from 'astro/config';

export default defineConfig({
  server: {
    port: 2353,
    host: true,
    allowedHosts: true
  }
});
