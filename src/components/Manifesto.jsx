import { useEffect, useRef } from 'react';
import Button from './Button';
import Reveal from './Reveal';
import { observeReveal } from '../hooks/useReveal';
import { fmt } from '../lib/format.js';
import { groupWords, renderEm } from '../lib/text.js';
import { pagePath } from '../lib/routes-util.js';

// One paragraph in the DOM (crawlable); word groups lift from faint to full as they scroll into view.
export default function Manifesto({ t, locale, site }) {
  const ref = useRef(null);
  const groups = groupWords(fmt(t.text, { baro: site.baro, city: site.city, legalName: site.legalName }), 3);

  useEffect(() => {
    const els = ref.current ? Array.from(ref.current.querySelectorAll('.manifesto__g')) : [];
    const offs = els.map((el) => observeReveal(el, '0px 0px -22% 0px'));
    return () => offs.forEach((off) => off());
  }, []);

  return (
    <section id="about" className="manifesto" data-theme="light" aria-labelledby="manifesto-label">
      <div className="container grid manifesto__grid">
        <Reveal as="p" id="manifesto-label" className="manifesto__label eyebrow">
          {t.eyebrow}
        </Reveal>
        <p className="manifesto__text" ref={ref}>
          {groups.map((g, i) => (
            <span key={i}>
              <span className="manifesto__g">{renderEm(g)}</span>
              {i < groups.length - 1 ? ' ' : null}
            </span>
          ))}
        </p>
        <Reveal className="manifesto__cta">
          <Button variant="ghost" href={pagePath('about', locale)}>
            {t.cta}
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
