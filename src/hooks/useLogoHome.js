import { useCallback } from 'react';
import { useRouter } from 'next/router';
import { replaceHash, scrollToTopSmooth } from '../lib/scroll.js';

// Logo link: on "/" it scrolls smoothly to the top (and clears the hash); on any other page it navigates home as usual.
export function useLogoHome() {
  const router = useRouter();
  return useCallback(
    (e) => {
      if (router.pathname !== '/') return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
      e.preventDefault();
      scrollToTopSmooth();
      replaceHash('');
    },
    [router.pathname],
  );
}
