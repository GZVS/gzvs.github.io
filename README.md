# GZVS — Georgios Zacharidis

The personal profile at https://gzvs.github.io/: Dynamics 365 Finance & Operations, browser extensions, Windows apps, and iOS experiences.

## Design and motion

A light spatial portfolio with a floating developer illustration, pointer-responsive perspective, scroll-driven depth, a live CSS 3D wireframe cube, and sections entering from different directions. Motion never changes the normal scrolling or hides navigation. The Motion switch pauses decorative animation, parallax, entrance transitions, and smooth carousel movement. The preference is stored locally in the visitor's browser when storage is available. A system preference for reduced motion starts the page with motion off. The visitor can explicitly enable motion with the switch.

On narrow screens the content stacks and pointer parallax is disabled. Text and links remain available when JavaScript is disabled; the GitHub list has a direct-link fallback.

## Automatic GitHub carousel

The carousel requests GZVS's public, owned repositories from GitHub on each visit, newest-created first. It renders the actual name and description and links directly to each public repository. Public forks and this homepage repository are included. No access token is embedded, and private repositories are not requested. Pagination handles more than 100 repositories. Empty lists, missing descriptions, timeouts and API errors have visible fallback states, and the complete GitHub repository list is always linked.

Create a public repository and fill in its Description in GitHub's About panel: no edit to this website or redeployment is needed. Name, description, visibility and removal changes appear on the next visit, subject to GitHub API availability. The browser uses unauthenticated public API requests, so GitHub's request limits apply.

- API documentation: https://docs.github.com/en/rest/repos/repos#list-repositories-for-a-user
- Limits: https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api

## Files and updates

- index.html: profile copy, navigation, app categories and confirmed social links.
- styles.css: design tokens, layouts, 3D geometry, animations and responsive styles.
- motion.js: motion preference, pointer/scroll transforms and entrance observers.
- repositories.js: public API loading, safe repository links and carousel controls.
- assets/developer-dimensions.webp: transparent hero artwork generated for this portfolio.
- assets/fonts/: locally hosted Inter and its SIL Open Font License.
- 404.html: custom missing-page screen.

The current LinkedIn link was confirmed by the owner: https://gr.linkedin.com/in/zacharidis.

For local preview, serve this folder over HTTP, for example with Python's http.server on port 8000. No dependency installation, framework or build step is required. JavaScript modules need HTTP rather than a file URL.

Commit changes to the main branch. GitHub Pages is configured for Deploy from a branch, main, /(root). Keep index.html, styles.css, motion.js, repositories.js and assets directly at the repository root. Keep the empty .nojekyll file so GitHub publishes the files directly.

Official publishing guide: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## Privacy and licenses

There are no accounts, forms or analytics. Motion preference uses browser-local storage. Loading the carousel sends a public API request from the visitor's browser to GitHub. Hosting, API and outbound destinations handle their own service data.

Site code is MIT licensed; see LICENSE. The font has its own included SIL license. The original public GitHub portrait remains available for social metadata; existing image assets retain their owners' rights. The decorative hero illustration is separate from the code-native page text, links and controls.
