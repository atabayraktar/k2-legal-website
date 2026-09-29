import Link from 'next/link';

const ICONS = {
  phone: <path d="M5 4h4l1.5 4.5-2.3 1.4a11 11 0 0 0 5.9 5.9l1.4-2.3L20 15v4a1.5 1.5 0 0 1-1.6 1.5C10.5 20 4 13.5 3.5 5.6A1.5 1.5 0 0 1 5 4z" />,
  up: <path d="M12 20V4M5 11l7-7 7 7" />,
  whatsapp: (
    <>
      <path d="M3.5 20.5l1.3-4.4A8.5 8.5 0 1 1 8 19.3z" />
      <path d="M9 8.6c.3 2.9 3 5.5 6 6.2l1.1-1.4-2-1-1 .8c-.9-.4-1.7-1.2-2.1-2.1l.8-1-1-2z" fill="currentColor" stroke="none" />
    </>
  ),
};

export default function IconButton({ href, external = false, onClick, label, icon = 'phone', className = '', ...rest }) {
  const cls = `ibtn${icon === 'whatsapp' ? ' ibtn--whatsapp' : ''}${className ? ` ${className}` : ''}`;
  const svg = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" focusable="false">
      {ICONS[icon]}
    </svg>
  );
  if (href && external) {
    return (
      <a className={cls} href={href} aria-label={label} target="_blank" rel="noopener noreferrer" {...rest}>
        {svg}
      </a>
    );
  }
  if (href) {
    return (
      <Link className={cls} href={href} aria-label={label} {...rest}>
        {svg}
      </Link>
    );
  }
  return (
    <button className={cls} type="button" onClick={onClick} aria-label={label} {...rest}>
      {svg}
    </button>
  );
}
