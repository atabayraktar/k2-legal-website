import { renderPending } from '../lib/text.js';

// Static map: pre-rendered grayscale OpenStreetMap image (public/images/map.webp, scripts/build-map.mjs). No iframe, no runtime tiles, no tracking.
// With a usable address the whole card links to Google Maps; otherwise it is a plain frame.
// href: string | null. address: display line. openLabel: accessible name prefix ("Haritada aç").
export default function MapCard({ href, address, openLabel, className = '' }) {
  const body = (
    <>
      <img className="map__img" src="/images/map.webp" width="1000" height="800" alt="" loading="lazy" decoding="async" />
      <svg className="map__svg" viewBox="0 0 600 480" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
        {href ? (
          <g className="map__pin">
            <rect x="286" y="226" width="28" height="28" />
            <rect x="296" y="236" width="8" height="8" className="map__pin-dot" />
          </g>
        ) : null}
      </svg>
      <span className="map__credit">© OpenStreetMap</span>
      <span className="map__addr">{renderPending(address)}</span>
      {href ? <span className="visually-hidden">. {openLabel}</span> : null}
      {href ? (
        <span className="map__go" aria-hidden="true">
          &#8599;
        </span>
      ) : null}
    </>
  );

  const cls = `map${href ? ' map--link' : ''}${className ? ` ${className}` : ''}`;
  if (href) {
    return (
      <a className={cls} href={href} target="_blank" rel="noopener noreferrer">
        {body}
      </a>
    );
  }
  return (
    <div className={cls} role="img" aria-label={address}>
      {body}
    </div>
  );
}
