import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { localhostKey } from './certs/localhost+2-key.js';
import { localhostCert } from './certs/localhost+2.js';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 8080,
    host: '0.0.0.0',
    watch: {
      usePolling: true,
    },
    // https: { // ssl certificate
    //   key: localhostKey,
    //   cert: localhostCert,
    // },
    proxy: {
      '/api': {
        target: 'https://tridishop.site', // Adresse de votre backend
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    },
    hmr: {
      overlay: false, // Désactive l'overlay pour les erreurs
    },
  },
  // configuration:  test
  test: {
    environment: 'jsdom',
    globals: true,
  },

})
