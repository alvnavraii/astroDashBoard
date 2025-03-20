import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    tailwind({
      config: {
        applyBaseStyles: false
      }
    })
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
