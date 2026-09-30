import Layout from '../components/Layout';
import PageHero from '../components/PageHero';
import Prose from '../components/Prose';
import { site } from '../content/site.js';
import { fmt, addressLine } from '../lib/format.js';
import { abs, pagePath } from '../lib/routes-util.js';
import { orgSchema, websiteSchema, breadcrumbSchema, graph } from '../lib/schema.js';

// Shared view for Aydinlatma Metni / Cerez Politikasi / Yasal Uyari.
export default function LegalView({ routeKey, common, seo, legal }) {
  const doc = legal[routeKey];
  const c = site.contact;
  const vars = {
    legalName: site.legalName,
    address: addressLine(c.address),
    email: c.email,
    kep: c.kep,
    phone: c.phone.display,
    city: site.city,
    baro: site.baro,
  };
  const r = (s) => fmt(s, vars);
  const sections = doc.sections.map((s) => ({
    ...s,
    h2: r(s.h2),
    paragraphs: s.paragraphs?.map(r),
    list: s.list?.map(r),
  }));
  const crumbs = [
    { label: common.breadcrumbs.home, href: pagePath('home') },
    { label: doc.h1 },
  ];
  const ld = graph(
    orgSchema(),
    websiteSchema(),
    breadcrumbSchema([
      { name: crumbs[0].label, url: abs(pagePath('home')) },
      { name: doc.h1, url: abs(pagePath(routeKey)) },
    ]),
  );

  return (
    <Layout routeKey={routeKey} common={common} seo={seo} headerTheme="light" jsonLd={[ld]}>
      <PageHero title={doc.h1} lede={doc.lede} />
      <div className="legal">
        <div className="container legal__grid">
          <nav className="legal__toc" aria-label={legal.tocLabel}>
            <p className="legal__toc-title">{legal.tocLabel}</p>
            <ol className="legal__toc-list">
              {sections.map((s) => (
                <li key={s.id}>
                  <a className="legal__toc-link" href={`#prose-${s.id}`}>
                    {s.h2}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          <Prose sections={sections} updated={doc.updated} label={legal.updatedLabel} />
        </div>
      </div>
    </Layout>
  );
}
