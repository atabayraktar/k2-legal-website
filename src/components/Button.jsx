import Link from 'next/link';

export function Arrow({ className }) {
  return (
    <svg className={className} viewBox="0 0 18 10" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true" focusable="false">
      <path d="M0 5h17M12.5 1l4.5 4-4.5 4" />
    </svg>
  );
}

export default function Button({
  variant = 'primary',
  size = 'md',
  href,
  external = false,
  onClick,
  type = 'button',
  disabled = false,
  arrow = true,
  className = '',
  children,
  ...rest
}) {
  const cls = `btn btn--${variant}${size === 'sm' ? ' btn--sm' : ''}${className ? ` ${className}` : ''}`;
  const inner = (
    <>
      <span className="btn__label">{children}</span>
      {arrow && <Arrow className="btn__arrow" />}
    </>
  );

  if (href && external) {
    return (
      <a className={cls} href={href} target="_blank" rel="noopener noreferrer" aria-disabled={disabled || undefined} {...rest}>
        {inner}
      </a>
    );
  }
  if (href) {
    return (
      <Link className={cls} href={href} aria-disabled={disabled || undefined} {...rest}>
        {inner}
      </Link>
    );
  }
  return (
    <button className={cls} type={type} onClick={onClick} disabled={disabled} {...rest}>
      {inner}
    </button>
  );
}
