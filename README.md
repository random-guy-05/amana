# arnavmana.me

React + Vite portfolio for `arnavmana.me`.

## Commands

- `npm install`
- `npm run dev`
- `npm run build`
- `npm run test`

## Password protection

The client does not contain a password or password hash. Since the production
domain is hosted on Vercel, enable password protection in the Vercel project:
Project Settings > Deployment Protection > Password Protection, then select
All Deployments so `arnavmana.me` is included.

Vercel applies the password challenge before any HTML, JavaScript, or research
content is sent to the visitor. This requires Vercel Password Protection, which
is available on Enterprise or through Vercel's Advanced Deployment Protection
add-on for Pro plans. A static client-side password screen is not secure and is
intentionally not included.
