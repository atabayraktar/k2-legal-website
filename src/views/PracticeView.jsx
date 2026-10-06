import { useEffect } from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import Reveal from '../components/Reveal';
import Tab from '../components/Tab';
import IdxCard from '../components/IdxCard';
import ImageFrame from '../components/ImageFrame';
import Button from '../components/Button';
import TextLink from '../components/TextLink';
import { FEATURES } from '../content/site.js';
import { abs, pagePath, practiceArea, practicePath, practiceIdBySlug, practiceSlugs } from '../lib/routes-util.js';
import { practiceAreas } from '../content/routes.js';
import images, { practiceBannerName } from '../content/images.js';
import { orgSchema, websiteSchema, breadcrumbSchema, serviceSchema, graph } from '../lib/schema.js';

const pad = (n) => String(n).padStart(2, '0');

// "Dosya" page: one of the five practice areas. detail = practice.detail strings.
export default function PracticeView({ common, seo, detail, area, slug, prev, next }) {
  const url = abs(practicePath(area.id));
  // Fragments are not valid crumb URLs, so the structured data lists two items only.
  const ld = graph(
    orgSchema(),
    websiteSchema(),
    breadcrumbSchema([
      { name: common.breadcrumbs.home, url: abs(pagePath('home')) },
      { name: area.title, url },
    ]),
    FEATURES.practiceConfirmed ? serviceSchema(area, url) : null,
  );

  // Warm the neighbours' banners so previous/next lands with the photograph already cached.
  useEffect(() => {
    const warm = () =>
      [prev, next].forEach((n) => {
        const img = images[practiceBannerName(practiceArea(n.id)?.slug)];
        if (img) new Image().src = img.src;
      });
    const t = window.setTimeout(warm, 1200);
    return () => window.clearTimeout(t);
  }, [prev, next]);

  return (
    <Layout routeKey="practiceDetail" params={{ id: area.id }} common={common} seo={seo} headerTheme="light" jsonLd={[ld]}>
      <article className="case" key={slug} aria-labelledby="case-title">
        <div className="container">
          <div className="case__grid">
            <aside className="case__side">
              <IdxCard stacked className="case__card">
                <div className="case__card-in">
                  <Reveal now as="h1" id="case-title" className="case__title">
                    {area.title}
                  </Reveal>
                  <div className="case__summary">
                    <p className="case__summary-text">{area.oneLine}</p>
                  </div>
                </div>
              </IdxCard>
            </aside>

            <div className="case__main">
              <Reveal as="p" now className="case__lede">
                {area.lede}
              </Reveal>

              <section className="case__block" aria-labelledby="case-topics">
                <h2 id="case-topics" className="case__h2">
                  {detail.topicsTitle}
                </h2>
                <ol className="case__topics">
                  {area.topics.map((tp, i) => (
                    <Reveal as="li" now={i < 3} delay={Math.min(i, 4)} className="case__topic" key={tp}>
                      <span className="case__topic-n" aria-hidden="true">
                        {pad(i + 1)}
                      </span>
                      <span>{tp}</span>
                    </Reveal>
                  ))}
                </ol>
              </section>

              <section className="case__block" aria-labelledby="case-approach">
                <h2 id="case-approach" className="case__h2">
                  {detail.approachTitle}
                </h2>
                <p className="case__approach">{area.approach}</p>
              </section>

              <section className="case__block case__cta" aria-labelledby="case-cta">
                <h2 id="case-cta" className="case__h2">
                  {detail.ctaTitle}
                </h2>
                <p className="case__cta-text">{detail.ctaText}</p>
                <div className="case__actions">
                  <Button variant="primary" href={pagePath('contact')}>
                    {detail.ctaButton}
                  </Button>
                  <TextLink href={pagePath('home')}>{detail.backHome}</TextLink>
                </div>
              </section>
            </div>
          </div>
        </div>

        <div className="case__band">
          <ImageFrame name={practiceBannerName(slug)} aspect="16-7" crop={false} eager sizes="100vw" />
        </div>
      </article>

      <nav className="case-nav" aria-label={detail.navLabel}>
        <div className="container">
          <div className="case-nav__grid">
            <IdxCard stacked className="case-nav__card" tab={<Tab offset={1}>{detail.prev}</Tab>}>
              <Link className="case-nav__link" href={practicePath(prev.id)} rel="prev">
                <span className="case-nav__glyph" aria-hidden="true">
                  &lt;
                </span>
                <span className="case-nav__title">{prev.title}</span>
              </Link>
            </IdxCard>
            <IdxCard stacked className="case-nav__card case-nav__card--next" tab={<Tab offset={2}>{detail.next}</Tab>}>
              <Link className="case-nav__link" href={practicePath(next.id)} rel="next">
                <span className="case-nav__title">{next.title}</span>
                <span className="case-nav__glyph" aria-hidden="true">
                  &gt;
                </span>
              </Link>
            </IdxCard>
          </div>
          <p className="case-nav__all">
            <TextLink href={pagePath('practice')}>{detail.allAreas}</TextLink>
          </p>
        </div>
      </nav>
    </Layout>
  );
}

export function practiceDetailPaths() {
  return { paths: practiceSlugs().map((slug) => ({ params: { slug } })), fallback: false };
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

export function practiceStaticProps(slug, getContent) {
  const id = practiceIdBySlug(slug);
  const { common, page, all } = getContent('practice');
  const area = page.areas.find((a) => a.id === id);
  const flagships = practiceAreas.filter((a) => a.page); // all five today
  const i = flagships.findIndex((a) => a.id === id);
  const n = flagships.length;
  const brief = (f) => ({ id: f.id, title: page.areas.find((a) => a.id === f.id).title });
  const meta = all.seo.areas?.[id];
  return {
    props: {
      common,
      seo: { title: meta?.title ?? area.title, description: meta?.description ?? describe(area) },
      detail: page.detail,
      area,
      slug,
      prev: brief(flagships[(i - 1 + n) % n]),
      next: brief(flagships[(i + 1) % n]),
    },
  };
}
