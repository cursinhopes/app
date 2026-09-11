import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
    root: './www',
    build: {
        outDir: '../dist',
        emptyOutDir: true
    },
    css: {
        preprocessorOptions: {
            scss: {
                quietDeps: true,
                includePaths: [path.resolve(import.meta.dirname, 'node_modules')],
            }
        }
    }
});