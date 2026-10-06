import Head from 'next/head';
import Button from './Button';
import TextLink from './TextLink';
import Reveal from './Reveal';
import ImageFrame from './ImageFrame';
import images, { ROLE } from '../content/images.js';
import { pagePath } from '../lib/routes-util.js';
import { useAppointment, appointmentClick } from '../hooks/useAppointment';

const PHOTO_SIZES = '(min-width: 900px) 40vw, calc(100vw - 40px)';

// "Dosya Kapagi": the cover of a case file. A two-row headline that runs beside the photograph (scales of justice, B&W),
// and one general-information line in the gap.
export default function Hero({ t }) {
  const { openAppointment } = useAppointment();
  const photo = images[ROLE.hero];
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
              name={ROLE.hero}
              alt=""
              sizes={PHOTO_SIZES}
              priority
            />
          </div>

          <div className="hero__copy">
            <Reveal as="p" now delay={2} className="hero__slogan">
              {t.slogan}
            </Reveal>
            <Reveal as="p" now delay={2} className="hero__entity">
              {t.entity}
            </Reveal>
            <Reveal now delay={3} className="hero__actions">
              <Button variant="primary" href={pagePath('contact')} onClick={appointmentClick(openAppointment)}>
                {t.ctaPrimary}
              </Button>
              <TextLink href={pagePath('practice')}>{t.ctaSecondary}</TextLink>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
