import Layout from '../components/Layout';
import PageHero from '../components/PageHero';
import TeamCards from '../components/TeamCards';
import { site } from '../content/site.js';
import { isPending } from '../lib/pending.js';
import { abs, pagePath } from '../lib/routes-util.js';
import { orgSchema, websiteSchema, breadcrumbSchema, personSchema, graph } from '../lib/schema.js';

// Shared by /ekibimiz/ and /en/team/. page = team content.
export default function TeamView({ locale, common, seo, page }) {
  const crumbs = [{ label: common.breadcrumbs.home, href: pagePath('home', locale) }, { label: page.eyebrow }];
  const people = site.partners.filter((p) => !isPending(p.name)).map(personSchema);
  const ld = graph(
    orgSchema(locale),
    websiteSchema(locale),
    breadcrumbSchema([
      { name: crumbs[0].label, url: abs(pagePath('home', locale)) },
      { name: page.eyebrow, url: abs(pagePath('team', locale)) },
    ]),
    ...people,
  );

  return (
    <Layout locale={locale} routeKey="team" common={common} seo={seo} headerTheme="light" jsonLd={[ld]}>
      <PageHero eyebrow={page.eyebrow} title={page.h1} lede={page.lede} breadcrumbs={crumbs} />
      <section className="team-page" data-theme="light" aria-label={page.h1}>
        <div className="container">
          <TeamCards partners={site.partners} t={page} common={common} locale={locale} variant="full" headingId="page-title" />
          {page.note ? <p className="team-page__note">{page.note}</p> : null}
        </div>
      </section>
    </Layout>
  );
}

export function teamStaticProps(locale, getContent) {
  const { common, seo, page } = getContent(locale, 'team');
  return { props: { locale, common, seo, page } };
}
