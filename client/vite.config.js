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
    https: {
      key: localhostKey,
      cert: localhostCert,
    },
  },
  // configuration:  test
  test: {
    environment: 'jsdom',
    globals: true,
  },

})
