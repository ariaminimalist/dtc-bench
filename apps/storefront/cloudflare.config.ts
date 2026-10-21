import { bindings, defineConfig, defineWorker } from "cf/config";

// Keep dashboard runtime variables, Worker URLs, and custom domain represented here.
// cf deploy treats this file as the source of truth in non-interactive builds.
export default defineConfig({
  worker: defineWorker({
    name: "dtc-bench-vinext",
    entrypoint: "vinext/server/fetch-handler",
    compatibilityDate: "2026-10-21",
    compatibilityFlags: ["nodejs_compat"],
    workersDev: true,
    previewUrls: true,
    domains: ["vinext.glam.pp.ua"],
    assets: {
      htmlHandling: "none",
      notFoundHandling: "none",
      runWorkerFirst: ["/*", "!/_next/static/*", "!/*/_next/static/*"],
    },
    env: {
      ASSETS: bindings.assets(),
      NEXT_PUBLIC_BASE_URL: bindings.text("https://vinext.glam.pp.ua"),
      NEXT_PUBLIC_DEFAULT_REGION: bindings.text("us"),
      NEXT_PUBLIC_MEDUSA_BACKEND_URL: bindings.text("https://api.glam.pp.ua"),
    },
  }),
});
