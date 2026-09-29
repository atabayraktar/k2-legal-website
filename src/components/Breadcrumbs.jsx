import Link from 'next/link';
import { useT } from '../hooks/useCommon';

export default function Breadcrumbs({ items }) {
  const t = useT();
  return (
    <nav className="breadcrumbs" aria-label={t.breadcrumbs.label}>
      <ol className="breadcrumbs__list">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li className="breadcrumbs__item" key={`${item.label}-${i}`}>
              {item.href && !last ? (
                <Link className="breadcrumbs__link" href={item.href}>
                  {item.label}
                </Link>
              ) : (
                <span aria-current={last ? 'page' : undefined}>{item.label}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
