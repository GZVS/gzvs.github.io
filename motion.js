export function initialMotion(preference, systemReduced) {
  return preference !== 'off' && !systemReduced;
}

function initializeMotion() {
  const root = document.documentElement;
  const toggle = document.getElementById('motion-toggle');
  const label = document.getElementById('motion-label');
  if (!toggle || !label) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let saved = null;
  try { saved = localStorage.getItem('gzvs-motion'); } catch { /* Storage is optional. */ }
  let enabled = false;

  const apply = value => {
    enabled = value && !reduced.matches;
    root.dataset.motion = enabled ? 'on' : 'off';
    toggle.disabled = reduced.matches;
    toggle.title = reduced.matches
      ? 'Motion is disabled by your device’s reduced-motion preference.'
      : 'Turn decorative motion on or off';
    toggle.setAttribute('aria-pressed', String(enabled));
    toggle.setAttribute('aria-label', enabled ? 'Motion on' : 'Motion off');
    label.textContent = enabled ? 'Motion on' : 'Motion off';
  };

  toggle.hidden = false;
  toggle.addEventListener('click', () => {
    apply(!enabled);
    saved = enabled ? 'on' : 'off';
    try { localStorage.setItem('gzvs-motion', saved); } catch { /* Continue without storage. */ }
  });
  reduced.addEventListener('change', () => apply(initialMotion(saved, reduced.matches)));
  document.addEventListener('visibilitychange', () => {
    root.dataset.paused = document.hidden ? 'true' : 'false';
  });
  apply(initialMotion(saved, reduced.matches));
}

if (typeof document !== 'undefined') initializeMotion();
