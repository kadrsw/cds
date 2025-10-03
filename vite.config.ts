import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['firebase/app', 'firebase/auth', 'firebase/database']
  },
  build: {
    rollupOptions: {
      // Netlify build hatasını gidermek için eklenen ayar:
      // Rollup'a, bu Firebase modüllerini dışsal olarak ele almasını söyleriz.
      external: [
        'firebase/app',
        'firebase/auth',
        'firebase/database',
        // Eğer başka bir paket (örneğin 'firebase/firestore') hata verirse, buraya ekleyebilirsiniz.
      ],
      output: {
        manualChunks: {
          'firebase': ['firebase/app', 'firebase/auth', 'firebase/database'],
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'utils': ['date-fns', 'lucide-react']
        }
      }
    },
    sourcemap: false,
    minify: 'esbuild',
    target: 'esnext'
  },
  server: {
    port: 3000
  }
});
