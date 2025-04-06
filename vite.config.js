import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'RichNoteComponent',
      fileName: 'rich-note-component',
      formats: ['es'],
    },
    rollupOptions: {
      external: [/^lit/],
    },
  },
});
