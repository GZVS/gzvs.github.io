export const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));

export function initialMotion(preference, systemReduced) {
  return preference !== 'off' && !systemReduced;
}

export function sceneFrame({ scrollY = 0, heroHeight = 900, pointerX = 0, pointerY = 0, enabled = true }) {
  if (!enabled) return { x: 0, y: 0, rx: 0, ry: 0, scale: 1 };
  const progress = clamp(scrollY / Math.max(1, heroHeight));
  return { x: -60 * progress, y: Math.max(0, Math.min(scrollY, heroHeight)) * .22,
    rx: -clamp(pointerY, -1, 1) * 3 + progress * 5,
    ry: clamp(pointerX, -1, 1) * 6 - progress * 8, scale: 1 - progress * .1 };
}

function initializeMotion() {
  const root = document.documentElement;
  const toggle = document.getElementById('motion-toggle');
  const scene = document.getElementById('hero-visual');
  const hero = document.querySelector('.hero');
  if (!toggle || !scene || !hero) return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const desktop = window.matchMedia('(min-width: 851px)');
  const finePointer = window.matchMedia('(pointer: fine)');
  let saved = null;
  try { saved = localStorage.getItem('gzvs-motion'); } catch { /* Storage is optional. */ }
  let enabled = initialMotion(saved, reduced.matches);
  let pointerX = 0;
  let pointerY = 0;
  let animationFrame = 0;
  const render = () => {
    animationFrame = 0;
    const frame = sceneFrame({ scrollY: window.scrollY, heroHeight: hero.offsetHeight,
      pointerX, pointerY, enabled: enabled && desktop.matches && !document.hidden });
    scene.style.setProperty('--scene-x', frame.x + 'px');
    scene.style.setProperty('--scene-y', frame.y + 'px');
    scene.style.setProperty('--scene-rx', frame.rx + 'deg');
    scene.style.setProperty('--scene-ry', frame.ry + 'deg');
    scene.style.setProperty('--scene-scale', String(frame.scale));
  };
  const schedule = () => { if (!animationFrame) animationFrame = requestAnimationFrame(render); };
  const apply = value => {
    enabled = value;
    root.dataset.motion = enabled ? 'on' : 'off';
    toggle.setAttribute('aria-pressed', String(enabled));
    toggle.setAttribute('aria-label', enabled ? 'Motion on' : 'Motion off');
    render();
  };
  toggle.hidden = false;
  toggle.addEventListener('click', () => {
    apply(!enabled);
    saved = enabled ? 'on' : 'off';
    try { localStorage.setItem('gzvs-motion', saved); } catch { /* Continue without storage. */ }
  });
  reduced.addEventListener('change', () => apply(initialMotion(saved, reduced.matches)));
  desktop.addEventListener('change', schedule);
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule, { passive: true });
  window.addEventListener('pointermove', event => {
    if (!enabled || !desktop.matches || !finePointer.matches || window.scrollY > hero.offsetHeight) return;
    pointerX = (event.clientX / window.innerWidth) * 2 - 1;
    pointerY = (event.clientY / window.innerHeight) * 2 - 1;
    schedule();
  }, { passive: true });
  document.addEventListener('visibilitychange', schedule);
  const elements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    }, { threshold: .12, rootMargin: '0px 0px -25px 0px' });
    elements.forEach(element => observer.observe(element));
  } else elements.forEach(element => element.classList.add('is-visible'));
  apply(enabled);
}
if (typeof document !== 'undefined') initializeMotion();
