import Breadcrumbs from './Breadcrumbs';
import Reveal from './Reveal';
import { plain } from '../lib/text.js';

// Compact title block for standalone prose pages (legal). No home layouts, no eyebrow.
export default function PageHero({ title, as: Tag = 'h1', lede, breadcrumbs, id = 'page-title' }) {
  return (
    <section className="page-hero" aria-labelledby={id}>
      <div className="container">
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
        <Reveal now>
          <Tag id={id} className="page-hero__title">
            {plain(title)}
          </Tag>
        </Reveal>
        {lede && (
          <Reveal now delay={1}>
            <p className="page-hero__lede">{lede}</p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
