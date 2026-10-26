const OWNER = 'GZVS';

// Only public, owned repositories with a canonical GitHub link may be rendered.
export function normalizeRepository(repo, owner = OWNER) {
  if (!repo || repo.private !== false ||
      repo.owner?.login?.toLowerCase() !== owner.toLowerCase() ||
      typeof repo.name !== 'string' || !repo.name.trim()) return null;

  try {
    const url = new URL(repo.html_url);
    const expectedPath = `/${owner}/${encodeURIComponent(repo.name)}`;
    if (url.protocol !== 'https:' || url.hostname !== 'github.com' ||
        url.username || url.password || url.search || url.hash ||
        url.pathname.toLowerCase() !== expectedPath.toLowerCase()) return null;
    return {
      name: repo.name,
      description: typeof repo.description === 'string' && repo.description.trim()
        ? repo.description.trim() : 'No description yet.',
      url: url.href,
    };
  } catch {
    return null;
  }
}

export async function fetchPublicRepositories({ fetcher = globalThis.fetch, owner = OWNER, signal } = {}) {
  const repositories = new Map();
  let page = 1;
  let morePages = true;

  while (morePages) {
    const url = new URL(`https://api.github.com/users/${encodeURIComponent(owner)}/repos`);
    url.search = new URLSearchParams({ type: 'owner', sort: 'created', direction: 'desc', per_page: '100', page: String(page) });
    const response = await fetcher(url.href, {
      headers: { Accept: 'application/vnd.github+json' },
      credentials: 'omit', cache: 'no-store', signal,
    });
    if (!response.ok) throw new Error(`GitHub returned ${response.status}`);
    const batch = await response.json();
    if (!Array.isArray(batch)) throw new Error('Invalid GitHub repository response');

    for (const rawRepository of batch) {
      const repository = normalizeRepository(rawRepository, owner);
      if (repository) repositories.set(repository.url.toLowerCase(), repository);
    }
    morePages = /;\s*rel="next"/.test(response.headers.get('link') || '');
    page += 1;
  }
  return [...repositories.values()];
}

// Icons identify known repository types; every title, description and URL stays live GitHub data.
function makeIcon(name, document) {
  const icon = document.createElement('span');
  icon.className = 'repository-icon';
  icon.setAttribute('aria-hidden', 'true');
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  const lower = name.toLowerCase();
  if (lower === 'tinyshield' || /extension/.test(lower) && !/polic/.test(lower)) {
    icon.classList.add('icon-extension');
    path.setAttribute('d', 'M8 3h3a3 3 0 1 1 6 0h4v6a3 3 0 1 0 0 6v6h-6a3 3 0 1 0-6 0H3v-6a3 3 0 1 1 0-6V3z');
    path.setAttribute('fill', 'currentColor');
    path.setAttribute('stroke', 'none');
  } else if (/polic|docs|readme/.test(lower)) {
    icon.classList.add('icon-document');
    path.setAttribute('d', 'M6 2h8l5 5v15H5V2h1m8 0v6h5M8 12h8m-8 4h8');
  } else if (/github[.]io$/.test(lower)) {
    path.setAttribute('d', 'M4 3h16v13H4zM8 21h8m-4-5v5M2 16h20');
  } else {
    path.setAttribute('d', 'm7 6-6 6 6 6m10-12 6 6-6 6M14 3l-4 18');
  }
  svg.append(path);
  icon.append(svg);
  return icon;
}

function makeRow(repository, document) {
  const item = document.createElement('li');
  item.className = 'repository-row';
  const link = document.createElement('a');
  link.href = repository.url;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.title = repository.description;
  const heading = document.createElement('h3');
  heading.textContent = repository.name;
  const description = document.createElement('p');
  description.textContent = repository.description;
  const details = document.createElement('div');
  details.className = 'repository-details';
  details.append(heading, description);
  const arrow = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  arrow.setAttribute('class', 'icon outward');
  arrow.setAttribute('aria-hidden', 'true');
  const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
  use.setAttribute('href', '#arrow-up-right');
  arrow.append(use);
  link.append(makeIcon(repository.name, document), details, arrow);
  item.append(link);
  return item;
}

function initializeRepositories() {
  const list = document.getElementById('repos-list');
  const status = document.getElementById('repos-status');
  const retry = document.getElementById('repos-retry');
  if (!list || !status || !retry) return;

  let loading = false;
  const load = async () => {
    if (loading) return;
    loading = true;
    retry.hidden = true;
    list.setAttribute('aria-busy', 'true');
    status.textContent = 'Loading repositories…';
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
      const repositories = await fetchPublicRepositories({ signal: controller.signal });
      list.replaceChildren(...repositories.map(repository => makeRow(repository, document)));
      list.hidden = repositories.length === 0;
      status.textContent = repositories.length
        ? `${repositories.length} public ${repositories.length === 1 ? 'repository' : 'repositories'}`
        : 'No public repositories yet. Check back soon.';
    } catch {
      list.hidden = true;
      status.replaceChildren(document.createTextNode('Repositories are unavailable right now. '));
      const fallback = document.createElement('a');
      fallback.href = 'https://github.com/GZVS?tab=repositories';
      fallback.target = '_blank';
      fallback.rel = 'noopener noreferrer';
      fallback.textContent = 'View them on GitHub';
      status.append(fallback, '.');
      retry.hidden = false;
    } finally {
      clearTimeout(timeout);
      list.setAttribute('aria-busy', 'false');
      loading = false;
    }
  };
  retry.addEventListener('click', load);
  load();
}

if (typeof document !== 'undefined') initializeRepositories();
