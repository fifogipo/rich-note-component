import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, 'src/rich-note/rich-note.component.ts'),
            name: 'RichNote',
            fileName: (format) => `rich-note.${format}.js`,
            formats: ['es']
        },
    }
});
