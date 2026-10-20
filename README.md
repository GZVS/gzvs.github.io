# GZVS — Orbital Studio

Personal homepage for Georgios Zacharidis, a Dynamics 365 Finance & Operations developer building browser extensions, Windows apps, and iOS apps.

Live: https://gzvs.github.io/

## Design and interactions

- Dark orbital design, original portrait, pale-cyan details and amber action button.
- Layered portrait, orbit trails and software-category links with gentle floating motion, desktop pointer parallax and scroll movement.
- A Motion control saves the visitor’s preference locally. The operating system’s reduced-motion preference always disables decorative animation. No content depends on animation.
- Compact carousel of public, owned repositories fetched from the GitHub public API on each visit. All result pages are read; titles, descriptions and repository links come from GitHub. New public repositories appear automatically. No token or private-repository access is used.
- Previous/next buttons, arrow-key control on the focused carousel, touch scrolling, loading/empty/error states and retry. GitHub rate limiting can temporarily show the fallback link.
- GitHub, LinkedIn and support links. Responsive layout with text before portrait on small screens.

## Files

- `index.html`: semantic page, real portrait, navigation and controls.
- `styles.css`: design tokens, responsive layout, focus states and motion styling.
- `motion.js`: motion preference, gentle pointer/scroll transforms and section entry.
- `repositories.js`: public repository pagination/validation and native carousel.
- `assets/georgios-github-avatar.png`: original profile photo, unchanged.
- `assets/orbital-background.webp`, `orbital-trails.webp`, `gzvs-wordmark.webp`: production art derived from the approved concept.
- `assets/fonts`: self-hosted Inter and DM Serif Display; respective font licenses included.

No build step, framework, analytics, tracking, cookies or third-party font requests. The only application data request is to api.github.com. Local browser storage is used only for the motion preference.

## Publishing

GitHub Pages publishes the root of the `main` branch. `.nojekyll` keeps static files served directly. Open https://gzvs.github.io/ after deployment; a hard refresh may help if an older stylesheet is cached.

To preview locally with Python installed, run `python -m http.server 8080` from the repository root, then open http://localhost:8080/.
