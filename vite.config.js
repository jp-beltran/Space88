import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Space88/', // Altere para o nome do seu repositório
  server: {
    port: 3001, // Altere para a porta desejada
  },
})