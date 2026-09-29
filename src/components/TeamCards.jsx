import Reveal from './Reveal';
import Monogram from './Monogram';
import { fmt } from '../lib/format.js';
import { isPending } from '../lib/pending.js';
import { renderPending } from '../lib/text.js';

// t = the team page content ({ labels, factsTemplate }). Only fields the advertising rules allow.
export default function TeamCards({ partners, t, common, variant = 'home', headingId }) {
  const L = t.labels;
  // Home embeds the cards under its own h2 ("Ortaklar"); on /ekibimiz/ they follow the h1, so names are h2 there (no skipped level).
  const Name = variant === 'full' ? 'h2' : 'h3';
  return (
    <ul className={`team__list team__list--${variant}`} aria-labelledby={headingId}>
      {partners.map((p, i) => {
        // Display-scale headings never carry a bracket token: fall back to "Ortak 1" until the name is supplied.
        const fullName = isPending(p.name)
          ? fmt(common.labels.partner, { n: i + 1 })
          : [p.academicTitle, p.name].filter(Boolean).join(' ');
        const facts = [
          [L.title, p.professionalTitle],
          [L.baro, p.baro],
          [L.baroSicil, p.baroSicil],
          [L.tbbSicil, p.tbbSicil],
          [L.startYear, p.startYear],
          [L.university, p.university],
          [L.languages, p.languages.join(', ')],
        ];
        return (
          <Reveal as="li" key={p.id} delay={i} className="team-card">
            <div className="team-card__photo">
              {p.photo ? (
                <img className="team-card__img" src={p.photo.src} width={p.photo.width} height={p.photo.height} alt={fullName} loading="lazy" />
              ) : (
                <>
                  <Monogram className="team-card__mark" />
                  <span className="team-card__caption">{common.labels.photoPending}</span>
                </>
              )}
            </div>
            <div className="team-card__body">
              <Name className="team-card__name">{fullName}</Name>
              <dl className="team-card__facts">
                {facts.map(([k, v]) => (
                  <div className="team-card__row" key={k}>
                    <dt>{k}</dt>
                    <dd>{renderPending(v)}</dd>
                  </div>
                ))}
              </dl>
              {variant === 'full' && t.factsTemplate ? (
                <p className="team-card__sentence">
                  {renderPending(fmt(t.factsTemplate, { name: fullName, startYear: p.startYear, university: p.university }))}
                </p>
              ) : null}
            </div>
          </Reveal>
        );
      })}
    </ul>
  );
}
