import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev
export default defineConfig({
    plugins: [react()],
    server: {
        // Escucha en todas las interfaces de red (local y externa)
        host: true,

        // NECESARIO PARA CLOUDFLARE EN VITE 5+: 
        // Permite que las URLs de ".trycloudflare.com" entren a tu app
        // sin que Vite las bloquee por seguridad (Error: Blocked request)
        allowedHosts: true
    }
})
