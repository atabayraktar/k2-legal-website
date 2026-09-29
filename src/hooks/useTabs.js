import { useCallback, useEffect, useRef, useState } from 'react';
import { useHash } from './useHash';
import { headerHeight, replaceHash, scrollToEl } from '../lib/scroll.js';

// Tabs with roving focus, hash sync and Ctrl+F support (WAI-ARIA tabs pattern; selection follows focus).
// ids: tab ids in order. hashPrefix: URL hash is `${hashPrefix}${id}` (e.g. 'ilke-' gives #ilke-gizlilik).
// Inactive panels get hidden="until-found": the text stays in the DOM and Ctrl+F opens the matching panel (beforematch selects it).
// React does not emit the until-found value, so the attribute is set imperatively after hydration; the server HTML has no
// hidden attribute at all, which is exactly what no-JS readers and crawlers need (every panel visible).
// data-state on each panel ('active' | 'inactive') is the styling hook. Note: hidden=until-found panels have no intrinsic
// height, so a layout that must not jump needs a fixed min-height on the panel container.
export function useTabs({ ids, defaultId = ids[0], hashPrefix = '', orientation = 'vertical', hash = true }) {
  const [active, setActive] = useState(defaultId);
  const tabs = useRef({});
  const panels = useRef({});
  const listeners = useRef({});
  const scrollAfter = useRef(false);

  const select = useCallback(
    (id, { focus = false } = {}) => {
      setActive(id);
      if (focus) tabs.current[id]?.focus();
      if (hash) replaceHash(`${hashPrefix}${id}`);
    },
    [hash, hashPrefix],
  );

  useHash((h) => {
    if (!h || !h.startsWith(hashPrefix)) return;
    const id = h.slice(hashPrefix.length);
    if (!ids.includes(id)) return;
    setActive(id);
    scrollAfter.current = true;
  }, hash);

  useEffect(() => {
    if (!scrollAfter.current) return undefined;
    scrollAfter.current = false;
    const t = window.setTimeout(() => {
      const el = panels.current[active];
      if (el && el.getBoundingClientRect().top < headerHeight()) scrollToEl(el);
    }, 60);
    return () => window.clearTimeout(t);
  }, [active]);

  // Sync the hidden attribute with the active tab (runs after every selection).
  useEffect(() => {
    for (const id of ids) {
      const el = panels.current[id];
      if (!el) continue;
      if (id === active) el.removeAttribute('hidden');
      else el.setAttribute('hidden', 'until-found');
    }
    // ids is stable per consumer
  }, [active]);

  const move = (i) => select(ids[(i + ids.length) % ids.length], { focus: true });
  const prevKey = orientation === 'vertical' ? 'ArrowUp' : 'ArrowLeft';
  const nextKey = orientation === 'vertical' ? 'ArrowDown' : 'ArrowRight';

  const listProps = { role: 'tablist', 'aria-orientation': orientation };

  const getTabProps = (id) => ({
    id: `${hashPrefix}tab-${id}`,
    role: 'tab',
    type: 'button',
    'aria-selected': active === id,
    'aria-controls': `${hashPrefix}panel-${id}`,
    tabIndex: active === id ? 0 : -1,
    ref: (el) => {
      tabs.current[id] = el;
    },
    onClick: () => select(id),
    onKeyDown: (e) => {
      const i = ids.indexOf(id);
      if (e.key === nextKey) {
        e.preventDefault();
        move(i + 1);
      } else if (e.key === prevKey) {
        e.preventDefault();
        move(i - 1);
      } else if (e.key === 'Home') {
        e.preventDefault();
        move(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        move(ids.length - 1);
      }
    },
  });

  const getPanelProps = (id) => ({
    id: `${hashPrefix}panel-${id}`,
    role: 'tabpanel',
    'aria-labelledby': `${hashPrefix}tab-${id}`,
    tabIndex: active === id ? 0 : -1,
    'data-state': active === id ? 'active' : 'inactive',
    ref: (el) => {
      const old = panels.current[id];
      if (old && listeners.current[id]) old.removeEventListener('beforematch', listeners.current[id]);
      panels.current[id] = el;
      if (el) {
        listeners.current[id] = () => select(id);
        el.addEventListener('beforematch', listeners.current[id]);
      }
    },
  });

  return { active, select, listProps, getTabProps, getPanelProps };
}
