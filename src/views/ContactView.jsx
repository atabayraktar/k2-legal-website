import Layout from '../components/Layout';
import ContactSection from '../components/ContactSection';
import Reveal from '../components/Reveal';
import { site } from '../content/site.js';
import { abs, pagePath } from '../lib/routes-util.js';
import { orgSchema, websiteSchema, breadcrumbSchema, faqSchema, graph } from '../lib/schema.js';

// Shared by /iletisim/ and /en/contact/. page = contact content.
export default function ContactView({ locale, common, seo, page }) {
  const ld = graph(
    orgSchema(locale),
    websiteSchema(locale),
    breadcrumbSchema([
      { name: common.breadcrumbs.home, url: abs(pagePath('home', locale)) },
      { name: page.eyebrow, url: abs(pagePath('contact', locale)) },
    ]),
    faqSchema(page.faq.items),
  );

  return (
    <Layout locale={locale} routeKey="contact" common={common} seo={seo} headerTheme="dark" jsonLd={[ld]}>
      <ContactSection
        t={page}
        common={common}
        site={site}
        locale={locale}
        variant="page"
        headingId="page-title"
        heading={{ eyebrow: page.eyebrow, title: page.h1, intro: page.lede, as: 'h1' }}
      />
      <section className="faq" data-theme="light" aria-labelledby="faq-title">
        <div className="container faq__grid">
          <Reveal as="h2" id="faq-title" className="faq__title">
            {page.faq.title}
          </Reveal>
          <dl className="faq__list">
            {page.faq.items.map((it, i) => (
              <Reveal delay={i} className="faq__item" key={it.q}>
                <dt className="faq__q">{it.q}</dt>
                <dd className="faq__a">{it.a}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>
    </Layout>
  );
}

export function contactStaticProps(locale, getContent) {
  const { common, seo, page } = getContent(locale, 'contact');
  return { props: { locale, common, seo, page } };
}
