import Reveal from './Reveal';
import { fmt } from '../lib/format.js';
import { siteVars } from '../lib/schema.js';

// Hakkimizda (ink). A full-width headline and two plain text blocks side by side (how the partnership came about,
// what it does). No photograph, no eyebrow, no rotated label, no cards.
export default function AboutSection({ t, site, children }) {
  const vars = siteVars();
  const founding = [...t.founding];
  if (site.foundedYear != null) founding.push(fmt(t.foundedSentence, vars));
  if (site.founding?.note) founding.push(site.founding.note);

  return (
    <section id="hakkimizda" className="about-section" data-theme="dark" aria-labelledby="hakkimizda-title">
      <div className="container">
        <div className="about-section__grid">
          <h2 id="hakkimizda-title" className="about-section__title">
            <Reveal as="span" variant="line">
              {t.h2}
            </Reveal>
          </h2>

          <div className="about-section__text">
            <Reveal delay={1} className="about-section__block">
              <h3 className="about-section__h3">{t.foundingTitle}</h3>
              {founding.map((p) => (
                <p className="about-section__p" key={p}>
                  {p}
                </p>
              ))}
            </Reveal>
            <Reveal delay={2} className="about-section__block">
              <h3 className="about-section__h3">{t.activityTitle}</h3>
              {t.activity.map((p) => (
                <p className="about-section__p" key={p}>
                  {p}
                </p>
              ))}
            </Reveal>
          </div>
        </div>
      </div>
      {children}
    </section>
  );
}
