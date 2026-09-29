import Reveal from './Reveal';
import Typed from './Typed';
import images from '../content/images.generated.js';

// Full-bleed photo band between Ekibimiz and SSS. The one deliberate banner on the site: it separates two ink sections.
export default function PhotoBand({ t }) {
  const wide = images['band-corridor'];
  const narrow = images['band-corridor-m'];
  return (
    <div className="photo-band" data-theme="light">
      <Reveal variant="curtain" className="photo-band__box">
        <picture>
          <source media="(max-width: 767px)" srcSet={narrow.srcSet} width={narrow.width} height={narrow.height} />
          <img
            className="photo-band__img"
            src={wide.src}
            srcSet={wide.srcSet}
            sizes="100vw"
            width={wide.width}
            height={wide.height}
            alt=""
            loading="lazy"
            decoding="async"
          />
        </picture>
      </Reveal>
      <div className="container photo-band__cap-row">
        <Typed className="photo-band__cap">{t.caption}</Typed>
      </div>
    </div>
  );
}
