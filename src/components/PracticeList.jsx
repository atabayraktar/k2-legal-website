import PracticeRow from './PracticeRow';
import Reveal from './Reveal';
import TextLink from './TextLink';
import { pagePath, practicePath } from '../lib/routes-util.js';

// variant 'home': section with heading block + link to the index; 'index': the bare numbered list.
export default function PracticeList({ areas, locale, variant = 'home', headingId = 'practice-title', t }) {
  const list = (
    <ol className="practice__list" aria-labelledby={variant === 'home' ? headingId : undefined}>
      {areas.map((a, i) => (
        <PracticeRow key={a.id} n={i + 1} index={i} area={a} href={practicePath(a.id, locale)} />
      ))}
    </ol>
  );

  if (variant === 'index') {
    return (
      <div className="practice practice--index">
        {list}
        <Reveal variant="hair" className="practice__end" aria-hidden="true" />
      </div>
    );
  }

  return (
    <section id="practice" className="practice" data-theme="light" aria-labelledby={headingId}>
      <div className="container grid practice__head">
        <Reveal as="p" className="practice__eyebrow eyebrow">
          {t.eyebrow}
        </Reveal>
        <Reveal as="h2" delay={1} id={headingId} className="practice__title">
          {t.title}
        </Reveal>
        <Reveal as="p" delay={2} className="practice__intro lede">
          {t.intro}
        </Reveal>
      </div>
      {list}
      <Reveal variant="hair" className="practice__end" aria-hidden="true" />
      <div className="container practice__foot">
        <TextLink href={pagePath('practice', locale)}>{t.viewAll}</TextLink>
      </div>
    </section>
  );
}
