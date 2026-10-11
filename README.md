# GZVS — Personal developer portfolio

The personal homepage of **Georgios Zacharidis (GZVS)**, designed for **https://gzvs.github.io/**.

A responsive, buildless website with an introduction, the published TinyShield project, Microsoft development skills, GitHub links, and an optional PayPal support link. There are no forms, analytics, cookies, JavaScript dependencies, or application servers. Fonts and images are included locally.

## Publish on GitHub Pages

1. Create a **public** repository named **gzvs.github.io** under the **GZVS** account. Initialize it with a README so the `main` branch exists.
2. Copy this folder’s **contents** directly into that repository. `index.html`, `styles.css`, and `assets/` must appear at the repository root. Replace the initial README with this one.
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

Open `index.html` in a browser to preview it. No installation or build is required.

- **Text, project links, and sections:** edit `index.html`.
- **Colours, spacing, fonts, and responsive layouts:** edit `styles.css`.
- **Portrait:** replace `assets/georgios-github-avatar.png` and update its image dimensions if needed.
- **Featured project icon:** `assets/tinyshield-icon.png`.
- **Site icon:** `assets/favicon.svg`.
- **Social sharing title and description:** the metadata near the top of `index.html`.

Keep the version and release link in the TinyShield section aligned with the release you want to feature. Version 3.1.1 is currently a pre-release; its release notes record confirmed Edge blocked-page behaviour and pending live Chrome verification.

After editing, **commit and push** in GitHub Desktop. GitHub Pages deploys changes automatically from the configured source branch.

## Accessibility and compatibility

Semantic headings and landmarks, a keyboard skip link, visible keyboard focus, accessible link text, descriptive image alternatives, and reduced-motion support are included. The layout adapts to desktop, tablet, and phone widths. The site does not depend on JavaScript.

## Assets and privacy

The portrait was retrieved from the developer’s existing public GitHub avatar and is included unchanged. TinyShield’s icon comes from the developer’s existing project. Those images retain their respective owners’ rights.

The locally hosted Inter font is distributed under the SIL Open Font License; its notice is in `assets/fonts/OFL.txt`. Site code is MIT licensed; see `LICENSE`.

This site does not include analytics or visitor data collection code. GitHub Pages and external destinations such as GitHub and PayPal handle their own hosting and service data.
