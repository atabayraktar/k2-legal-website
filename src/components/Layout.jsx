import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Seo from './Seo';
import Header from './Header';
import MenuOverlay from './MenuOverlay';
import Footer from './Footer';
import { CommonContext } from '../hooks/useCommon';

export default function Layout({ routeKey, params, common, seo, headerTheme = 'light', jsonLd = [], children }) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuBtnRef = useRef(null);
  const ctx = useMemo(() => ({ common }), [common]);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const toggleMenu = useCallback(() => setMenuOpen((v) => !v), []);

  useEffect(() => {
    setMenuOpen(false);
  }, [router.asPath]);

  return (
    <CommonContext.Provider value={ctx}>
      <Seo
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
            theme={headerTheme}
            menuOpen={menuOpen}
            onMenuToggle={toggleMenu}
            menuBtnRef={menuBtnRef}
          />
          <main id="main" className="layout__main" tabIndex={-1}>
            {children}
          </main>
          <Footer />
        </div>
        <MenuOverlay
          open={menuOpen}
          onClose={closeMenu}
          returnFocusRef={menuBtnRef}
        />
      </div>
    </CommonContext.Provider>
  );
}
