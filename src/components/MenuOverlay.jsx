import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Logo from './Logo';
import Button from './Button';
import { site } from '../content/site.js';
import { anchorNav, anchorHref } from '../content/nav.js';
import { pagePath } from '../lib/routes-util.js';
import { useSectionNav } from '../hooks/useSectionNav';
import { useAppointment } from '../hooks/useAppointment';
import { lockScroll, unlockScroll } from '../lib/scroll.js';
import { useT } from '../hooks/useCommon';

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function MenuOverlay({ open, onClose, returnFocusRef }) {
  const t = useT();
  const { go } = useSectionNav(onClose);
  const { openAppointment } = useAppointment();
  const ref = useRef(null);
  const closeRef = useRef(null);

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
            <Logo tone="light" className="menu__logo" />
          </Link>
          <button ref={closeRef} type="button" className="menu__close" onClick={onClose} aria-label={t.menu.close}>
            <svg className="menu__x" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" focusable="false">
              <path d="M5 5l14 14M19 5L5 19" />
            </svg>
          </button>
        </div>

        <nav className="menu__nav container" aria-label={t.menu.linksLabel}>
          <ol className="menu__list">
            {anchorNav.map((item) => (
              <li className="menu__item" key={item.id}>
                <Link className="menu__link" href={anchorHref(item.id)} onClick={go(item.id)}>
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ol>
        </nav>

        <div className="menu__foot container">
          <address className="menu__contact">
            <Button
              variant="ghost-dark"
              href={anchorHref('iletisim')}
              onClick={(e) => {
                if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
                e.preventDefault();
                onClose();
                openAppointment(returnFocusRef?.current);
              }}
            >
              {t.cta.appointment}
            </Button>
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
