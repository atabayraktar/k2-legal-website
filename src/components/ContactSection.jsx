import Reveal from './Reveal';
import ContactForm from './ContactForm';
import { addressLine } from '../lib/format.js';
import { isPending } from '../lib/pending.js';
import { renderPending } from '../lib/text.js';

// t = contact page content (form strings). heading = { eyebrow?, title, intro?, as? }.
// Placeholder values render as-is; the map is a static block (never an iframe).
export default function ContactSection({ t, common, site, locale, variant = 'home', headingId = 'contact-title', heading }) {
  const L = common.labels;
  const c = site.contact;
  const h = heading ?? { title: t.infoTitle, as: 'h2' };
  const Heading = h.as ?? 'h2';
  const address = addressLine(c.address);
  // The map block exists only once there is a real address (or a supplied map): no empty placeholder rectangle, no dead link.
  const realAddress = !isPending(c.address.street) && !isPending(c.address.city);
  const mapHref =
    c.map?.href ?? (realAddress ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}` : null);
  const showMap = Boolean(mapHref || c.map?.image);

  const rows = [
    { k: L.address, v: <address className="contact__addr">{renderPending(address)}</address> },
    { k: L.phone, v: c.phone.tel ? <a href={`tel:${c.phone.tel}`}>{c.phone.display}</a> : renderPending(c.phone.display) },
    { k: L.email, v: isPending(c.email, { required: true }) ? renderPending(c.email) : <a href={`mailto:${c.email}`}>{c.email}</a> },
    { k: L.kep, v: renderPending(c.kep) },
    { k: L.hours, v: renderPending(c.hours.display) },
    {
      k: L.whatsapp,
      v: c.whatsapp.url ? (
        <a href={c.whatsapp.url} target="_blank" rel="noopener noreferrer">
          {c.whatsapp.display}
        </a>
      ) : (
        renderPending(c.whatsapp.display)
      ),
    },
  ];

  const mapInner = c.map?.image ? (
    <img className="contact__map-img" src={c.map.image.src} width={c.map.image.width} height={c.map.image.height} alt="" loading="lazy" />
  ) : (
    <span className="contact__map-grid" aria-hidden="true" />
  );

  return (
    <section id="contact" className={`contact contact--${variant}`} data-theme="dark" aria-labelledby={headingId}>
      <div className="container">
        <div className="contact__head">
          {h.eyebrow ? (
            <Reveal as="p" now={variant === 'page'} className="eyebrow">
              {h.eyebrow}
            </Reveal>
          ) : null}
          <Reveal as={Heading} now={variant === 'page'} delay={1} id={headingId} className="contact__title">
            {h.title}
          </Reveal>
          {h.intro ? (
            <Reveal as="p" now={variant === 'page'} delay={2} className="contact__intro lede">
              {h.intro}
            </Reveal>
          ) : null}
        </div>
        <div className="contact__cols">
          <Reveal className="contact__info">
            <dl className="contact__list">
              {rows.map((r) => (
                <div className="contact__item" key={r.k}>
                  <dt>{r.k}</dt>
                  <dd>{r.v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <Reveal delay={2} className="contact__form">
            <ContactForm t={t} site={site} locale={locale} />
          </Reveal>
          {showMap ? (
            <Reveal className="contact__map-wrap">
              <figure className="contact__map">
                {mapHref ? (
                  <a className="contact__map-link" href={mapHref} target="_blank" rel="noopener noreferrer">
                    {mapInner}
                    <span className="contact__map-caption">{L.openMap}</span>
                  </a>
                ) : (
                  <div className="contact__map-link">
                    {mapInner}
                    <span className="contact__map-caption">{L.mapPending}</span>
                  </div>
                )}
              </figure>
            </Reveal>
          ) : null}
        </div>
      </div>
    </section>
  );
}
