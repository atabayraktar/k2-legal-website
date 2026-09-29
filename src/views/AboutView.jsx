import Layout from '../components/Layout';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import Button from '../components/Button';
import { site } from '../content/site.js';
import { fmt, addressLine } from '../lib/format.js';
import { abs, pagePath } from '../lib/routes-util.js';
import { renderPending } from '../lib/text.js';
import { orgSchema, websiteSchema, breadcrumbSchema, graph } from '../lib/schema.js';

// Shared by /hakkimizda/ and /en/about/. page = about content.
export default function AboutView({ locale, common, seo, page }) {
  const vars = { city: site.city, baro: site.baro, address: addressLine(site.contact.address), legalName: site.legalName };
  const r = (s) => fmt(s, vars);
  const crumbs = [{ label: common.breadcrumbs.home, href: pagePath('home', locale) }, { label: page.eyebrow }];
  const ld = graph(
    orgSchema(locale),
    websiteSchema(locale),
    breadcrumbSchema([
      { name: crumbs[0].label, url: abs(pagePath('home', locale)) },
      { name: page.eyebrow, url: abs(pagePath('about', locale)) },
    ]),
  );

  return (
    <Layout locale={locale} routeKey="about" common={common} seo={seo} headerTheme="light" jsonLd={[ld]}>
      <PageHero eyebrow={page.eyebrow} title={page.h1} lede={r(page.lede)} breadcrumbs={crumbs} />

      <section className="about" data-theme="light" aria-label={page.eyebrow}>
        <div className="container">
          {page.blocks.map((b, i) => (
            <div className="about__block" key={b.h2}>
              <Reveal variant="hair" className="about__line" aria-hidden="true" />
              <div className="about__row">
                <Reveal as="h2" className="about__h2" id={`about-block-${i}`}>
                  {b.h2}
                </Reveal>
                <Reveal delay={1} className="about__text">
                  {b.paragraphs.map((p) => (
                    <p key={p}>{renderPending(r(p))}</p>
                  ))}
                </Reveal>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="principles" data-theme="dark" aria-labelledby="principles-title">
        <div className="container">
          <Reveal as="h2" id="principles-title" className="principles__title">
            {page.principles.h2}
          </Reveal>
          <ul className="principles__list">
            {page.principles.items.map((it, i) => (
              <Reveal as="li" delay={i} className="principles__item" key={it.title}>
                <h3 className="principles__name">{it.title}</h3>
                <p className="principles__text">{it.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="about-cta" data-theme="light" aria-label={common.cta.about}>
        <div className="container about-cta__row">
          <Button variant="ghost" href={pagePath('practice', locale)}>
            {page.cta.practice}
          </Button>
          <Button variant="ghost" href={pagePath('team', locale)}>
            {page.cta.team}
          </Button>
        </div>
      </section>
    </Layout>
  );
}

export function aboutStaticProps(locale, getContent) {
  const { common, seo, page } = getContent(locale, 'about');
  return { props: { locale, common, seo, page } };
}
