import { defineConfig } from "vite";
import { resolve } from "path";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/rich-note/rich-note.component.ts"),
      formats: ["es"],
    },
    rollupOptions: {
      external: [/^lit/],
    },
  },
});
