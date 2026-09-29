import IdxCard from './IdxCard';
import ImageFrame from './ImageFrame';
import Mark from './Mark';
import Reveal from './Reveal';
import { useRef } from 'react';
import { useTabs } from '../hooks/useTabs';
import { scrollToEl } from '../lib/scroll.js';

// Ilkeler: "Muhur Masasi". Four rubber stamps in a rack (a vertical tablist); the chosen one presses its impression
// onto the sheet and the sheet fills with that principle. All four panels stay in the DOM (no-JS shows them stacked).
const PREFIX = 'ilke-';

// Double-ruled seal: the index on top, the principle name below. It grows with its word, so no word is ever cut.
// Decorative twin of the tab name, so it is hidden from assistive tech.
function Seal({ index, name }) {
  return (
    <div className="principles__seal" aria-hidden="true">
      <span className="principles__seal-idx">{index}</span>
      <span className="principles__seal-name">{name}</span>
    </div>
  );
}

export default function Principles({ t }) {
  const items = t?.items ?? [];
  const ids = items.map((i) => i.id);
  const sheetRef = useRef(null);
  const { active, listProps, getTabProps, getPanelProps } = useTabs({ ids, hashPrefix: PREFIX, orientation: 'vertical' });

  // stacked layout: bring the sheet into view when a stamp is picked below the fold
  const revealSheet = () => {
    const el = sheetRef.current;
    if (!el || window.innerWidth >= 1024) return;
    if (el.getBoundingClientRect().top > window.innerHeight * 0.55) scrollToEl(el);
  };

  return (
    <section id="ilkeler" className="principles" data-theme="light" aria-labelledby="ilkeler-title">
      <div className="container principles__grid">
        <div className="principles__desk">
          <Reveal className="principles__mark">
            <Mark>{t?.mark}</Mark>
          </Reveal>
          <Reveal as="h2" id="ilkeler-title" delay={1} className="principles__title">
            {t?.h2}
          </Reveal>
          <Reveal as="p" delay={2} className="principles__lede">
            {t?.lede}
          </Reveal>

          <div className="principles__rack" {...listProps} aria-label={t?.rackLabel} onClick={revealSheet}>
            {items.map((it) => {
              const tab = getTabProps(it.id);
              return (
                <div className="principles__slot" role="presentation" key={it.id}>
                  <button
                    {...tab}
                    id={`${PREFIX}${it.id}`}
                    aria-controls={`${PREFIX}${it.id}-panel`}
                    className={`principles__tab${active === it.id ? ' is-active' : ''}`}
                  >
                    <span className="principles__idx">{it.index}</span>
                    <span className="principles__name">{it.name}</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <div className="principles__table" ref={sheetRef}>
          <IdxCard stacked className="principles__sheet">
            <div className="principles__panels">
              {items.map((it) => {
                const panel = getPanelProps(it.id);
                return (
                  <div
                    key={it.id}
                    {...panel}
                    id={`${PREFIX}${it.id}-panel`}
                    aria-labelledby={`${PREFIX}${it.id}`}
                    className="principles__panel"
                  >
                    <p className="principles__sheet-label">
                      <span className="principles__typed">
                        {t?.sheetLabel} {it.index}
                      </span>
                    </p>
                    <div className="principles__lead">
                      <Seal index={it.index} name={it.name} />
                      <h3 className="principles__statement">{it.statement}</h3>
                    </div>
                    <p className="principles__detail">{it.detail}</p>
                  </div>
                );
              })}
            </div>
          </IdxCard>

          <ImageFrame
            name="about-stamp"
            alt=""
            aspect="3-2"
            sizes="(min-width: 1024px) 24vw, 90vw"
            caption={t?.photoCaption}
            className="principles__photo"
          />
        </div>
      </div>
    </section>
  );
}
