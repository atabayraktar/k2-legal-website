import { useEffect, useRef } from 'react';
import ContactForm from './ContactForm';
import { site } from '../content/site.js';
import contact from '../content/tr/contact.js';
import { lockScroll, unlockScroll } from '../lib/scroll.js';

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

// "Randevu talep formu" as a dialog. The overlay itself scrolls (the form is taller than most screens); a click on the
// dark area outside the panel, the X button or Esc closes it. Focus is trapped inside and returned to the trigger.
export default function AppointmentModal({ open, onClose, triggerRef, closeLabel = 'Kapat' }) {
  const rootRef = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    lockScroll();
    const raf = requestAnimationFrame(() => closeRef.current?.focus());
    const trigger = triggerRef?.current;
    return () => {
      cancelAnimationFrame(raf);
      unlockScroll();
      trigger?.focus?.();
    };
  }, [open, triggerRef]);

  const onKeyDown = (e) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
      return;
    }
    if (e.key !== 'Tab') return;
    const nodes = [...(rootRef.current?.querySelectorAll(FOCUSABLE) ?? [])].filter((n) => !n.closest('[hidden]'));
    if (!nodes.length) return;
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
      ref={rootRef}
      className={`appt${open ? ' appt--open' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="appt-title"
      aria-hidden={!open}
      inert={!open}
      onKeyDown={onKeyDown}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      data-lenis-prevent
    >
      <div className="appt__panel">
        <button ref={closeRef} type="button" className="appt__close" onClick={onClose} aria-label={closeLabel}>
          <span className="appt__x" aria-hidden="true" />
        </button>
        {open ? <ContactForm t={contact} site={site} headingId="appt-title" /> : null}
      </div>
    </div>
  );
}
