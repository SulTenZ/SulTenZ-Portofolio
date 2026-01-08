import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
  assetsInclude: ['**/*.glb', '**/*.png'],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Memisahkan library React core agar tidak redownload saat kode app berubah
          vendor: ['react', 'react-dom', 'react-router-dom'],
          // Memisahkan library animasi yang berat
          animations: ['framer-motion', 'gsap', 'motion'],
          // Memisahkan library 3D (Lanyard/Three.js/OGL) ke chunk terpisah
          // Ini sangat penting agar halaman yang tidak pakai 3D bisa load lebih cepat
          three: ['three', '@react-three/fiber', '@react-three/drei', 'ogl'],
          // Memisahkan library UI icons
          icons: ['react-icons', '@tabler/icons-react'],
        },
      },
    },
    // Meningkatkan batas peringatan chunk size (karena Three.js memang besar)
    chunkSizeWarningLimit: 1000,
  },
})