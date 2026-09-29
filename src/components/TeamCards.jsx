import { useId, useState } from 'react';
import Reveal from './Reveal';
import IdxCard from './IdxCard';
import Ledger from './Ledger';
import Collapse from './Collapse';
import Monogram from './Monogram';
import { fmt } from '../lib/format.js';
import { isPending } from '../lib/pending.js';
import { renderPending } from '../lib/text.js';

const pad = (n) => String(n).padStart(2, '0');

// One partner card. Fixed hierarchy, top to bottom:
// 1 file line (Ortak 01 / 01-02)  2 photo frame  3 name  4 unvan  5 ledger (always visible)  6 expander -> rest of the ledger.
// Only fields the advertising rules allow: no biography, cases or clients.
function PartnerCard({ p, i, total, t, common }) {
  const uid = useId();
  const [open, setOpen] = useState(false);
  const L = t.labels;
  const card = t.card ?? {};
  const fullName = isPending(p.name) ? fmt(common.labels.partner, { n: i + 1 }) : [p.academicTitle, p.name].filter(Boolean).join(' ');
  const unvan = [p.academicTitle, p.professionalTitle].filter(Boolean).join(' ');
  const partnerNo = fmt(common.labels.partner, { n: pad(i + 1) });
  const sicilShown = !isPending(p.baroSicil);

  const always = [
    { k: L.baro, v: renderPending(p.baro) },
    { k: L.baroSicil, v: renderPending(p.baroSicil) },
    { k: L.tbbSicil, v: renderPending(p.tbbSicil) },
  ];
  const more = [
    { k: L.startYear, v: renderPending(p.startYear) },
    { k: L.university, v: renderPending(p.university) },
    { k: L.languages, v: renderPending(p.languages.join(', ')) },
  ];

  return (
    <Reveal as="li" delay={i} className={`team__item team__item--${i + 1}`}>
      <IdxCard className="pcard">
        <div className="pcard__in">
          <div className="pcard__file">
            <span className="pcard__no">{partnerNo}</span>
          </div>

          <div className="pcard__photo">
            {p.photo ? (
              <img className="pcard__img" src={p.photo.src} width={p.photo.width} height={p.photo.height} alt={card.photoAlt ?? ''} loading="lazy" />
            ) : (
              <>
                <Monogram className="pcard__mark" />
                <span className="pcard__ph">{common.labels.photoPending}</span>
              </>
            )}
          </div>

          <h3 className="pcard__name">{fullName}</h3>
          <p className="pcard__unvan">{unvan}</p>

          <Ledger className="pcard__ledger" items={always} />

          <button
            type="button"
            className="pcard__more"
            aria-expanded={open}
            aria-controls={`${uid}-more`}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="pcard__glyph" aria-hidden="true">
              {open ? '−' : '+'}
            </span>
            <span className="pcard__more-t">{open ? card.collapse : card.expand}</span>
          </button>
          <Collapse id={`${uid}-more`} labelledBy={undefined} open={open} role="group" aria-label={card.expand}>
            <Ledger className="pcard__ledger pcard__ledger--more" items={more} />
          </Collapse>
        </div>
      </IdxCard>
    </Reveal>
  );
}

// The two partner cards (list only). The Ekibimiz section shell (ink, sticky heading) belongs to HomeView.
// t = tr.team ({labels, card}); headingId = id of the section h2 (labels the list).
export default function TeamCards({ partners, t, common, headingId = 'ekibimiz-title' }) {
  return (
    <ul className="team__list" aria-labelledby={headingId}>
      {partners.map((p, i) => (
        <PartnerCard key={p.id} p={p} i={i} total={partners.length} t={t} common={common} />
      ))}
    </ul>
  );
}
