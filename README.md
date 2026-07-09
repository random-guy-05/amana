# arnavmana.me

React + Vite portfolio for `arnavmana.me`.

## Commands

- `npm install`
- `npm run dev`
- `npm run build`
- `npm run test`

## Password protection and Cloudflare Pages

`functions/_middleware.js` protects every request with HTTP Basic
Authentication before the portfolio's HTML, JavaScript, images, or research
content are served. The password exists only in Cloudflare's `SITE_PASSWORD`
secret; it is never bundled into the client or committed to Git.

To publish it securely with Cloudflare Pages:

1. Create a Pages project connected to `random-guy-05/amana`, with `main` as
   the production branch, build command `npm run build`, and output directory
   `dist`.
2. In **Settings > Variables and Secrets**, add `SITE_PASSWORD` as an
   encrypted production secret. Use a long, unique password and set the same
   secret for preview deployments if they should also be protected.
3. Add `arnavmana.me` as the Pages project's custom domain and complete the
   DNS change Cloudflare provides. Remove the Vercel domain assignment only
   after the Cloudflare deployment is ready.

For local Pages testing, copy `.dev.vars.example` to `.dev.vars`, set a local
password, run `npm run build`, then run `npx wrangler pages dev dist`.
