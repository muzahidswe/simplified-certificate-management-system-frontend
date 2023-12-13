// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })


// // vite.config.js
// import ViteReactPlugin from '@vitejs/plugin-react';

// export default {
//   plugins: [ViteReactPlugin()],
//   optimizeDeps: {
//     include: ['axios'],
//   },
// };

import react from '@vitejs/plugin-react';

export default {
  plugins: [react()],
};

