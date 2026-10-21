# Vinext Cloudflare Workers benchmark

This is a **separate benchmark** on branch `bench/vinext`. Do not replace the WIIDZ production Worker.

## Preparation

The Vinext bootstrap was performed using the official `vinext init --platform=cloudflare` command. It adds `build:vinext` and `deploy:vinext` while preserving the original Next.js `build` script.

The Worker is named `dtc-bench-vinext` in `cloudflare.config.ts`. This benchmark uses no additional Vinext data/CDN caching or Cloudflare image optimization to keep the first deployment simple.

## Cloudflare Workers Builds (dashboard Git integration)

Create a **new Worker** (do not overwrite an existing OpenNext Worker), connect `ariaminimalist/dtc-bench`, and use:

| Setting | Value |
| --- | --- |
| Branch | `bench/vinext` |
| Root directory | `/` (repository root) |
| Build command | `pnpm --filter @dtc/storefront run build:vinext` |
| Deploy command | `pnpm --filter @dtc/storefront exec vinext-cloudflare deploy --skip-build` |
| Worker name | `dtc-bench-vinext` (from `apps/storefront/cloudflare.config.ts`) |

**Do not use** the default `npx wrangler deploy` for this project. The Vinext output uses the `cf`/Cloudflare Vite plugin toolchain.

Use the latest Cloudflare build image, Node 24, and pnpm 10.11.1. Cloudflare's Workers Builds automatically creates an API token when connecting a repository; the `cf` CLI may additionally require `CLOUDFLARE_ACCOUNT_ID` in build variables if account discovery is ambiguous.

## Build and runtime configuration

Set **real**, benchmark-specific values in Cloudflare build variables:

- `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY` – publishable key from the existing Medusa backend.
- `NEXT_PUBLIC_MEDUSA_BACKEND_URL` – publicly reachable **HTTPS** URL of that backend.
- `NEXT_PUBLIC_DEFAULT_REGION` – country code, e.g. `us`.
- `NEXT_PUBLIC_BASE_URL` – the final Worker URL, initially `https://dtc-bench-vinext.<your-workers-subdomain>.workers.dev`.
- `NODE_VERSION` – `24` if not using a default Node 24 build image.

Configure the same application variables for Worker runtime in **Settings > Variables and Secrets** if code running at request time needs to read them; build-time variables alone do not create runtime bindings.

On the Medusa backend, permit the benchmark URL in Store CORS and Auth CORS. **Do not replace** existing production allowed origins.

## Validation

After deployment, test the homepage, product listing/detail, cart, checkout, customer account/auth, and image loading. Verify cross-origin requests and the presence of the publishable key before comparing PageSpeed, TTFB, and real-user performance. Compare the same catalog, routes, cache settings, and backend between OpenNext and Vinext.

The successful GitHub Actions build only proves CI compilation; it is not proof that the Worker deployed or that runtime flows pass.

Official documentation: https://vinext.dev/docs/deploying/cloudflare and https://developers.cloudflare.com/workers/ci-cd/builds/configuration/
