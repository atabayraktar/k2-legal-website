import Link from 'next/link';
import Reveal from './Reveal';

export default function PracticeRow({ n, area, href, index = 0 }) {
  return (
    <Reveal as="li" className="practice-row__item" delay={Math.min(index, 5)}>
      <Reveal variant="hair" className="practice-row__line" aria-hidden="true" />
      <Link href={href} className="practice-row">
        <span className="practice-row__inner container">
          <span className="practice-row__num" aria-hidden="true">
            {String(n).padStart(2, '0')}
          </span>
          <span className="practice-row__title">{area.title}</span>
          <span className="practice-row__desc">{area.oneLine}</span>
          <svg className="practice-row__arrow" viewBox="0 0 32 18" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true" focusable="false">
            <path d="M0 9h31M23 1l8 8-8 8" />
          </svg>
        </span>
      </Link>
    </Reveal>
  );
}
