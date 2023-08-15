import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/nssc/',
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.indexOf("node_modules") > -1) {
            if (id.indexOf("@mui") > -1) {
              return "vendor_mui";
            }

            return "vendor"; // all other package goes here
          }
        },
      }
    }
  }
})
