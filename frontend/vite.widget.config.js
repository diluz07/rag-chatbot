import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    define: {
        'process.env': {} // Prevent crashes if libs access process.env
    },
    build: {
        outDir: 'dist-widget',
        emptyOutDir: true,
        lib: {
            entry: 'src/widget.jsx',
            name: 'AmazoniaChatWidget',
            fileName: (format) => `chat-widget.${format}.js`,
            formats: ['umd'] // UMD is good for script tags
        },
        rollupOptions: {
            // We bundle React inside so the host site doesn't need it
            external: [],
        },
        cssCodeSplit: false, // Force CSS into a single file (usually style.css)
        minify: false, // Avoid esbuild minification crash
    }
});
