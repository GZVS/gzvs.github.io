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

export function carouselBounds(scrollLeft, viewportWidth, contentWidth) {
  const maximum = Math.max(0, contentWidth - viewportWidth);
  return { previous: scrollLeft > 4, next: scrollLeft < maximum - 4 };
}

function makeCard(repository, document) {
  const item = document.createElement('li');
  item.className = 'repository-card';
  const link = document.createElement('a');
  link.href = repository.url;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.title = repository.description;
  const heading = document.createElement('h3');
  heading.textContent = repository.name;
  const arrow = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  arrow.setAttribute('class', 'icon');
  arrow.setAttribute('viewBox', '0 0 24 24');
  arrow.setAttribute('aria-hidden', 'true');
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', 'M6 18 18 6M6 6h12v12');
  arrow.append(path);
  const top = document.createElement('div');
  top.className = 'repository-title';
  top.append(heading, arrow);
  const description = document.createElement('p');
  description.textContent = repository.description;
  link.append(top, description);
  item.append(link);
  return item;
}

function initializeCarousel() {
  const track = document.getElementById('repos-track');
  const status = document.getElementById('repos-status');
  const previous = document.getElementById('repos-prev');
  const next = document.getElementById('repos-next');
  const retry = document.getElementById('repos-retry');
  if (!track || !status || !previous || !next || !retry) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const updateControls = () => {
    const bounds = carouselBounds(track.scrollLeft, track.clientWidth, track.scrollWidth);
    previous.disabled = !bounds.previous;
    next.disabled = !bounds.next;
  };
  const move = direction => {
    const card = track.firstElementChild;
    if (!card) return;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    track.scrollBy({ left: direction * (card.getBoundingClientRect().width + gap), behavior: reducedMotion.matches ? 'auto' : 'smooth' });
  };
  previous.addEventListener('click', () => move(-1));
  next.addEventListener('click', () => move(1));
  track.addEventListener('scroll', updateControls, { passive: true });
  track.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      move(event.key === 'ArrowLeft' ? -1 : 1);
    }
  });
  if ('ResizeObserver' in window) new ResizeObserver(updateControls).observe(track);
  else window.addEventListener('resize', updateControls);

  let loading = false;
  const load = async () => {
    if (loading) return;
    loading = true;
    retry.hidden = true;
    track.setAttribute('aria-busy', 'true');
    status.textContent = 'Loading repositories…';
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
      const repositories = await fetchPublicRepositories({ signal: controller.signal });
      track.replaceChildren(...repositories.map(repository => makeCard(repository, document)));
      track.hidden = repositories.length === 0;
      track.scrollLeft = 0;
      status.textContent = repositories.length
        ? `${repositories.length} public ${repositories.length === 1 ? 'repository' : 'repositories'}`
        : 'No public repositories yet. Check back soon.';
      requestAnimationFrame(updateControls);
    } catch {
      track.hidden = true;
      previous.disabled = true;
      next.disabled = true;
      status.textContent = 'Repositories are unavailable right now. Try again or view them on GitHub.';
      retry.hidden = false;
    } finally {
      clearTimeout(timeout);
      track.setAttribute('aria-busy', 'false');
      loading = false;
    }
  };
  retry.addEventListener('click', load);
  load();
}

if (typeof document !== 'undefined') initializeCarousel();
