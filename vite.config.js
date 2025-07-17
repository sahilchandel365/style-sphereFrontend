import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [
    tailwindcss(),react(),
  ],
  
  
    theme: {
      extend: {
        backgroundImage: {
          'custom-pattern': "url('https://example.com/image.jpg')", // Custom background image
        },
      },
    },
    /** @type {import('tailwindcss').Config} */

  


  
})
