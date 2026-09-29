import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Seo from './Seo';
import Header from './Header';
import MenuOverlay from './MenuOverlay';
import Footer from './Footer';
import { LocaleContext } from '../hooks/useLocale';
import { alternates as buildAlternates } from '../lib/routes-util.js';

const CURRENT = { about: 'about', practice: 'practice', practiceDetail: 'practice', team: 'team', contact: 'contact' };

export default function Layout({ locale, routeKey, params, common, seo, headerTheme = 'light', jsonLd = [], children }) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuBtnRef = useRef(null);
  const alternates = useMemo(() => buildAlternates(routeKey, params), [routeKey, params]);
  const ctx = useMemo(() => ({ locale, common }), [locale, common]);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const toggleMenu = useCallback(() => setMenuOpen((v) => !v), []);

  useEffect(() => {
    setMenuOpen(false);
  }, [router.asPath]);

  return (
    <LocaleContext.Provider value={ctx}>
      <Seo
        locale={locale}
        routeKey={routeKey}
        params={params}
        title={seo?.title ?? common.notFound.title}
        description={seo?.description}
        raw={seo?.raw}
        noindex={seo?.noindex}
        jsonLd={jsonLd}
      />
      <div className="layout">
        <a className="skip" href="#main">
          {common.skip}
        </a>
        <div className="layout__page" inert={menuOpen}>
          <Header
            locale={locale}
            theme={headerTheme}
            current={CURRENT[routeKey]}
            alternates={alternates}
            menuOpen={menuOpen}
            onMenuToggle={toggleMenu}
            menuBtnRef={menuBtnRef}
          />
          <main id="main" className="layout__main" tabIndex={-1}>
            {children}
          </main>
          <Footer locale={locale} alternates={alternates} />
        </div>
        <MenuOverlay
          open={menuOpen}
          onClose={closeMenu}
          returnFocusRef={menuBtnRef}
          current={CURRENT[routeKey]}
          alternates={alternates}
          locale={locale}
        />
      </div>
    </LocaleContext.Provider>
  );
}
