// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })


import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Carpeta de salida personalizada
    assetsDir: 'assets', // Carpeta de activos personalizada
    rollupOptions: {
      input: 'src/main.js', // Asegúrate de que esté apuntando a tu archivo JavaScript principal
    },
  },
  server: {
    host: 'localhost',
    port: 3000,
  },
  base: '/', // Ajusta según el nombre del subdirectorio si es necesario
  build: {
    target: 'esnext', // Puedes ajustar el target según tus necesidades
  },
});