import Accordion, { AccordionItem } from './Accordion';
import Button from './Button';
import TextLink from './TextLink';
import ImageFrame from './ImageFrame';
import Reveal from './Reveal';
import Tab from './Tab';
import { practiceAreas } from '../content/routes.js';
import { practicePath } from '../lib/routes-util.js';

// Calisma Alanlari: eight case files that open in place (single-open accordion, #slug deep links).
// areas: full practice content [{ id, title, lede, topics, approach }] (ids match routes.js practiceAreas).
// Flagship areas (page: true) link to their own page and keep the approach text there; the other five carry the
// approach paragraph inline, because they have no page of their own.
const pad = (n) => String(n).padStart(2, '0');

export default function PracticePanels({ areas = [], t }) {
  const items = areas
    .map((a) => {
      const route = practiceAreas.find((r) => r.id === a.id);
      return route ? { ...a, slug: route.slug, page: route.page === true } : null;
    })
    .filter(Boolean);
  const ids = items.map((a) => a.slug);
  const prefix = t?.indexPrefix ?? 'A.';

  return (
    <section id="calisma-alanlari" className="practice-panels" data-theme="dark" aria-labelledby="calisma-alanlari-title">
      <div className="container practice-panels__grid">
        <div className="practice-panels__aside">
          <div className="practice-panels__head">
            <Tab open className="practice-panels__tab">
              {t?.tab}
            </Tab>
            <div className="practice-panels__lead">
              <Reveal as="h2" id="calisma-alanlari-title" className="practice-panels__title">
                {t?.h2}
              </Reveal>
              <Reveal as="p" delay={1} className="practice-panels__intro">
                {t?.intro}
              </Reveal>
            </div>
          </div>
          <ImageFrame
            name="practice-archive"
            alt=""
            aspect="4-5"
            sizes="(min-width: 1024px) 24vw, 90vw"
            caption={t?.photoCaption}
            className="practice-panels__photo"
          />
        </div>

        <Accordion ids={ids} defaultOpen={ids.slice(0, 1)} className="practice-panels__list">
          {items.map((a, i) => (
            <AccordionItem
              key={a.id}
              id={a.slug}
              index={`${prefix}${pad(i + 1)}`}
              title={a.title}
              level={3}
              className="practice-panels__item"
              headClassName="practice-panels__btn"
              panelClassName="practice-panels__panel"
            >
              <div className="practice-panels__sheet">
                <p className="practice-panels__lede">{a.lede}</p>

                <div className="practice-panels__block">
                  <p className="practice-panels__label">{t?.topicsLabel}</p>
                  <ul className="practice-panels__topics">
                    {a.topics.map((topic) => (
                      <li key={topic}>{topic}</li>
                    ))}
                  </ul>
                </div>

                {!a.page && a.approach ? (
                  <div className="practice-panels__block">
                    <p className="practice-panels__label">{t?.approachLabel}</p>
                    <p className="practice-panels__approach">{a.approach}</p>
                  </div>
                ) : null}

                <div className="practice-panels__actions">
                  <Button href="/#iletisim" variant="primary">
                    {t?.cta}
                  </Button>
                  {a.page ? <TextLink href={practicePath(a.id)}>{t?.readSeparate}</TextLink> : null}
                </div>
              </div>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
