import { useEffect, useState } from 'react';

// Returns the id of the section crossing the viewport midline (one IntersectionObserver, no scroll listener).
export function useActiveSection(ids, enabled = true) {
  const [active, setActive] = useState(null);
  const key = ids.join('|');

  useEffect(() => {
    if (!enabled || typeof IntersectionObserver === 'undefined') {
      setActive(null);
      return undefined;
    }
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!els.length) return undefined;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
          else setActive((cur) => (cur === e.target.id ? null : cur));
        }
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
    // ids is represented by key
  }, [key, enabled]);

  return active;
}
