import Link from 'next/link';
import Docket from './Docket';
import Logo from './Logo';
import { useSectionNav } from '../hooks/useSectionNav';
import { useLogoHome } from '../hooks/useLogoHome';
import Ledger from './Ledger';
import { site } from '../content/site.js';
import { anchorNav, anchorHref } from '../content/nav.js';
import { addressLine, fmt } from '../lib/format.js';
import { pagePath } from '../lib/routes-util.js';
import { useT } from '../hooks/useCommon';
import { isPending } from '../lib/pending.js';
import { renderPending } from '../lib/text.js';

// Footer (ink): the case file's back sheet. Large logo, address as a typed ledger,
// two docket-labelled link columns, then the disclaimer as a typewritten note under one hairline.
export default function Footer() {
  const t = useT();
  const f = t.footer;
  const c = site.contact;
  const onLogo = useLogoHome();
  const { go } = useSectionNav();
  const year = new Date().getFullYear();

  const rows = [
    {
      k: t.labels.address,
      v: c.map?.href ? (
        <a href={c.map.href} target="_blank" rel="noopener noreferrer">
          {renderPending(addressLine(c.address))}
        </a>
      ) : (
        renderPending(addressLine(c.address))
      ),
    },
    { k: t.labels.phone, v: <a href={`tel:${c.phone.tel}`}>{c.phone.display}</a> },
    { k: t.labels.mobile, v: <a href={`tel:${c.mobile.tel}`}>{c.mobile.display}</a> },
    {
      k: t.labels.email,
      v: isPending(c.email, { required: true }) ? renderPending(c.email) : <a href={`mailto:${c.email}`}>{c.email}</a>,
    },
    { k: t.labels.kep, v: renderPending(c.kep) },
  ];

  return (
    <footer className="footer" data-theme="dark">
      <div className="container">
        <div className="grid footer__top">
          <div className="footer__brand">
            <Link className="footer__home" href={pagePath('home')} aria-label={site.legalName} onClick={onLogo}>
              <Logo tone="light" className="footer__logo" />
            </Link>
            <Ledger items={rows} className="footer__ledger" />
          </div>

          <div className="footer__side">
            <div className="footer__cols">
              <nav className="footer__col footer__col--nav" aria-label={f.navTitle}>
                <Docket prefix="" label={f.navTitle} as="h2" className="footer__docket" />
                <ul className="footer__list">
                  {anchorNav.map((item) => (
                    <li key={item.id}>
                      <Link className="footer__link" href={anchorHref(item.id)} onClick={go(item.id)}>
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <nav className="footer__col footer__col--legal" aria-label={f.legalTitle}>
                <Docket prefix="" label={f.legalTitle} as="h2" className="footer__docket" />
                <ul className="footer__list">
                  {f.legalLinks.map((l) => (
                    <li key={l.key}>
                      <Link className="footer__link" href={pagePath(l.key)} target="_blank" rel="noopener noreferrer">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
            <p className="footer__disclaimer">{f.disclaimer}</p>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__rights">{fmt(f.rights, { year, legalName: site.legalName })}</p>
        </div>
      </div>
    </footer>
  );
}
