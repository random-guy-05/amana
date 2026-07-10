# arnavmana.me

React + Vite portfolio for `arnavmana.me`.

## Commands

- `npm install`
- `npm run dev`
- `npm run build`
- `npm run test`

## Password protection and Cloudflare Pages

`functions/_middleware.js` protects every request with a password-only gate
before the portfolio's HTML, JavaScript, images, or research content are
served. The password exists only in Cloudflare's `SITE_PASSWORD` secret; it is
never bundled into the client or committed to Git.

To publish it securely with Cloudflare Pages:

1. Keep the Pages project connected to `random-guy-05/amana`, with `main` as
   the production branch, build command `npm run build`, and output directory
   `dist`.
2. In **Settings > Variables and Secrets**, keep `SITE_PASSWORD` as an
   encrypted production secret. Do not put the password in `.env`, source
   files, or Git. Set the same secret for preview deployments if they should
   also be protected.
3. Keep `arnavmana.me` attached as the Pages custom domain. Cloudflare
   automatically deploys new commits pushed to `main`.

For local Pages testing, copy `.dev.vars.example` to `.dev.vars`, set a local
password, run `npm run build`, then run `npx wrangler pages dev dist`.

## Edit and redeploy

1. Clone the repository once, then enter it:

   ```bash
   git clone https://github.com/random-guy-05/amana.git
   cd amana
   npm install
   ```

2. Start the local preview while editing:

   ```bash
   npm run dev
   ```

   Open the localhost URL Vite prints. Do not open `index.html` directly with
   a `file:///` URL; Vite needs to compile the React and TypeScript files.

3. Before publishing, run the checks:

   ```bash
   npm run build
   npm test
   ```

4. Commit and push to the production branch:

   ```bash
   git add .
   git commit -m "Describe the change"
   git push origin main
   ```

5. In Cloudflare, open **Workers & Pages > amana > Deployments**. Cloudflare
   will show the new commit, build status, and deployment URL. Once the status
   is successful, the change is live at `https://arnavmana.me`.

To change the password, edit the encrypted `SITE_PASSWORD` value in Cloudflare
under **Settings > Variables and Secrets**. Do not change it in the codebase.
