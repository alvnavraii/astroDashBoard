import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
    react()
  ],
  output: 'server',
  // Configuración para páginas de error personalizadas
  build: {
    errorPages: {
      404: '/404',
      401: '/401'
    }
  }
});
