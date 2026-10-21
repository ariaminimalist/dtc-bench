# OpenNext Worker deployment

This branch is the OpenNext arm of the **dtc-bench** comparison. The vinext arm is
on `bench/vinext`. Do not add vinext to this branch.

## Cloudflare Workers Builds

Connect GitHub repository `ariaminimalist/dtc-bench` and production branch
`bench/opennext` to a Worker named `dtc-bench-opennext`.

- Root directory: `apps/storefront` (pnpm monorepo; lockfile is at the repo root)
- Node.js: 24
- Install: `pnpm install --frozen-lockfile` from repository root when configurable
- Build command: `pnpm run build:worker`
- Deploy command: `pnpm exec opennextjs-cloudflare deploy`
- Working directory for build/deploy: `apps/storefront`

The deployment command expects `.open-next/worker.js` and
`.open-next/assets` from the build command; it deliberately does not rebuild.

In **Build variables and secrets**, set:
- `NEXT_PUBLIC_MEDUSA_BACKEND_URL`: reachable HTTPS Medusa backend
- `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY`: publishable key from that backend
- `NEXT_PUBLIC_DEFAULT_REGION`: an actual enabled country, e.g. `us`
- `NEXT_PUBLIC_BASE_URL`: final OpenNext Workers URL

Also configure those values as Worker **runtime variables** wherever required.
Build-time `NEXT_PUBLIC_*` values are embedded in the Next.js client bundle,
so changing runtime variables alone does not update them.

Use the same Medusa backend, dataset, region, cache policies and traffic for the
vinext benchmark. Add both Worker origins to the backend's allowed storefront
and authentication CORS settings.

No production payment testing is required to validate the Worker. Start by
verifying /, /us, /us/store, and a real /us/products/<handle> path. Only use
test payment credentials and test customer/cart data for checkout tests.

## Local validation

From repository root:

```sh
pnpm install --frozen-lockfile
pnpm --filter @dtc/storefront run build:worker
```

To preview with Workers runtime from apps/storefront:

```sh
pnpm run preview:worker
```

To deploy manually (not needed with Workers Builds):

```sh
pnpm run deploy:worker
```

Worker CPU metrics are collected after live deployment, not from CI builds.
