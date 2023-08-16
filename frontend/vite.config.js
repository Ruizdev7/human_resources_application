import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// https://vitejs.dev/config/

export default defineConfig({
  plugins: [react()],
  ssr: {
    entry: 'src/entry-server.js',
    external: [
      'react',
      'react-dom',
      'react-router-dom'
    ],
    noExternal: ['src/**/*.css']
  },
  build: {
    chunkSizeWarningLimit: 1000 * 4096,
  },

})

