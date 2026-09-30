import Reveal from './Reveal';
import images from '../content/images.js';

// Photograph in a deliberate crop with crop marks. name = key of content/images.js (auto-indexed from public/images).
// eager: below the fold but fetched at low priority right after the critical assets (no late pop-in).
// alt: "" for decoration. priority: the one eager image (LCP). aspect: optional re-crop, one of 11-10 3-4 3-2 4-5 4-3 16-9 21-9 16-7.
// Explicit width/height always come from the manifest, so layout shift is zero. No captions: images carry no descriptive text.
export default function ImageFrame({
  name,
  alt = '',
  sizes = '100vw',
  aspect,
  priority = false,
  eager = false,
  crop = true,
  reveal = true,
  className = '',
}) {
  const img = images[name];
  if (!img) return null;
  const cls = `frame${aspect ? ` frame--a-${aspect}` : ''}${className ? ` ${className}` : ''}`;
  const tag = (
    <img
      className="frame__img"
      src={img.src}
      srcSet={img.srcSet}
      sizes={sizes}
      width={img.width}
      height={img.height}
      alt={alt}
      loading={priority || eager ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority ? 'high' : eager ? 'low' : undefined}
    />
  );
  return (
    <figure className={cls}>
      <div className="frame__wrap">
        {reveal && !priority ? (
          <Reveal variant="curtain" now={priority} className="frame__box">
            {tag}
          </Reveal>
        ) : (
          <div className="frame__box">{tag}</div>
        )}
        {crop ? (
          <>
            <span className="frame__crop frame__crop--tl" aria-hidden="true" />
            <span className="frame__crop frame__crop--tr" aria-hidden="true" />
            <span className="frame__crop frame__crop--bl" aria-hidden="true" />
            <span className="frame__crop frame__crop--br" aria-hidden="true" />
          </>
        ) : null}
      </div>
    </figure>
  );
}
