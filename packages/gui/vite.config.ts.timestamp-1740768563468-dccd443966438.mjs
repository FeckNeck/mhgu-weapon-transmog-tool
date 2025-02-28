// vite.config.ts
import { fileURLToPath, URL } from "node:url";
import vue from "file:///C:/Users/FeckNeck/dev/mhgu-weapon-transmog-tool/node_modules/.pnpm/@vitejs+plugin-vue@5.2.1_vite@4.5.9_@types+node@22.13.5__vue@3.5.13_typescript@5.7.3_/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { defineConfig } from "file:///C:/Users/FeckNeck/dev/mhgu-weapon-transmog-tool/node_modules/.pnpm/vite@4.5.9_@types+node@22.13.5/node_modules/vite/dist/node/index.js";
import vueDevTools from "file:///C:/Users/FeckNeck/dev/mhgu-weapon-transmog-tool/node_modules/.pnpm/vite-plugin-vue-devtools@7.7.2_rollup@3.29.5_vite@4.5.9_@types+node@22.13.5__vue@3.5.13_typescript@5.7.3_/node_modules/vite-plugin-vue-devtools/dist/vite.mjs";
var __vite_injected_original_import_meta_url = "file:///C:/Users/FeckNeck/dev/mhgu-weapon-transmog-tool/packages/gui/vite.config.ts";
var vite_config_default = defineConfig(async () => ({
  plugins: [vue(), vueDevTools()],
  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  //
  // 1. prevent vite from obscuring rust errors
  clearScreen: false,
  // 2. tauri expects a fixed port, fail if that port is not available
  server: {
    port: 1420,
    strictPort: true
  },
  // 3. to make use of `TAURI_DEBUG` and other env variables
  // https://tauri.studio/v1/api/config#buildconfig.beforedevcommand
  envPrefix: ["VITE_", "TAURI_"],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  }
}));
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxGZWNrTmVja1xcXFxkZXZcXFxcbWhndS13ZWFwb24tdHJhbnNtb2ctdG9vbFxcXFxwYWNrYWdlc1xcXFxndWlcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXEZlY2tOZWNrXFxcXGRldlxcXFxtaGd1LXdlYXBvbi10cmFuc21vZy10b29sXFxcXHBhY2thZ2VzXFxcXGd1aVxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvRmVja05lY2svZGV2L21oZ3Utd2VhcG9uLXRyYW5zbW9nLXRvb2wvcGFja2FnZXMvZ3VpL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSAnbm9kZTp1cmwnO1xyXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSc7XHJcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnO1xyXG5pbXBvcnQgdnVlRGV2VG9vbHMgZnJvbSAndml0ZS1wbHVnaW4tdnVlLWRldnRvb2xzJztcclxuXHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyhhc3luYyAoKSA9PiAoe1xyXG4gIHBsdWdpbnM6IFt2dWUoKSwgdnVlRGV2VG9vbHMoKV0sXHJcblxyXG4gIC8vIFZpdGUgb3B0aW9ucyB0YWlsb3JlZCBmb3IgVGF1cmkgZGV2ZWxvcG1lbnQgYW5kIG9ubHkgYXBwbGllZCBpbiBgdGF1cmkgZGV2YCBvciBgdGF1cmkgYnVpbGRgXHJcbiAgLy9cclxuICAvLyAxLiBwcmV2ZW50IHZpdGUgZnJvbSBvYnNjdXJpbmcgcnVzdCBlcnJvcnNcclxuICBjbGVhclNjcmVlbjogZmFsc2UsXHJcbiAgLy8gMi4gdGF1cmkgZXhwZWN0cyBhIGZpeGVkIHBvcnQsIGZhaWwgaWYgdGhhdCBwb3J0IGlzIG5vdCBhdmFpbGFibGVcclxuICBzZXJ2ZXI6IHtcclxuICAgIHBvcnQ6IDE0MjAsXHJcbiAgICBzdHJpY3RQb3J0OiB0cnVlLFxyXG4gIH0sXHJcbiAgLy8gMy4gdG8gbWFrZSB1c2Ugb2YgYFRBVVJJX0RFQlVHYCBhbmQgb3RoZXIgZW52IHZhcmlhYmxlc1xyXG4gIC8vIGh0dHBzOi8vdGF1cmkuc3R1ZGlvL3YxL2FwaS9jb25maWcjYnVpbGRjb25maWcuYmVmb3JlZGV2Y29tbWFuZFxyXG4gIGVudlByZWZpeDogWydWSVRFXycsICdUQVVSSV8nXSxcclxuXHJcbiAgcmVzb2x2ZToge1xyXG4gICAgYWxpYXM6IHtcclxuICAgICAgJ0AnOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vc3JjJywgaW1wb3J0Lm1ldGEudXJsKSksXHJcbiAgICB9LFxyXG4gIH0sXHJcbn0pKTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFvWCxTQUFTLGVBQWUsV0FBVztBQUN2WixPQUFPLFNBQVM7QUFDaEIsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxpQkFBaUI7QUFIcU4sSUFBTSwyQ0FBMkM7QUFNOVIsSUFBTyxzQkFBUSxhQUFhLGFBQWE7QUFBQSxFQUN2QyxTQUFTLENBQUMsSUFBSSxHQUFHLFlBQVksQ0FBQztBQUFBO0FBQUE7QUFBQTtBQUFBLEVBSzlCLGFBQWE7QUFBQTtBQUFBLEVBRWIsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sWUFBWTtBQUFBLEVBQ2Q7QUFBQTtBQUFBO0FBQUEsRUFHQSxXQUFXLENBQUMsU0FBUyxRQUFRO0FBQUEsRUFFN0IsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxjQUFjLElBQUksSUFBSSxTQUFTLHdDQUFlLENBQUM7QUFBQSxJQUN0RDtBQUFBLEVBQ0Y7QUFDRixFQUFFOyIsCiAgIm5hbWVzIjogW10KfQo=
