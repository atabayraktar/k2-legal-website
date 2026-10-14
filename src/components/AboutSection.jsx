import Reveal from './Reveal';
import { fmt } from '../lib/format.js';
import { siteVars } from '../lib/schema.js';

// Hakkimizda (ink). A full-width headline and two plain text blocks side by side (how the partnership came about,
// what it does). No photograph, no eyebrow, no rotated label, no cards.
export default function AboutSection({ t, site, children, headingAs: Heading = 'h2' }) {
  const first = Heading === 'h1'; // standalone page: this block is the first viewport, so it must be in the first paint (LCP)
  const Sub = Heading === 'h1' ? 'h2' : 'h3';
  const vars = siteVars();
  const founding = [...t.founding];
  if (site.foundedYear != null) founding.push(fmt(t.foundedSentence, vars));
  if (site.founding?.note) founding.push(site.founding.note);

  return (
    <section id="hakkimizda" className="about-section" data-theme="dark" aria-labelledby="hakkimizda-title">
      <div className="container">
        <div className="about-section__grid">
          <Heading id="hakkimizda-title" className="about-section__title">
            <Reveal as="span" variant="line" now={first}>
              {t.h2}
            </Reveal>
          </Heading>

          <div className="about-section__text">
            <Reveal delay={1} now={first} className="about-section__block">
              <Sub className="about-section__h3">{t.foundingTitle}</Sub>
              {founding.map((p) => (
                <p className="about-section__p" key={p}>
                  {p}
                </p>
              ))}
            </Reveal>
            <Reveal delay={2} now={first} className="about-section__block">
              <Sub className="about-section__h3">{t.activityTitle}</Sub>
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
