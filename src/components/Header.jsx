import Link from 'next/link';
import Logo from './Logo';
import { useLogoHome } from '../hooks/useLogoHome';
import Button from './Button';
import Monogram from './Monogram';
import { site } from '../content/site.js';
import { anchorNav, anchorHref } from '../content/nav.js';
import { pagePath } from '../lib/routes-util.js';
import { useHeaderTheme } from '../hooks/useHeaderTheme';
import { useActiveSection } from '../hooks/useActiveSection';
import { useSectionNav } from '../hooks/useSectionNav';
import { useT } from '../hooks/useCommon';

const IDS = anchorNav.map((n) => n.id);

// Fixed header. Nav = anchors into the home page (scroll on "/", navigate elsewhere). aria-current="true" marks the
// section crossing the viewport midline (IntersectionObserver).
export default function Header({ theme: initialTheme = 'light', menuOpen, onMenuToggle, menuBtnRef }) {
  const t = useT();
  const theme = useHeaderTheme(initialTheme);
  const dark = theme === 'dark';
  const onLogo = useLogoHome();
  const { onHome, go } = useSectionNav();
  const active = useActiveSection(IDS, onHome);

  return (
    <header className="header" data-header-theme={theme}>
      <div className="header__bg" aria-hidden="true" />
      <div className="header__bar container">
        <Link className="header__brand" href={pagePath('home')} aria-label={site.legalName} onClick={onLogo}>
          <Logo tone="dark" className="header__logo header__logo--dark" />
          <Logo tone="light" className="header__logo header__logo--light" />
          <Monogram accent className="header__mark" />
        </Link>

        <nav className="header__nav" aria-label={t.menu.label}>
          <ul>
            {anchorNav.map((item) => (
              <li key={item.id}>
                <Link
                  className={`header__link${active === item.id ? ' is-current' : ''}`}
                  href={anchorHref(item.id)}
                  aria-current={active === item.id ? 'true' : undefined}
                  onClick={go(item.id)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header__actions">
          <Button
            className="header__cta"
            variant={dark ? 'ghost-dark' : 'ghost'}
            size="sm"
            href={anchorHref('iletisim')}
            onClick={go('iletisim')}
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
