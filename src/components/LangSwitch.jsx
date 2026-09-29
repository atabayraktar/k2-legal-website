import Link from 'next/link';
import { useT } from '../hooks/useLocale';

export default function LangSwitch({ locale, alternates, className = '' }) {
  const t = useT();
  const items = ['tr', 'en'];
  return (
    <ul className={`lang${className ? ` ${className}` : ''}`} aria-label={t.lang.label}>
      {items.map((l, i) => (
        <li key={l} className="lang__li">
          {i > 0 && <span className="lang__sep" aria-hidden="true" />}
          {l === locale ? (
            <span className="lang__item is-current" aria-current="true" lang={l}>
              <span aria-hidden="true">{t.lang[l]}</span>
              <span className="visually-hidden">{t.lang[`${l}Name`]}</span>
            </span>
          ) : (
            <Link className="lang__item" href={alternates[l]} hrefLang={l} lang={l}>
              <span aria-hidden="true">{t.lang[l]}</span>
              <span className="visually-hidden">{t.lang[`${l}Name`]}</span>
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
}
