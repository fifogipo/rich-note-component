import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts'

export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, 'src/rich-note/rich-note.component.ts'),
            name: 'RichNote',
            fileName: (format) => `rich-note.${format}.js`,
            formats: ['es']
        },
    },
    plugins: [dts()]
});
