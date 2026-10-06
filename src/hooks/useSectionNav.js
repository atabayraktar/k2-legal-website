import { useCallback } from 'react';
import { useRouter } from 'next/router';
import { replaceHash, scrollToSection } from '../lib/scroll.js';

// Anchor navigation for the home page. On "/" a click scrolls (Lenis or native) under the fixed header and updates the hash;
// on any other page the link navigates normally to /#id. Returns a click handler factory.
export function useSectionNav(after) {
  const router = useRouter();
  const onHome = router.pathname === '/';
  const go = useCallback(
    (id) => (e) => {
      if (!onHome) {
        after?.();
        return;
      }
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
      e.preventDefault();
      after?.();
      // let a closing overlay unlock scrolling first
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          if (scrollToSection(id)) replaceHash(id);
        }),
      );
    },
    [onHome, after],
  );
  return { onHome, go };
}
