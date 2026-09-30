import Accordion, { AccordionItem } from './Accordion';
import Button from './Button';
import TextLink from './TextLink';
import ImageFrame from './ImageFrame';
import Reveal from './Reveal';
import { practiceAreas } from '../content/routes.js';
import { ROLE } from '../content/images.js';
import { useSectionNav } from '../hooks/useSectionNav';
import { practicePath } from '../lib/routes-util.js';

// Calisma Alanlari: eight case files that open in place (single-open accordion, #slug deep links).
// areas: full practice content [{ id, title, lede, topics, approach }] (ids match routes.js practiceAreas).
// Every area links to its own page ("Detaylı bilgi için"); the approach text lives on that page.
export default function PracticePanels({ areas = [], t }) {
  const { go } = useSectionNav();
  const items = areas
    .map((a) => {
      const route = practiceAreas.find((r) => r.id === a.id);
      return route ? { ...a, slug: route.slug, page: route.page === true } : null;
    })
    .filter(Boolean);
  const ids = items.map((a) => a.slug);

  return (
    <section id="calisma-alanlari" className="practice-panels" data-theme="dark" aria-labelledby="calisma-alanlari-title">
      <div className="container practice-panels__grid">
        <div className="practice-panels__aside">
          <div className="practice-panels__head">
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
            name={ROLE.practiceHub}
            alt=""
            aspect="4-5"
            sizes="(min-width: 1024px) 24vw, 90vw"
            className="practice-panels__photo"
          />
        </div>

        <Accordion ids={ids} defaultOpen={ids.slice(0, 1)} className="practice-panels__list">
          {items.map((a) => (
            <AccordionItem
              key={a.id}
              id={a.slug}
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

                <div className="practice-panels__actions">
                  <Button href="/#iletisim" variant="primary" onClick={go('iletisim')}>
                    {t?.cta}
                  </Button>
                  <TextLink href={practicePath(a.id)}>{t?.readSeparate}</TextLink>
                </div>
              </div>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
