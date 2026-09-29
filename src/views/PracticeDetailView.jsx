import Link from 'next/link';
import Layout from '../components/Layout';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import Button, { Arrow } from '../components/Button';
import TextLink from '../components/TextLink';
import { FEATURES } from '../content/site.js';
import { abs, pagePath, practicePath, practiceIdBySlug, practiceSlugs } from '../lib/routes-util.js';
import { orgSchema, websiteSchema, breadcrumbSchema, serviceSchema, graph } from '../lib/schema.js';

const pad = (n) => String(n).padStart(2, '0');

// Shared by every /calisma-alanlari/[slug]/ and /en/practice-areas/[slug]/. detail = practice.detail strings.
export default function PracticeDetailView({ locale, common, seo, detail, indexLabel, area, position, total, prev, next }) {
  const url = abs(practicePath(area.id, locale));
  const crumbs = [
    { label: common.breadcrumbs.home, href: pagePath('home', locale) },
    { label: indexLabel, href: pagePath('practice', locale) },
    { label: area.title },
  ];
  const ld = graph(
    orgSchema(locale),
    websiteSchema(locale),
    breadcrumbSchema([
      { name: crumbs[0].label, url: abs(pagePath('home', locale)) },
      { name: indexLabel, url: abs(pagePath('practice', locale)) },
      { name: area.title, url },
    ]),
    FEATURES.practiceConfirmed ? serviceSchema(area, url) : null,
  );

  return (
    <Layout
      locale={locale}
      routeKey="practiceDetail"
      params={{ id: area.id }}
      common={common}
      seo={seo}
      headerTheme="light"
      jsonLd={[ld]}
    >
      <PageHero
        eyebrow={`${indexLabel} — ${pad(position)} / ${pad(total)}`}
        title={area.title}
        lede={area.lede}
        breadcrumbs={crumbs}
      />

      <section className="area" data-theme="light" aria-label={area.title}>
        <div className="container">
          <div className="area__block">
            <Reveal variant="hair" className="area__line" aria-hidden="true" />
            <div className="area__row">
              <Reveal as="h2" className="area__h2" id="area-topics">
                {detail.topicsTitle}
              </Reveal>
              <ul className="area__topics" aria-labelledby="area-topics">
                {area.topics.map((tp, i) => (
                  <Reveal as="li" delay={Math.min(i, 5)} className="area__topic" key={tp}>
                    {tp}
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
          <div className="area__block">
            <Reveal variant="hair" className="area__line" aria-hidden="true" />
            <div className="area__row">
              <Reveal as="h2" className="area__h2" id="area-approach">
                {detail.approachTitle}
              </Reveal>
              <Reveal delay={1} className="area__approach">
                <p>{area.approach}</p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="area-cta" data-theme="dark" aria-labelledby="area-cta-title">
        <div className="container area-cta__inner">
          <Reveal as="h2" id="area-cta-title" className="area-cta__title">
            {detail.ctaTitle}
          </Reveal>
          <Reveal delay={1} className="area-cta__body">
            <p className="area-cta__text">{detail.ctaText}</p>
            <div className="area-cta__actions">
              <Button variant="wax" href={pagePath('contact', locale)}>
                {detail.ctaButton}
              </Button>
              <TextLink href={pagePath('practice', locale)} onDark>
                {detail.backToIndex}
              </TextLink>
            </div>
          </Reveal>
        </div>
      </section>

      <nav className="area-nav" data-theme="light" aria-label={detail.navLabel}>
        <div className="container area-nav__grid">
          <Link className="area-nav__link area-nav__link--prev" href={practicePath(prev.id, locale)} rel="prev">
            <span className="area-nav__label eyebrow">{detail.prev}</span>
            <span className="area-nav__title">
              <Arrow className="area-nav__arrow area-nav__arrow--prev" />
              <span>{prev.title}</span>
            </span>
          </Link>
          <Link className="area-nav__link area-nav__link--next" href={practicePath(next.id, locale)} rel="next">
            <span className="area-nav__label eyebrow">{detail.next}</span>
            <span className="area-nav__title">
              <span>{next.title}</span>
              <Arrow className="area-nav__arrow" />
            </span>
          </Link>
        </div>
      </nav>
    </Layout>
  );
}

export function practiceDetailPaths(locale) {
  return { paths: practiceSlugs(locale).map((slug) => ({ params: { slug } })), fallback: false };
}

// First sentences of the lede that fit the 155-char meta description budget.
function describe(area) {
  const sentences = area.lede.match(/[^.]+\./g) ?? [area.lede];
  let out = '';
  for (const s of sentences) {
    const next = `${out}${out ? ' ' : ''}${s.trim()}`;
    if (next.length > 155) break;
    out = next;
  }
  return out || `${area.title}. ${area.oneLine}`;
}

export function practiceDetailStaticProps(locale, slug, getContent) {
  const id = practiceIdBySlug(slug, locale);
  const { common, page } = getContent(locale, 'practice');
  const i = page.areas.findIndex((a) => a.id === id);
  const n = page.areas.length;
  const area = page.areas[i];
  const brief = ({ id: aid, title }) => ({ id: aid, title });
  return {
    props: {
      locale,
      common,
      seo: { title: area.title, description: describe(area) },
      detail: page.detail,
      indexLabel: page.index.eyebrow,
      area,
      position: i + 1,
      total: n,
      prev: brief(page.areas[(i - 1 + n) % n]),
      next: brief(page.areas[(i + 1) % n]),
    },
  };
}
