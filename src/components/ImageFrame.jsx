import Reveal from './Reveal';
import Typed from './Typed';
import images from '../content/images.generated.js';

// Photograph in a deliberate crop with crop marks. name = key of images.generated.js (scripts/build-images.mjs).
// alt: "" for decoration. priority: the one eager image (LCP). aspect: optional re-crop, one of 11-10 3-4 3-2 4-5 4-3 16-9 21-9.
// Explicit width/height always come from the manifest, so layout shift is zero.
export default function ImageFrame({
  name,
  alt = '',
  sizes = '100vw',
  aspect,
  priority = false,
  caption,
  crop = true,
  reveal = true,
  className = '',
  captionClassName = '',
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
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority ? 'high' : undefined}
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
      {caption ? (
        <Typed as="figcaption" className={`frame__cap${captionClassName ? ` ${captionClassName}` : ''}`}>
          {caption}
        </Typed>
      ) : null}
    </figure>
  );
}
