import { useCallback, useEffect, useRef, useState } from 'react';
import { useHash } from './useHash';
import { headerHeight, replaceHash, scrollToEl } from '../lib/scroll.js';

// Accordion state + a11y wiring (WAI-ARIA accordion pattern).
// ids: item ids in order (also the URL hash of each item). multi: allow several open. defaultOpen: ids open on first render (SSR).
// Markup contract per item: the heading element carries id={id}; button id `${id}-btn`, aria-controls `${id}-panel`; panel id `${id}-panel`.
const PANEL_MS = 560;

export function useAccordion({ ids, multi = false, defaultOpen = [], hash = true }) {
  const [open, setOpen] = useState(defaultOpen);
  const buttons = useRef({});
  const pendingScroll = useRef(null);

  const isOpen = useCallback((id) => open.includes(id), [open]);

  // Deep links: #id opens the item and scrolls to it. Other hashes are ignored.
  useHash((h) => {
    if (!h || !ids.includes(h)) return;
    setOpen((cur) => (multi ? (cur.includes(h) ? cur : [...cur, h]) : [h]));
    pendingScroll.current = h;
  }, hash);

  // After the open state commits, bring the item under the header once the height animation has settled.
  useEffect(() => {
    const id = pendingScroll.current;
    if (!id) return undefined;
    pendingScroll.current = null;
    const t = window.setTimeout(() => {
      const el = document.getElementById(id);
      if (!el) return;
      const top = el.getBoundingClientRect().top;
      if (top < headerHeight() || top > window.innerHeight * 0.6) scrollToEl(el);
    }, PANEL_MS);
    return () => window.clearTimeout(t);
  }, [open]);

  const toggle = useCallback(
    (id) => {
      const wasOpen = open.includes(id);
      let next;
      if (multi) next = wasOpen ? open.filter((x) => x !== id) : [...open, id];
      else next = wasOpen ? [] : [id];
      setOpen(next);
      if (hash) {
        if (!wasOpen) replaceHash(id);
        else if (window.location.hash === `#${id}`) replaceHash(null);
      }
      // Opening an item below an open one shifts the layout: keep the opened heading in view.
      if (!wasOpen) pendingScroll.current = id;
    },
    [open, multi, hash],
  );

  const focusAt = (i) => {
    const id = ids[(i + ids.length) % ids.length];
    buttons.current[id]?.focus();
  };

  const getButtonProps = (id) => ({
    id: `${id}-btn`,
    type: 'button',
    'aria-expanded': open.includes(id),
    'aria-controls': `${id}-panel`,
    ref: (el) => {
      buttons.current[id] = el;
    },
    onClick: () => toggle(id),
    onKeyDown: (e) => {
      const i = ids.indexOf(id);
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        focusAt(i + 1);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        focusAt(i - 1);
      } else if (e.key === 'Home') {
        e.preventDefault();
        focusAt(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        focusAt(ids.length - 1);
      }
    },
  });

  const getPanelProps = (id) => ({
    id: `${id}-panel`,
    open: open.includes(id),
    labelledBy: `${id}-btn`,
  });

  return { ids, open, isOpen, toggle, getButtonProps, getPanelProps };
}
