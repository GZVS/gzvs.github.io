# GZVS — Personal developer portfolio

The personal homepage of **Georgios Zacharidis (GZVS)**, designed for **https://gzvs.github.io/**.

A responsive, buildless website with an introduction, a compact carousel of public GitHub repositories, Microsoft development skills, GitHub links, and an optional PayPal support link. There are no forms, analytics, cookies, JavaScript dependencies, or application servers. Fonts and images are included locally.

## Automatic repository carousel

`repositories.js` loads GZVS's public repositories directly from GitHub on each page visit. Each card shows the repository name and its GitHub description, links to the repository, and follows newest-created-first order. Public forks and this homepage repository are included. Private repositories are never requested.

To add a project, create a public repository on GitHub and set its **Description** in the repository's **About** panel. No homepage edit or deployment is needed. Description changes, renamed repositories, and removed or newly private repositories are reflected the next time the page loads. A missing description is shown as “No description yet.”

Previous/next arrows, keyboard left/right arrows, and touch scrolling move through the cards. Controls disable at the ends; there is no automatic rotation. Pagination supports more than 100 repositories. If GitHub is unavailable or its public API request limit is reached, the page offers a retry button and keeps the full GitHub repository-list link available.

No access token is embedded in the page. The browser makes unauthenticated requests to `https://api.github.com/users/GZVS/repos`, using GitHub's public API. Its availability and rate limits apply:

- https://docs.github.com/en/rest/repos/repos#list-repositories-for-a-user
- https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api

## Publish on GitHub Pages

1. Create a **public** repository named **gzvs.github.io** under the **GZVS** account. Initialize it with a README so the `main` branch exists.
2. Copy this folder’s **contents** directly into that repository. `index.html`, `styles.css`, `repositories.js`, and `assets/` must appear at the repository root. Replace the initial README with this one.
3. Commit and push to `main` using GitHub Desktop.
4. Open the repository’s **Settings → Pages**.
5. Under **Build and deployment**, choose **Deploy from a branch**.
6. Choose **main** and **/(root)**, then click **Save**.
7. After deployment completes, open **https://gzvs.github.io/**. GitHub notes that publication can take up to 10 minutes.

The empty `.nojekyll` file tells GitHub to publish the static files directly. It must be included in the repository.

Official guides:
- https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site
- https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## Preview and edit

The published GitHub Pages site is the simplest preview. For a local preview, serve this folder over HTTP (for example, `python -m http.server 8000`) and visit `http://localhost:8000`. JavaScript modules need HTTP rather than a `file://` preview. No installation or build is required.

- **Introduction, sections, and static links:** edit `index.html`.
- **Repository names and descriptions:** edit them on GitHub; the carousel fills automatically.
- **Carousel loading and controls:** `repositories.js`.
- **Colours, spacing, fonts, and responsive layouts:** edit `styles.css`.
- **Portrait:** replace `assets/georgios-github-avatar.png` and update its image dimensions if needed.
- **Site icon:** `assets/favicon.svg`.
- **Social sharing title and description:** the metadata near the top of `index.html`.

After editing, **commit and push** in GitHub Desktop. GitHub Pages deploys changes automatically from the configured source branch.

## Accessibility and compatibility

Semantic headings and landmarks, a keyboard skip link, visible keyboard focus, accessible link text, descriptive image alternatives, and reduced-motion support are included. The layout adapts to desktop, tablet, and phone widths. The repository carousel uses JavaScript; the rest of the page and the link to the full GitHub repository list remain available without it.

## Assets and privacy

The portrait was retrieved from the developer’s existing public GitHub avatar and is included unchanged. TinyShield’s icon comes from the developer’s existing project. Those images retain their respective owners’ rights.

The locally hosted Inter font is distributed under the SIL Open Font License; its notice is in `assets/fonts/OFL.txt`. Site code is MIT licensed; see `LICENSE`.

This site does not include analytics or visitor data collection code. Loading the repository carousel sends a public API request from the visitor's browser to GitHub. GitHub Pages, GitHub's API, and external destinations such as GitHub and PayPal handle their own hosting and service data.
