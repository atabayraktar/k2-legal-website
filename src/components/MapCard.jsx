import { renderPending } from '../lib/text.js';

// Static map: our own hairline SVG (no iframe, no tiles, no tracking). It is a neutral street grid, not a real map, so it
// never shows an invented place. With a usable address the whole card links to Google Maps (href built from site.js);
// with a placeholder address it is a plain frame with the address text in it.
// href: string | null. address: display line. openLabel: accessible name prefix ("Haritada aç").
const V = [60, 120, 180, 240, 300, 360, 420, 480, 540];
const H = [60, 120, 180, 240, 300, 360, 420];

export default function MapCard({ href, address, openLabel, className = '' }) {
  const body = (
    <>
      <svg className="map__svg" viewBox="0 0 600 480" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
        <g className="map__grid">
          {V.map((x) => (
            <line key={`v${x}`} x1={x} y1="0" x2={x} y2="480" />
          ))}
          {H.map((y) => (
            <line key={`h${y}`} x1="0" y1={y} x2="600" y2={y} />
          ))}
        </g>
        <g className="map__blocks">
          <rect x="72" y="72" width="96" height="96" />
          <rect x="252" y="72" width="96" height="36" />
          <rect x="432" y="192" width="96" height="96" />
          <rect x="72" y="312" width="96" height="36" />
          <rect x="252" y="372" width="96" height="36" />
        </g>
        <g className="map__streets">
          <path d="M0 240H600" />
          <path d="M300 0V480" />
          <path d="M0 420L420 0" />
        </g>
        {href ? (
          <g className="map__pin">
            <rect x="286" y="226" width="28" height="28" />
            <rect x="296" y="236" width="8" height="8" className="map__pin-dot" />
          </g>
        ) : null}
      </svg>
      <span className="map__addr">{renderPending(address)}</span>
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
      <a className={cls} href={href} target="_blank" rel="noopener noreferrer" aria-label={`${openLabel}: ${address}`}>
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
