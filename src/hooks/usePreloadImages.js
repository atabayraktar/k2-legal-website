import { useEffect } from 'react';
import { useRouter } from 'next/router';

// Lazy images only start loading when they are about to scroll in, which shows as late pop-in while scrolling. Once the page
// has loaded (and the main thread is idle) every remaining lazy image is switched to eager, so it is already there on arrival.
// Runs after the load event, so it never competes with LCP.
export function usePreloadImages() {
  const router = useRouter();

  useEffect(() => {
    let timer = null;
    const run = () => {
      document.querySelectorAll('img[loading="lazy"]').forEach((img) => {
        if (!img.complete) img.loading = 'eager';
      });
    };
    const schedule = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => (window.requestIdleCallback ? window.requestIdleCallback(run, { timeout: 1500 }) : run()), 400);
    };
    if (document.readyState === 'complete') schedule();
    else window.addEventListener('load', schedule, { once: true });
    router.events.on('routeChangeComplete', schedule);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('load', schedule);
      router.events.off('routeChangeComplete', schedule);
    };
  }, [router.events]);
}
