# GZVS — Split Studio

Personal homepage for Georgios Zacharidis, a Dynamics 365 Finance & Operations developer building browser extensions, Windows apps, and iOS apps.

Live: https://gzvs.github.io/

## Design and interactions

- Split Studio layout: a sticky profile column with the original portrait, GZVS branding, social links, and technology stack. Short desktop screens can scroll the profile column independently so every link remains reachable.
- Spacious main column with the two-line headline, gold action button, software categories, and open repository rows separated by fine cyan rules.
- Matching space artwork, self-hosted Inter and DM Serif Display fonts, and responsive layouts that stack the profile above the work on phones and tablets.
- A Motion control saves the visitor’s preference locally and enables gentle portrait movement. The operating system’s reduced-motion preference always wins; no content depends on animation.
- Public, owned repositories fetched from GitHub on each visit. Pagination is followed, and titles, descriptions and canonical repository links come from the live public API. New public repositories appear automatically. No token or private-repository access is used.
- Loading, empty, and error states with a retry button and direct GitHub fallback. GitHub API rate limits can temporarily trigger the fallback.
- Keyboard-visible focus, skip-to-content navigation, descriptive links, and accessible motion and loading states.

## Files

- `index.html`: semantic profile, page content, navigation, and controls.
- `styles.css`: design tokens, split layout, responsive styles, focus states, and decorative animation.
- `motion.js`: persisted motion preference and reduced-motion handling.
- `repositories.js`: public repository pagination, validation, and vertical row rendering.
- `assets/georgios-github-avatar.png`: original profile photo, unchanged.
- `assets/split-studio-space.webp`: space artwork created for the approved layout.
- `assets/gzvs-wordmark.webp`: existing GZVS wordmark.
- `assets/fonts`: self-hosted Inter and DM Serif Display, with their font licenses.

No build step, framework, analytics, tracking, cookies, or third-party font requests. The only application data request is to api.github.com. Local browser storage is used only for the motion preference.

## Publishing

GitHub Pages publishes the root of the `main` branch. `.nojekyll` keeps static files served directly. CSS and module version parameters ensure the new layout loads after deployment.

To preview locally with Python installed, run `python -m http.server 8080` from the repository root, then open http://localhost:8080/.
