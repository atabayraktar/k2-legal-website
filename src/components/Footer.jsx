import Link from 'next/link';
import LangSwitch from './LangSwitch';
import { site } from '../content/site.js';
import { addressLine, fmt } from '../lib/format.js';
import { pagePath } from '../lib/routes-util.js';
import { useT } from '../hooks/useLocale';
import { renderPending } from '../lib/text.js';

export default function Footer({ locale, alternates }) {
  const t = useT();
  const f = t.footer;
  const c = site.contact;
  const year = new Date().getFullYear();

  return (
    <footer className="footer" data-theme="dark">
      <div className="container">
        <div className="grid footer__top">
          <div className="footer__brand">
            <img className="footer__logo" src="/logos/k2-horizontal-light.svg" width="414" height="100" alt={site.legalName} />
            <address className="footer__address">
              <p className="footer__name">{t.labels.registeredName}</p>
              <p>{site.legalName}</p>
              <p>{renderPending(addressLine(c.address))}</p>
            </address>
          </div>

          <nav className="footer__col footer__col--nav" aria-label={f.navTitle}>
            <h2 className="footer__title">{f.navTitle}</h2>
            <ul className="footer__list">
              {t.nav.map((item) => (
                <li key={item.key}>
                  <Link className="footer__link" href={pagePath(item.key, locale)}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="footer__col footer__col--legal" aria-label={f.legalTitle}>
            <h2 className="footer__title">{f.legalTitle}</h2>
            <ul className="footer__list">
              {f.legalLinks.map((l) => (
                <li key={l.key}>
                  <Link className="footer__link" href={pagePath(l.key, locale)}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer__col footer__col--contact">
            <h2 className="footer__title">{f.contactTitle}</h2>
            <dl className="footer__facts">
              <div>
                <dt>{t.labels.phone}</dt>
                <dd>{c.phone.tel ? <a href={`tel:${c.phone.tel}`}>{c.phone.display}</a> : renderPending(c.phone.display)}</dd>
              </div>
              <div>
                <dt>{t.labels.email}</dt>
                <dd>{renderPending(c.email)}</dd>
              </div>
              <div>
                <dt>{t.labels.kep}</dt>
                <dd>{renderPending(c.kep)}</dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="grid footer__bottom">
          <p className="footer__disclaimer">{f.disclaimer}</p>
          <div className="footer__side">
            <LangSwitch locale={locale} alternates={alternates} />
            <p className="footer__rights">{fmt(f.rights, { year, legalName: site.legalName })}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
