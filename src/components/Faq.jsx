import Reveal from './Reveal';
import Docket from './Docket';
import Tab from './Tab';
import Typed from './Typed';
import ImageFrame from './ImageFrame';
import Accordion, { AccordionItem } from './Accordion';
import { fmt } from '../lib/format.js';
import { siteVars } from '../lib/schema.js';

// SSS: a file of index cards. Each card has a staggered file tab (S.01..S.06); opening lifts the card (card behind appears),
// the tab lights up, and the answer opens with a typed "Cevap - S.0n" line. Single-open, #s-01..#s-06 deep links,
// arrow/Home/End keys between questions. Q/A text is identical to the FAQPage JSON-LD (same source array).
// t = tr.faq.
export default function Faq({ t }) {
  const items = t?.items ?? [];
  const vars = siteVars();
  const ids = items.map((it) => it.id);
  const label = (i) => `${t.tabPrefix}${String(i + 1).padStart(2, '0')}`;

  return (
    <section id="sss" className="faq" data-theme="dark" aria-labelledby="sss-title">
      <div className="container">
        <div className="faq__grid">
          <div className="faq__head">
            <Reveal className="faq__head-in">
              <Docket className="faq__docket" prefix="" label={t.docket} />
              <h2 id="sss-title" className="faq__title">
                {t.h2}
              </h2>
              <p className="faq__intro">{t.intro}</p>
            </Reveal>
            <ImageFrame name="faq-typewriter" alt="" aspect="4-5" sizes="(min-width: 1280px) 420px, 100vw" className="faq__photo" />
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
                tab={
                  <Tab className="faq__tab" offset={(i % 3) + 1} aria-hidden="true">
                    {label(i)}
                  </Tab>
                }
              >
                <div className="faq__answer">
                  <Typed as="p" className="faq__cevap">
                    {t.answerLabel} — {label(i)}
                  </Typed>
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
