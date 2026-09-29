import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Monogram from './Monogram';
import { site } from '../content/site.js';
import { addressLine } from '../lib/format.js';
import { anchorNav, anchorHref } from '../content/nav.js';
import { pagePath } from '../lib/routes-util.js';
import { useSectionNav } from '../hooks/useSectionNav';
import { lockScroll, unlockScroll } from '../lib/scroll.js';
import { useT } from '../hooks/useCommon';
import { renderPending } from '../lib/text.js';

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function MenuOverlay({ open, onClose, returnFocusRef }) {
  const t = useT();
  const { go } = useSectionNav(onClose);
  const ref = useRef(null);
  const closeRef = useRef(null);
  const c = site.contact;

  // Open: stop Lenis + lock scroll, move focus in. Close/unmount: unlock, return focus to the trigger.
  useEffect(() => {
    if (!open) return undefined;
    lockScroll();
    const raf = requestAnimationFrame(() => closeRef.current?.focus());
    const trigger = returnFocusRef?.current;
    return () => {
      cancelAnimationFrame(raf);
      unlockScroll();
      trigger?.focus();
    };
  }, [open, returnFocusRef]);

  // Desktop nav takes over at >=1100px.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1100px)');
    const onChange = (e) => {
      if (e.matches && open) onClose();
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [open, onClose]);

  const onKeyDown = (e) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
      return;
    }
    if (e.key !== 'Tab') return;
    const nodes = ref.current?.querySelectorAll(FOCUSABLE);
    if (!nodes?.length) return;
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  return (
    <div
      id="menu-overlay"
      ref={ref}
      className={`menu${open ? ' menu--open' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label={t.menu.label}
      aria-hidden={!open}
      inert={!open}
      onKeyDown={onKeyDown}
    >
      <div className="menu__inner" data-lenis-prevent>
        <div className="menu__top container">
          <Link className="menu__brand" href={pagePath('home')} aria-label={site.legalName} onClick={onClose}>
            <img className="menu__logo" src="/logos/k2-horizontal-light.svg" width="414" height="100" alt="" />
            <Monogram className="menu__mark" />
          </Link>
          <button ref={closeRef} type="button" className="menu__close" onClick={onClose}>
            {t.menu.close}
          </button>
        </div>

        <nav className="menu__nav container" aria-label={t.menu.linksLabel}>
          <ol className="menu__list">
            {anchorNav.map((item, i) => (
              <li className="menu__item" key={item.id}>
                <Link className="menu__link" href={anchorHref(item.id)} onClick={go(item.id)}>
                  <span className="menu__num" aria-hidden="true">
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ol>
        </nav>

        <div className="menu__foot container">
          <address className="menu__contact">
            <strong>{t.menu.contactTitle}</strong>
            <span>{renderPending(c.phone.display)}</span>
            <span>{renderPending(c.email)}</span>
            <span>{renderPending(addressLine(c.address))}</span>
          </address>
          <div className="menu__side">
            <ul className="menu__legal">
              {t.footer.legalLinks.map((l) => (
                <li key={l.key}>
                  <Link href={pagePath(l.key)} onClick={onClose}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
