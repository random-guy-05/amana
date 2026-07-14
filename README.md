# Arnav Mana — Personal Site

Dark editorial research portfolio for Arnav Mana (AI × Health).

## Stack

- Vite + React + TypeScript
- [Motion](https://motion.dev) for scroll and entrance animation

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Deploy (Cloudflare Pages)

```bash
npx wrangler login
npm run deploy
npx wrangler pages secret put BASIC_PASS --project-name arnav-mana
# optional:
npx wrangler pages secret put BASIC_USER --project-name arnav-mana
```

Password gate uses HTTP Basic Auth via `functions/_middleware.js`.  
Default username: `arnav`. Set `BASIC_PASS` (required) and optional `BASIC_USER`.

## Content

Edit `src/data/content.ts` for copy, research items, and contact details.  
Résumé PDF lives at `public/Arnav-Mana-Resume-Summer-2026.pdf`.
