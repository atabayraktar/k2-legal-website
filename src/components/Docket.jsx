// Docket label: "DOSYA 03 / ÇALIŞMA ALANLARI". Variants: h (default), v (vertical), boxed (inverted mark).
// The number may be wax (accent) but only one per viewport, by the caller's choice.
export default function Docket({ n, label, prefix = 'DOSYA', variant = 'h', accent = false, as: Tag = 'p', className = '', ...rest }) {
  const cls = `docket${variant !== 'h' ? ` docket--${variant}` : ''}${className ? ` ${className}` : ''}`;
  return (
    <Tag className={cls} {...rest}>
      {prefix ? <span className="docket__pre">{prefix} </span> : null}
      {n != null ? <span className={`docket__n${accent ? ' docket__n--accent' : ''}`}>{n}</span> : null}
      {label ? <span className="docket__label">{n != null || prefix ? ' / ' : ''}{label}</span> : null}
    </Tag>
  );
}
