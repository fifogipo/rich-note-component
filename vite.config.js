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
      name: "RichNote",
      fileName: (format) => `rich-note.${format}.js`,
      formats: ["es"],
    },
    rollupOptions: {
      external: ["lit", "lit/directives/unsafe-html.js", "lit/directives/class-map.js"],
      output: {
        globals: {
          lit: "Lit",
        },
      },
    },
  },
});
