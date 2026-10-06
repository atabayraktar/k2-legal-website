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

export const reducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function headerHeight() {
  const v = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-h'));
  return Number.isFinite(v) ? v : 64;
}

// ---------------------------------------------------------------------------------------------------------------------
// One engine for every programmatic scroll (nav anchors, back-to-top, deep links): a requestAnimationFrame tween that
// moves the window directly. It deliberately does NOT go through lenis.scrollTo, because Lenis
//   - may not exist yet, or gets created mid-flight (it is imported on the first pointerdown — the very click that
//     starts the scroll), so an animation handed to it would restart with a new curve;
//   - still holds the previous page's height for up to 250ms after a client-side navigation and clamps the target to
//     it, which made the move stop short and then shoot to the real target;
//   - subtracts the html scroll-padding-top from element targets, landing a header height lower than the native path.
// While we move the window Lenis just follows the native scroll events; at the end it is re-synced so the next wheel
// continues from the landing spot instead of snapping back. The target is re-read every frame, so layout that settles
// below the fold during the move (fonts, panels) cannot leave the landing short.
// ---------------------------------------------------------------------------------------------------------------------
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2); // ease-in-out cubic
const CANCEL_EVENTS = ['wheel', 'touchstart', 'keydown'];
let tween = null;

const maxScroll = () => Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
const clampY = (y) => Math.min(Math.max(0, y), maxScroll());
const setY = (y) => window.scrollTo(0, y); // html has no scroll-behavior: smooth, so this is instant everywhere

// Re-measure Lenis (stale after a page change) and align it with the real scroll position. If it is mid-animation
// (user inertia), stop()/start() resets that animation at the current spot without touching a lock held by an overlay.
function syncLenis() {
  if (!lenis) return;
  if (lenis.isScrolling === 'smooth' && !lenis.isStopped) {
    lenis.stop();
    lenis.start();
  }
  lenis.resize();
}

export function stopScrollTween() {
  if (!tween) return;
  cancelAnimationFrame(tween.raf);
  tween.cleanup();
  tween = null;
}

// getTarget: () => document y. Duration grows gently with the distance (600–1200ms). Instant under reduced motion.
export function animateScrollTo(getTarget, { immediate = false } = {}) {
  stopScrollTween();
  syncLenis();
  if (immediate || reducedMotion()) {
    setY(clampY(getTarget()));
    syncLenis();
    return;
  }
  const from = window.scrollY;
  const dist = Math.abs(clampY(getTarget()) - from);
  if (dist < 1) return;
  const duration = Math.min(1200, Math.max(600, 500 + dist * 0.09));
  const t0 = performance.now();
  // the user takes over: wheel / touch / keyboard cancel the tween where it is (Lenis is already in sync with it)
  const cancel = () => stopScrollTween();
  CANCEL_EVENTS.forEach((e) => window.addEventListener(e, cancel, { passive: true }));
  const cleanup = () => CANCEL_EVENTS.forEach((e) => window.removeEventListener(e, cancel));
  const step = (now) => {
    const p = Math.min(1, (now - t0) / duration);
    const to = clampY(getTarget());
    setY(from + (to - from) * ease(p));
    if (p < 1) {
      tween.raf = requestAnimationFrame(step);
      return;
    }
    cleanup();
    tween = null;
    syncLenis();
  };
  tween = { raf: requestAnimationFrame(step), cleanup };
}

// Back to the very top. Instant by default (route change); smooth for the logo / "to top" button.
export function scrollTop(immediate = true) {
  animateScrollTo(() => 0, { immediate });
}

export const scrollToTopSmooth = () => scrollTop(false);

// Scrolls an element under the fixed header.
export function scrollToEl(el, { gap = 16, immediate = false } = {}) {
  if (!el) return;
  animateScrollTo(() => el.getBoundingClientRect().top + window.scrollY - (headerHeight() + gap), { immediate });
}

export function scrollToId(id, opts) {
  const el = document.getElementById(id);
  scrollToEl(el, opts);
  return Boolean(el);
}

// Header nav target: scrolls so the section's heading sits just under the fixed header, skipping the section's own top
// padding (up to ~144px of empty space) instead of landing on its edge.
export function scrollToSection(id, { gap = 32, immediate = false } = {}) {
  const el = document.getElementById(id);
  if (!el) return false;
  animateScrollTo(() => {
    const pad = parseFloat(getComputedStyle(el).paddingTop) || 0;
    return el.getBoundingClientRect().top + window.scrollY + pad - (headerHeight() + gap);
  }, { immediate });
  return true;
}

// Sets the URL hash without adding a history entry or firing hashchange.
export function replaceHash(id) {
  const url = window.location.pathname + window.location.search + (id ? `#${id}` : '');
  window.history.replaceState(window.history.state, '', url);
}

// Animated height changes alter the page length: tell Lenis to re-measure.
export const lenisResize = () => lenis?.resize();
