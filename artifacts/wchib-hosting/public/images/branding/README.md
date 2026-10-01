Brand marks are authored as local assets; no third-party logos are used.

The site logo lives at `src/assets/website-icon.webp` and is rendered by
`src/components/brand-mark.tsx` (header, footer, About page, 404 page). It is
imported as a module rather than referenced from `public/` so the configured
Vite `base` path is applied correctly.

Separate copies still exist for browser and OS surfaces, which cannot use WebP:

- `public/wchib-icon.svg` — browser tab favicon
- `public/apple-icon.svg` — iOS home-screen icon (180x180 PNG preferred)
- `public/images/social/wchib-og.svg` — social share card, 1200x630
