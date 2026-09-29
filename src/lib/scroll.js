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
