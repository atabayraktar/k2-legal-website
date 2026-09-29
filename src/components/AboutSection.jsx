import { useState } from 'react';
import Docket from './Docket';
import Reveal from './Reveal';
import Ledger from './Ledger';
import Collapse from './Collapse';
import ImageFrame from './ImageFrame';
import { fmt } from '../lib/format.js';
import { siteVars } from '../lib/schema.js';
import { renderPending } from '../lib/text.js';

// Hakkimizda (ink). Vertical docket in the gutter, a full-width headline, then a narrow factual column with an inline
// kunye that unfolds in place beside the spiral-stair photo, which hangs past the section bottom onto the bone section.
export default function AboutSection({ t, site }) {
  const [open, setOpen] = useState(false);
  const vars = siteVars();
  const rows = t.kunye.rows
    .filter((r) => !(r.key === 'foundedYear' && site.foundedYear == null))
    .map((r) => ({ k: r.label, v: renderPending(fmt(r.value, vars)) }));

  return (
    <section id="hakkimizda" className="about-section" data-theme="dark" aria-labelledby="hakkimizda-title">
      <div className="container">
        <div className="grid about-section__grid">
          <Docket prefix="" label={t.docket} variant="v" className="about-section__docket" />

          <h2 id="hakkimizda-title" className="about-section__title">
            <Reveal as="span" variant="line">
              {t.h2}
            </Reveal>
          </h2>

          <div className="about-section__text">
            <Reveal as="p" delay={1} className="about-section__lede">
              {t.lede}
            </Reveal>
            <Reveal delay={2} className="about-section__foot">
              <div className="about-section__kunye">
                <button
                  type="button"
                  className="about-section__toggle"
                  aria-expanded={open}
                  aria-controls="hakkimizda-kunye"
                  onClick={() => setOpen((v) => !v)}
                >
                  <span className="about-section__glyph" aria-hidden="true">
                    {open ? '−' : '+'}
                  </span>
                  <span className="about-section__toggle-l">{open ? t.kunye.close : t.kunye.trigger}</span>
                </button>
                <Collapse id="hakkimizda-kunye" open={open}>
                  <Ledger items={rows} className="about-section__ledger" />
                </Collapse>
              </div>
            </Reveal>
          </div>

          <div className="about-section__photo">
            <ImageFrame
              name="about-stair"
              alt=""
              sizes="(min-width: 1024px) 30vw, 100vw"
              caption={t.photoCaption}
              captionClassName="about-section__cap"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
