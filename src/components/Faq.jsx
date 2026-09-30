import Reveal from './Reveal';
import ImageFrame from './ImageFrame';
import Accordion, { AccordionItem } from './Accordion';
import { ROLE } from '../content/images.js';
import { fmt } from '../lib/format.js';
import { siteVars } from '../lib/schema.js';

// SSS: a file of index cards. Each card has a staggered, unlabelled file tab; opening lifts the card (card behind appears)
// and the tab lights up. Single-open, #s-01..#s-06 deep links,
// arrow/Home/End keys between questions. Q/A text is identical to the FAQPage JSON-LD (same source array).
// t = tr.faq.
export default function Faq({ t }) {
  const items = t?.items ?? [];
  const vars = siteVars();
  const ids = items.map((it) => it.id);

  return (
    <section id="sss" className="faq" data-theme="dark" aria-labelledby="sss-title">
      <div className="container">
        <div className="faq__grid">
          <div className="faq__head">
            <Reveal className="faq__head-in">
              <h2 id="sss-title" className="faq__title">
                {t.h2}
              </h2>
              <p className="faq__intro">{t.intro}</p>
            </Reveal>
            <ImageFrame name={ROLE.faq} alt="" aspect="4-5" sizes="(min-width: 1280px) 420px, 100vw" className="faq__photo" />
          </div>

          <Accordion ids={ids} defaultOpen={[]} className="faq__stack">
            {items.map((it, i) => (
              <AccordionItem
                key={it.id}
                id={it.id}
                level={3}
                title={fmt(it.q, vars)}
                className={`faq__item faq__item--o${(i % 3) + 1}`}
                headClassName="faq__head-btn"
                panelClassName="faq__panel"
              >
                <div className="faq__answer">
                  <p className="faq__text">{fmt(it.a, vars)}</p>
                </div>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
