import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    root: 'frontend',
    build: {
        outDir: 'dist',
        emptyOutDir: true
    },
    publicDir: 'public',
    server: {
        proxy: {
            '/database': 'http://localhost:3000',
            '/api/marvel': 'http://localhost:3000'
        }
    }
});
