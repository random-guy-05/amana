# arnavmana.me

React + Vite portfolio for `arnavmana.me`.

## Commands

- `npm install`
- `npm run dev`
- `npm run build`
- `npm run test`

## Password protection

The client does not contain a password or a password hash. The site includes a
Cloudflare Pages middleware at `functions/_middleware.ts` that enforces HTTP
Basic authentication before any portfolio asset is sent to a visitor.

Deploy this site to Cloudflare Pages, set `PORTFOLIO_PASSWORD` as an encrypted
production environment variable, and optionally set `PORTFOLIO_USERNAME`
(defaults to `arnav`). Do not deploy the protected portfolio to GitHub Pages:
static hosting cannot enforce a secret password.
