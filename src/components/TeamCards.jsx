import Reveal from './Reveal';
import IdxCard from './IdxCard';
import Ledger from './Ledger';
import Monogram from './Monogram';
import { fmt } from '../lib/format.js';
import { isPending } from '../lib/pending.js';
import { renderPending } from '../lib/text.js';

// One partner card. Fixed hierarchy, top to bottom:
// 1 file line (Ortak 01)  2 photo frame  3 name  4 unvan  5 ledger (every allowed field, always open: no expander).
// Only fields the advertising rules allow: no biography, cases or clients.
function PartnerCard({ p, i, total, t, common }) {
  const L = t.labels;
  const card = t.card ?? {};
  const fullName = isPending(p.name) ? fmt(common.labels.partner, { n: i + 1 }) : [p.academicTitle, p.name].filter(Boolean).join(' ');
  const unvan = [p.academicTitle, p.professionalTitle].filter(Boolean).join(' ');
  const sicilShown = !isPending(p.baroSicil);

  const rows = [
    { k: L.baro, v: renderPending(p.baro) },
    { k: L.baroSicil, v: renderPending(p.baroSicil) },
    { k: L.tbbSicil, v: renderPending(p.tbbSicil) },
    { k: L.startYear, v: renderPending(p.startYear) },
    { k: L.university, v: renderPending(p.university) },
    { k: L.languages, v: renderPending(p.languages.join(', ')) },
  ];

  return (
    <Reveal as="li" delay={i} className={`team__item team__item--${i + 1}`}>
      <IdxCard className="pcard">
        <div className="pcard__in">
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

          <Ledger className="pcard__ledger" items={rows} />
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
