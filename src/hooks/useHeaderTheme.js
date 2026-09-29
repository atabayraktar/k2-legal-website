import { useEffect, useState } from 'react';

// Returns 'light' | 'dark' depending on which [data-theme] section sits under the header midline.
export function useHeaderTheme(initial = 'light') {
  const [theme, setTheme] = useState(initial);

  useEffect(() => {
    let raf = 0;
    const measure = () => {
      raf = 0;
      const h = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 64;
      const y = h / 2;
      const sections = document.querySelectorAll('main [data-theme], .footer[data-theme]');
      let next = null;
      for (const s of sections) {
        const r = s.getBoundingClientRect();
        if (r.top <= y && r.bottom > y) {
          next = s.getAttribute('data-theme');
          break;
        }
      }
      if (next) setTheme(next);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    raf = requestAnimationFrame(measure);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    setTheme(initial);
  }, [initial]);

  return theme;
}
