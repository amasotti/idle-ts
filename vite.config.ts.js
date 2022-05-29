var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
  throw new Error('Dynamic require of "' + x + '" is not supported');
});

// vite.config.ts
import { defineConfig } from "vite";
var path = __require("path");
var vite_config_default = defineConfig({
  build: {
    lib: {
      entry: path.resolve("/home/antonio/halb-personal/idle-ts", "lib/IdleTs.ts"),
      name: "idle-ts",
      fileName: (format) => `idle-ts.${format}.js`
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJylcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gICAgYnVpbGQ6IHtcbiAgICAgICAgbGliOiB7XG4gICAgICAgICAgICBlbnRyeTogcGF0aC5yZXNvbHZlKFwiL2hvbWUvYW50b25pby9oYWxiLXBlcnNvbmFsL2lkbGUtdHNcIiwgJ2xpYi9JZGxlVHMudHMnKSxcbiAgICAgICAgICAgIG5hbWU6ICdpZGxlLXRzJyxcbiAgICAgICAgICAgIGZpbGVOYW1lOiAoZm9ybWF0KSA9PiBgaWRsZS10cy4ke2Zvcm1hdH0uanNgXG4gICAgICAgIH1cbiAgICB9XG59KSJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7OztBQUNBO0FBREEsSUFBTSxPQUFPLFVBQVE7QUFHckIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDeEIsT0FBTztBQUFBLElBQ0gsS0FBSztBQUFBLE1BQ0QsT0FBTyxLQUFLLFFBQVEsdUNBQXVDLGVBQWU7QUFBQSxNQUMxRSxNQUFNO0FBQUEsTUFDTixVQUFVLENBQUMsV0FBVyxXQUFXO0FBQUEsSUFDckM7QUFBQSxFQUNKO0FBQ0osQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
