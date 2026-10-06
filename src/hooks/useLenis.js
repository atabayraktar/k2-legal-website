import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { setLenis, scrollTop, scrollToSection } from '../lib/scroll.js';

// Called once in _app. Lenis stays out of hydration and the first-paint window entirely: it is imported and started on the
// first real user input (wheel / touch / key / pointer) or, failing that, after a long idle. Skipped under reduced motion.
export function useLenis() {
  const router = useRouter();

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    let instance = null;
    let cancelled = false;
    let started = false;
    const EVENTS = ['wheel', 'touchstart', 'keydown', 'pointerdown'];

    const cleanupListeners = () => EVENTS.forEach((e) => window.removeEventListener(e, start));

    async function start() {
      if (started) return;
      started = true;
      cleanupListeners();
      const { default: Lenis } = await import('lenis');
      if (cancelled) return;
      instance = new Lenis({
        autoRaf: true,
        duration: 1.1,
        // Lenis already honours the CSS scroll-margin-top (var(--header-h)) on [id]; adding an offset doubled it.
        anchors: true,
        respectReducedMotion: true,
      });
      setLenis(instance);
    }

    EVENTS.forEach((e) => window.addEventListener(e, start, { once: true, passive: true }));
    const idle = window.setTimeout(() => {
      if (window.requestIdleCallback) window.requestIdleCallback(start, { timeout: 2000 });
      else start();
    }, 8000);

    return () => {
      cancelled = true;
      window.clearTimeout(idle);
      cleanupListeners();
      instance?.destroy();
      setLenis(null);
    };
  }, []);

  useEffect(() => {
    // New page: back to the top (stops any running scroll tween and re-syncs Lenis with the new page height). A URL
    // with a #hash (e.g. /#iletisim pushed without the nav handler) then scrolls down to that section from the top.
    const done = (url = '') => {
      scrollTop(true);
      const hash = String(url).split('#')[1];
      if (!hash) return;
      const id = decodeURIComponent(hash);
      requestAnimationFrame(() => requestAnimationFrame(() => scrollToSection(id)));
    };
    router.events.on('routeChangeComplete', done);
    return () => router.events.off('routeChangeComplete', done);
  }, [router.events]);
}
