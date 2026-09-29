import Layout from '../components/Layout';
import PageHero from '../components/PageHero';
import PracticeList from '../components/PracticeList';
import { abs, pagePath, practicePath } from '../lib/routes-util.js';
import { orgSchema, websiteSchema, breadcrumbSchema, graph } from '../lib/schema.js';

// Shared by /calisma-alanlari/ and /en/practice-areas/. page = practice content.
export default function PracticeIndexView({ locale, common, seo, page, areas }) {
  const idx = page.index;
  const crumbs = [{ label: common.breadcrumbs.home, href: pagePath('home', locale) }, { label: idx.eyebrow }];
  const ld = graph(
    orgSchema(locale),
    websiteSchema(locale),
    breadcrumbSchema([
      { name: crumbs[0].label, url: abs(pagePath('home', locale)) },
      { name: idx.eyebrow, url: abs(pagePath('practice', locale)) },
    ]),
    {
      '@type': 'ItemList',
      name: idx.h1,
      itemListElement: areas.map((a, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: a.title,
        url: abs(practicePath(a.id, locale)),
      })),
    },
  );

  return (
    <Layout locale={locale} routeKey="practice" common={common} seo={seo} headerTheme="light" jsonLd={[ld]}>
      <PageHero eyebrow={idx.eyebrow} title={idx.h1} lede={idx.lede} breadcrumbs={crumbs} />
      <section className="practice-page" data-theme="light" aria-label={idx.h1}>
        <PracticeList areas={areas} locale={locale} variant="index" />
        {idx.note ? <p className="container practice-page__note">{idx.note}</p> : null}
      </section>
    </Layout>
  );
}

export function practiceIndexStaticProps(locale, getContent) {
  const { common, seo, page } = getContent(locale, 'practice');
  return {
    props: {
      locale,
      common,
      seo,
      page: { index: page.index },
      areas: page.areas.map(({ id, title, oneLine }) => ({ id, title, oneLine })),
    },
  };
}
