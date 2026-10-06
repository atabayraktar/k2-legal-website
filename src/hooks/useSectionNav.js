import { useCallback } from 'react';
import { useRouter } from 'next/router';
import { replaceHash, scrollToSection } from '../lib/scroll.js';

// Anchor navigation for the home page. On '/' a click scrolls under the fixed header and updates the hash; on any other
// page it opens the home page at its top (no native jump to the hash) and then scrolls down to the section, so the move
// is visible. Returns a click handler factory.
export function useSectionNav(after) {
  const router = useRouter();
  const onHome = router.pathname === '/';
  const go = useCallback(
    (id) => (e) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
      e.preventDefault();
      // Lenis (anchors: true) listens for clicks on same-page "#hash" links at window level and would start its own
      // scroll to the section with a different curve; this nav is handled here, so keep the click from reaching it.
      e.stopPropagation();
      after?.();
      // two frames: a closing overlay unlocks scrolling first / the new page has painted once
      const scroll = () =>
        requestAnimationFrame(() =>
          requestAnimationFrame(() => {
            if (scrollToSection(id)) replaceHash(id);
          }),
        );
      if (onHome) scroll();
      else router.push('/', undefined, { scroll: false }).then(scroll); // routeChangeComplete has reset to the top
    },
    [onHome, after, router],
  );
  return { onHome, go };
}
