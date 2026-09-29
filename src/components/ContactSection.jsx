import Reveal from './Reveal';
import Docket from './Docket';
import Ledger from './Ledger';
import ImageFrame from './ImageFrame';
import ContactForm from './ContactForm';
import { addressLine } from '../lib/format.js';
import { isPending } from '../lib/pending.js';
import { renderPending } from '../lib/text.js';

// İletişim: bone, one shared 2px ink rule across both columns. Both columns open with the same 32px typewriter label row,
// so the heading block (left) and the form (right) start on the same line at >=1024px.
// t = tr.contact (docket, title, intro, formLabel, form strings; whatsappLink optional). The map is a link only (never an iframe).
export default function ContactSection({ t, common, site, headingId = 'iletisim-title', heading }) {
  const h = { docket: t.docket, title: t.title, intro: t.intro, ...heading };
  const L = common.labels;
  const c = site.contact;
  const address = addressLine(c.address);
  const realAddress = !isPending(c.address.street) && !isPending(c.address.city);
  const mapHref =
    c.map?.href ?? (realAddress ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}` : null);

  const rows = [
    { k: L.address, v: renderPending(address) },
    { k: L.phone, v: c.phone.tel ? <a className="contact__a" href={`tel:${c.phone.tel}`}>{c.phone.display}</a> : renderPending(c.phone.display) },
    {
      k: L.email,
      v: isPending(c.email, { required: true }) ? renderPending(c.email) : <a className="contact__a" href={`mailto:${c.email}`}>{c.email}</a>,
    },
    { k: L.kep, v: renderPending(c.kep) },
    { k: L.hours, v: renderPending(c.hours.display) },
    {
      k: L.whatsapp,
      v: c.whatsapp.url ? (
        <a className="contact__a" href={c.whatsapp.url} target="_blank" rel="noopener noreferrer">
          {t.whatsappLink ?? c.whatsapp.display}
        </a>
      ) : (
        renderPending(c.whatsapp.display)
      ),
    },
    mapHref
      ? {
          k: L.openMap,
          v: (
            <a className="contact__a" href={mapHref} target="_blank" rel="noopener noreferrer">
              {L.openMap}
            </a>
          ),
        }
      : null,
  ].filter(Boolean);

  return (
    <section id="iletisim" className="contact" data-theme="light" aria-labelledby={headingId}>
      <div className="container">
        <Reveal variant="hair" className="contact__rule" aria-hidden="true" />
        <div className="contact__grid">
          <div className="contact__info">
            <div className="contact__label-row">
              <Docket prefix="" label={h.docket} />
            </div>
            <h2 id={headingId} className="contact__title">
              {h.title}
            </h2>
            <p className="contact__intro">{h.intro}</p>
            <Ledger className="contact__ledger" items={rows} />
            <ImageFrame
              name="contact-stacks"
              alt=""
              aspect="4-3"
              sizes="(min-width: 1280px) 480px, (min-width: 768px) 60vw, 100vw"
              className="contact__photo"
            />
          </div>
          <div className="contact__form">
            <div className="contact__label-row">
              <Docket prefix="" label={t.formLabel} id="iletisim-form-label" />
            </div>
            <ContactForm t={t} site={site} labelledBy="iletisim-form-label" />
          </div>
        </div>
      </div>
    </section>
  );
}
