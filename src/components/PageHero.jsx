import Breadcrumbs from './Breadcrumbs';
import Reveal from './Reveal';
import { renderEm } from '../lib/text.js';

export default function PageHero({ eyebrow, title, as: Tag = 'h1', lede, breadcrumbs, id = 'page-title', children }) {
  return (
    <section className="page-hero" data-theme="light" aria-labelledby={id}>
      <div className="container">
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
        {eyebrow && (
          <Reveal now className="page-hero__eyebrow">
            <p className="eyebrow">{eyebrow}</p>
          </Reveal>
        )}
        <Reveal now delay={1}>
          <Tag id={id} className="page-hero__title">
            {renderEm(title)}
          </Tag>
        </Reveal>
        {lede && (
          <Reveal now delay={2}>
            <p className="page-hero__lede">{lede}</p>
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}
