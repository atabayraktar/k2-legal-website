import Button from './Button';
import TextLink from './TextLink';
import Monogram from './Monogram';
import { fmt } from '../lib/format.js';
import { renderEm, renderPending } from '../lib/text.js';
import { pagePath } from '../lib/routes-util.js';

// Dark, type-led hero. Lines mask-reveal with CSS keyframes only (no hydration wait, protects LCP).
export default function Hero({ t, site, locale }) {
  const vars = {
    city: site.city,
    baro: site.baro,
    legalName: site.legalName,
    phone: site.contact.phone.display,
    email: site.contact.email,
  };
  return (
    <section id="hero" className="hero" data-theme="dark" aria-labelledby="hero-title">
      <Monogram className="hero__mark" />
      <div className="hero__inner container">
        <p className="hero__eyebrow eyebrow">{t.eyebrow}</p>
        <h1 id="hero-title" className="hero__title">
          {t.lines.map((line, i) => (
            <span key={i}>
              <span className="hero__line" data-i={i}>
                <span className="hero__line-inner">{renderEm(line)}</span>
              </span>
              {i < t.lines.length - 1 ? ' ' : null}
            </span>
          ))}
        </h1>
        <p className="hero__entity">{fmt(t.entity, vars)}</p>
        <div className="hero__actions">
          <Button variant="dark" href="#contact">
            {t.ctaPrimary}
          </Button>
          <TextLink onDark href={pagePath('practice', locale)}>
            {t.ctaSecondary}
          </TextLink>
        </div>
      </div>
      <ul className="hero__cells">
        {t.cells.map((c) => (
          <li className="hero__cell" key={c.label}>
            <span className="hero__cell-label">{c.label}</span>
            <span className="hero__cell-value">{renderPending(fmt(c.value, vars))}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
