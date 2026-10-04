import Ledger from './Ledger';
import MapCard from './MapCard';
import ContactForm from './ContactForm';
import { addressLine } from '../lib/format.js';
import { isPending } from '../lib/pending.js';
import { renderPending } from '../lib/text.js';

// İletişim: bone, one shared 2px ink rule across both columns. Heading block (left) and form (right) start on the same line
// at >=1024px. The map is our own static SVG card linking to Google Maps (never an iframe, no tracking).
// t = tr.contact (title, intro, form strings; whatsappLink optional).
export default function ContactSection({ t, common, site, headingId = 'iletisim-title', heading }) {
  const h = { title: t.title, intro: t.intro, ...heading };
  const L = common.labels;
  const c = site.contact;
  const address = addressLine(c.address);
  const realAddress = !isPending(c.address.street) && !isPending(c.address.city);
  // TODO(client): c.map.href overrides; until then the link is built from the address in site.js (only when it is real).
  const mapHref =
    c.map?.href ?? (realAddress ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}` : null);

  // Telefon and WhatsApp are one row: the number is a tel: link (calls; it does not open WhatsApp).
  const rows = [
    { k: L.address, v: renderPending(address) },
    { k: L.phoneWhatsapp, v: c.phone.tel ? <a className="contact__a" href={`tel:${c.phone.tel}`}>{c.phone.display}</a> : renderPending(c.phone.display) },
    {
      k: L.email,
      v: isPending(c.email, { required: true }) ? renderPending(c.email) : <a className="contact__a" href={`mailto:${c.email}`}>{c.email}</a>,
    },
    { k: L.kep, v: renderPending(c.kep) },
    { k: L.hours, v: renderPending(c.hours.display) },
  ];

  return (
    <section id="iletisim" className="contact" data-theme="light" aria-labelledby={headingId}>
      <div className="container">
        <div className="contact__grid">
          <div className="contact__info">
            <h2 id={headingId} className="contact__title">
              {h.title}
            </h2>
            <p className="contact__intro">{h.intro}</p>
            <Ledger className="contact__ledger" items={rows} />
            <MapCard href={mapHref} address={address} openLabel={L.openMap} className="contact__map" />
          </div>
          <div className="contact__form">
            <ContactForm t={t} site={site} headingId="iletisim-form-title" />
          </div>
        </div>
      </div>
    </section>
  );
}
