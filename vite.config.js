import { defineConfig } from 'vite';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
    root: 'frontend/src',
    build: {
        outDir: '../dist',
        emptyOutDir: true,
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'frontend/src/views/index.html'),
                characters: resolve(
                    __dirname,
                    'frontend/src/views/characters.html'
                ),
                marvelSnap: resolve(
                    __dirname,
                    'frontend/src/views/marvelSnap.html'
                )
            }
        }
    },
    publicDir: '../public',
    server: {
        proxy: {
            '/database': 'http://localhost:3000',
            '/api/characters': 'http://localhost:3000'
        }
    }
});
