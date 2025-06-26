import { defineConfig } from 'vite';

export default defineConfig({
    root: 'frontend/src/views',
    build: {
        outDir: '../../../dist',
        emptyOutDir: true,
        rollupOptions: {
            input: {
                main: 'frontend/src/views/index.html',
                characters: 'frontend/src/views/characters.html',
                marvelSnap: 'frontend/src/views/marvelSnap.html'
            }
        }
    },
    publicDir: '../../../frontend/public',
    server: {
        proxy: {
            '/database': 'http://localhost:3000',
            '/api/characters': 'http://localhost:3000'
        }
    }
});
