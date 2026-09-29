// Tiny bridge so components can stop/start Lenis without importing it.
let lenis = null;

export const setLenis = (l) => {
  lenis = l;
};
export const getLenis = () => lenis;

export function lockScroll() {
  lenis?.stop();
  document.documentElement.classList.add('is-locked');
}

export function unlockScroll() {
  document.documentElement.classList.remove('is-locked');
  lenis?.start();
}

export function scrollTop(immediate = true) {
  if (lenis) lenis.scrollTo(0, { immediate });
  else window.scrollTo(0, 0);
}

const reducedMotion = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function headerHeight() {
  const v = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-h'));
  return Number.isFinite(v) ? v : 64;
}

// Scrolls an element under the fixed header (Lenis when running, native otherwise).
export function scrollToEl(el, { gap = 16, immediate = false } = {}) {
  if (!el) return;
  const offset = -(headerHeight() + gap);
  if (lenis) {
    lenis.scrollTo(el, { offset, immediate: immediate || reducedMotion() });
    return;
  }
  const top = el.getBoundingClientRect().top + window.scrollY + offset;
  window.scrollTo({ top, behavior: immediate || reducedMotion() ? 'auto' : 'smooth' });
}

export function scrollToId(id, opts) {
  const el = document.getElementById(id);
  scrollToEl(el, opts);
  return Boolean(el);
}

// Sets the URL hash without adding a history entry or firing hashchange.
export function replaceHash(id) {
  const url = window.location.pathname + window.location.search + (id ? `#${id}` : '');
  window.history.replaceState(window.history.state, '', url);
}

// Animated height changes alter the page length: tell Lenis to re-measure.
export const lenisResize = () => lenis?.resize();
