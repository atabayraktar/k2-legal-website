import Head from 'next/head';
import Button from './Button';
import TextLink from './TextLink';
import Reveal from './Reveal';
import Typed from './Typed';
import Stamp from './Stamp';
import ImageFrame from './ImageFrame';
import images from '../content/images.generated.js';
import { fmt } from '../lib/format.js';
import { siteVars } from '../lib/schema.js';
import { renderPending } from '../lib/text.js';
import { pagePath } from '../lib/routes-util.js';

const PHOTO_SIZES = '(min-width: 900px) 40vw, calc(100vw - 40px)';

// "Dosya Kapagi": the cover of a case file. Typed meta band, a two-row headline that runs under the tower photo,
// the entity statement in the gap between the rows, a square stamp on the photo corner and one typed kunye line.
export default function Hero({ t }) {
  const vars = siteVars();
  const photo = images['hero-tower'];
  return (
    <section id="hero" className="hero" data-theme="light" aria-labelledby="hero-title">
      <Head>
        <link
          key="hero-preload"
          rel="preload"
          as="image"
          href={photo.src}
          imageSrcSet={photo.srcSet}
          imageSizes={PHOTO_SIZES}
          fetchPriority="high"
        />
      </Head>
      <div className="container hero__frame">
        <div className="hero__meta">
          <Typed now className="hero__meta-l">
            {t.metaLeft}
          </Typed>
          <Typed now className="hero__meta-r">
            {renderPending(fmt(t.metaRight, vars))}
          </Typed>
          <span className="hero__reg hero__reg--1" aria-hidden="true" />
          <span className="hero__reg hero__reg--2" aria-hidden="true" />
          <span className="hero__reg hero__reg--3" aria-hidden="true" />
        </div>

        <div className="hero__grid">
          <h1 id="hero-title" className="hero__title">
            <span className="hero__row hero__row--1">
              <Reveal as="span" variant="line" now>
                {t.lines[0]}
              </Reveal>
            </span>{' '}
            <span className="hero__row hero__row--2">
              <Reveal as="span" variant="line" now delay={1}>
                {t.lines[1]}
              </Reveal>
            </span>
          </h1>

          <div className="hero__photo">
            <ImageFrame
              name="hero-tower"
              alt=""
              sizes={PHOTO_SIZES}
              priority
              caption={t.photoCaption}
              captionClassName="hero__cap"
            />
            <Stamp className="hero__stamp">{t.stamp}</Stamp>
          </div>

          <div className="hero__copy">
            <Reveal as="p" now delay={2} className="hero__entity">
              {t.entity}
            </Reveal>
            <Reveal now delay={3} className="hero__actions">
              <Button variant="primary" href={pagePath('contact')}>
                {t.ctaPrimary}
              </Button>
              <TextLink href={pagePath('practice')}>{t.ctaSecondary}</TextLink>
            </Reveal>
          </div>
        </div>

        <ul className="hero__kunye">
          {t.kunye.map((k) => (
            <li className="hero__kunye-i" key={k.label}>
              <span className="hero__kunye-k">{k.label}:</span> {renderPending(fmt(k.value, vars))}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
