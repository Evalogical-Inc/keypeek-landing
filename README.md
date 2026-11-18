# keypeek landing page

The website for [keypeek](https://github.com/Evalogical-Inc/keypeek): a read-only CLI that shows which secrets AI coding agents can read.

A single static page. No framework, no build step, no analytics, no third-party requests (fonts are self-hosted).

```
public/
  index.html      the page (copy, structure, JSON-LD)
  style.css       tokens, layout, light and dark themes
  app.js          copy buttons and the hero demo
  favicon.svg     placeholder logo, replace with the final one
  robots.txt
  fonts/          IBM Plex Sans, Sans Condensed and Mono (OFL), woff2
vercel.json       output directory, security headers and a strict Content-Security-Policy
```

## Preview

```
python3 -m http.server 4173 -d public
```

Open http://localhost:4173. To test with the real security headers, serve with the headers from `vercel.json` (the CSP blocks inline styles and scripts, so everything lives in `style.css` and `app.js`).

## Deploy

Import the repo in Vercel. It needs no framework preset: `vercel.json` already sets `outputDirectory` to `public`. Use the `*.vercel.app` address for now.

## Design notes

- Light "paper" theme with a dark terminal as the one memorable element. Dark mode follows the visitor's system setting.
- The hero demo is simulated and labelled as such. It respects `prefers-reduced-motion` (the final state shows immediately).
- The fake key in the demo is assembled in `app.js`, so no secret-shaped string sits in the page source.
- No analytics on purpose: it would contradict the "no telemetry" promise. Measure reach with GitHub Insights and public npm download counts.

## Before launch

- [ ] Replace `public/favicon.svg` and the header mark in `index.html` with the final logo
- [ ] Add a 1200x630 PNG social image and `og:image` / `twitter:image` meta tags (social sites do not accept SVG)
- [ ] After the first deploy: add `<link rel="canonical">`, a `sitemap.xml` and the `url` in the JSON-LD, using the live address
- [ ] Run a Lighthouse check on the live URL (local mobile run: 100 for accessibility, best practices and SEO)
- [ ] Then, in the main repo: website badge in the README, `homepage` in `package.json`, the repo's website field
