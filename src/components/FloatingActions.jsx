import { useEffect, useState } from 'react';
import { site } from '../content/site.js';
import { useT } from '../hooks/useCommon';
import { scrollTop } from '../lib/scroll.js';

// Sticky corner buttons on every page: WhatsApp (right) and scroll-to-top (left, shown only near the bottom of the page).
// Until site.contact.whatsapp.url is set, the WhatsApp button points to the contact section.
export default function FloatingActions() {
  const common = useT();
  const [shown, setShown] = useState(false);
  const wa = site.contact.whatsapp.url;

  useEffect(() => {
    const onScroll = () => {
      const d = document.documentElement;
      setShown(window.scrollY + window.innerHeight > d.scrollHeight - 700);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <button
        type="button"
        className={`fab fab--top${shown ? ' is-shown' : ''}`}
        aria-label={common.labels.toTop}
        tabIndex={shown ? 0 : -1}
        onClick={() => scrollTop(false)}
      >
        <span aria-hidden="true">&#8593;</span>
      </button>
      <a
        className="fab fab--wa"
        href={wa ?? '/#iletisim'}
        aria-label={common.labels.whatsappFloat}
        {...(wa ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        <svg className="fab__icon" viewBox="0 0 24 24" width="26" height="26" aria-hidden="true" focusable="false">
          <path
            fill="currentColor"
            d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 1.67c2.2 0 4.26.86 5.82 2.42a8.2 8.2 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.26-8.24zM8.53 7.33c-.16 0-.43.06-.66.31-.22.25-.87.85-.87 2.07 0 1.22.89 2.39 1 2.56.14.17 1.76 2.67 4.25 3.73.59.27 1.05.42 1.41.53.59.19 1.13.16 1.56.1.48-.07 1.46-.6 1.67-1.18.2-.58.2-1.07.14-1.18-.07-.1-.23-.16-.48-.27-.25-.14-1.47-.74-1.69-.82-.23-.08-.39-.12-.56.12-.16.25-.64.82-.78.98-.15.17-.29.19-.54.06-.25-.14-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.48z"
          />
        </svg>
      </a>
    </>
  );
}
