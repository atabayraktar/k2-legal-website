import Link from 'next/link';
import Button from './Button';
import LangSwitch from './LangSwitch';
import Monogram from './Monogram';
import { site } from '../content/site.js';
import { pagePath } from '../lib/routes-util.js';
import { useHeaderTheme } from '../hooks/useHeaderTheme';
import { useT } from '../hooks/useLocale';

export default function Header({ locale, theme: initialTheme = 'light', current, alternates, menuOpen, onMenuToggle, menuBtnRef }) {
  const t = useT();
  const theme = useHeaderTheme(initialTheme);
  const dark = theme === 'dark';

  return (
    <header className="header" data-header-theme={theme}>
      <div className="header__bg" aria-hidden="true" />
      <div className="header__bar container">
        <Link className="header__brand" href={pagePath('home', locale)} aria-label={site.legalName}>
          <img
            className="header__logo header__logo--dark"
            src="/logos/k2-horizontal-dark.svg"
            width="414"
            height="100"
            alt=""
            fetchPriority={initialTheme === 'dark' ? 'low' : 'high'}
          />
          <img
            className="header__logo header__logo--light"
            src="/logos/k2-horizontal-light.svg"
            width="414"
            height="100"
            alt=""
            fetchPriority={initialTheme === 'dark' ? 'high' : 'low'}
          />
          <Monogram className="header__mark" />
        </Link>

        <nav className="header__nav" aria-label={t.menu.label}>
          <ul>
            {t.nav.map((item) => (
              <li key={item.key}>
                <Link
                  className={`header__link${current === item.key ? ' is-current' : ''}`}
                  href={pagePath(item.key, locale)}
                  aria-current={current === item.key ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header__actions">
          <LangSwitch className="header__lang" locale={locale} alternates={alternates} />
          <Button
            className="header__cta"
            variant={dark ? 'ghost-dark' : 'ghost'}
            size="sm"
            href={pagePath('contact', locale)}
          >
            {t.cta.appointment}
          </Button>
          <button
            ref={menuBtnRef}
            type="button"
            className="header__menu-btn"
            aria-expanded={menuOpen}
            aria-controls="menu-overlay"
            onClick={onMenuToggle}
          >
            {t.menu.open}
          </button>
        </div>
      </div>
    </header>
  );
}
