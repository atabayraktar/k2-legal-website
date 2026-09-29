import Link from 'next/link';
import { Arrow } from './Button';

export default function TextLink({ href, external = false, onDark = false, arrow = true, className = '', children, ...rest }) {
  const cls = `lnk${onDark ? ' lnk--on-dark' : ''}${className ? ` ${className}` : ''}`;
  const inner = (
    <>
      <span>{children}</span>
      {arrow && <Arrow className="lnk__arrow" />}
    </>
  );
  if (external) {
    return (
      <a className={cls} href={href} target="_blank" rel="noopener noreferrer" {...rest}>
        {inner}
      </a>
    );
  }
  return (
    <Link className={cls} href={href} {...rest}>
      {inner}
    </Link>
  );
}
