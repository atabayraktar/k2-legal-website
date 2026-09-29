import { useEffect } from 'react';

// One shared IntersectionObserver per rootMargin. Adds .is-in once, then unobserves.
const observers = new Map();

function getObserver(rootMargin) {
  if (observers.has(rootMargin)) return observers.get(rootMargin);
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      }
    },
    { threshold: 0.12, rootMargin },
  );
  observers.set(rootMargin, io);
  return io;
}

export function observeReveal(el, rootMargin = '0px 0px -8% 0px') {
  if (!el) return () => {};
  if (typeof IntersectionObserver === 'undefined') {
    el.classList.add('is-in');
    return () => {};
  }
  const io = getObserver(rootMargin);
  io.observe(el);
  return () => io.unobserve(el);
}

export function useReveal(ref, rootMargin, enabled = true) {
  useEffect(() => (enabled ? observeReveal(ref.current, rootMargin) : undefined), [ref, rootMargin, enabled]);
}
