import Head from 'next/head';
import Link from 'next/link';
import Button from './Button';
import TextLink from './TextLink';
import Reveal from './Reveal';
import Logo from './Logo';
import { site as SITE } from '../content/site.js';
import { pagePath, practicePath } from '../lib/routes-util.js';
import { useAppointment, appointmentClick } from '../hooks/useAppointment';
import { useSectionNav } from '../hooks/useSectionNav';
import { anchorHref } from '../content/nav.js';

const SRC_SET = '/images/hero-corridor-800.webp 800w, /images/hero-corridor-1400.webp 1400w, /images/hero-corridor-2000.webp 2000w';

// "Koridor": one full-screen frame. The corridor photograph (slow CSS dolly-in) covers the whole hero; a loop of short
// mottos, the areas list and the actions sit on it, the logo in the lower right corner.
export default function Hero({ t }) {
  const { openAppointment } = useAppointment();
  const { go } = useSectionNav();
  return (
    <section id="hero" className="hero" data-theme="dark" aria-labelledby="hero-title">
      <Head>
        <link key="hero-preload" rel="preload" as="image" href="/images/hero-corridor-1400.webp" imageSrcSet={SRC_SET} imageSizes="100vw" fetchPriority="high" />
      </Head>

      <div className="hero__bg" aria-hidden="true">
        <img
          className="hero__img"
          src="/images/hero-corridor-1400.webp"
          srcSet={SRC_SET}
          sizes="100vw"
          width="2000"
          height="1046"
          alt=""
          fetchPriority="high"
          decoding="async"
        />
        <div className="hero__scrim" />
      </div>

      <h1 id="hero-title" className="visually-hidden">
        {SITE.legalName}
      </h1>

      <div className="container hero__content">
        <div className="hero__mottos" aria-hidden="true">
          {t.mottos.map((m) => (
            <p key={m} className="hero__motto">
              {m}
            </p>
          ))}
        </div>

        <Reveal now delay={1} className="hero__foot">
          <div className="hero__info">
            <p className="hero__label">{t.areasLabel}</p>
            <ul className="hero__areas">
              {t.areas.map((a) => (
                <li key={a.id}>
                  <Link className="hero__area" href={practicePath(a.id)}>
                    {a.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="hero__actions">
              <Button variant="primary" href={pagePath('contact')} onClick={appointmentClick(openAppointment)}>
                {t.ctaPrimary}
              </Button>
              <TextLink href={anchorHref('calisma-alanlari')} onClick={go('calisma-alanlari')}>
                {t.ctaSecondary}
              </TextLink>
              <TextLink className="hero__about" href={pagePath('about')}>
                {t.ctaAbout}
              </TextLink>
            </div>
          </div>
          <Logo tone="light" className="hero__logo" />
        </Reveal>
      </div>
    </section>
  );
}
