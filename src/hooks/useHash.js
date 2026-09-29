import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

// Calls cb(hashWithoutHash) on mount and whenever the URL hash changes (native hashchange + Next in-page navigation).
export function useHash(cb, enabled = true) {
  const router = useRouter();
  const ref = useRef(cb);
  ref.current = cb;

  useEffect(() => {
    if (!enabled) return undefined;
    const run = () => {
      let h = window.location.hash.slice(1);
      try {
        h = decodeURIComponent(h);
      } catch {
        // keep the raw value
      }
      ref.current(h);
    };
    run();
    window.addEventListener('hashchange', run);
    router.events.on('hashChangeComplete', run);
    return () => {
      window.removeEventListener('hashchange', run);
      router.events.off('hashChangeComplete', run);
    };
  }, [router.events, enabled]);
}
