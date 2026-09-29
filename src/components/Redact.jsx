// Decorative redaction bar (aria-hidden). Never used to hide real text. w: width in ch (6-40, see _Redact.scss).
export default function Redact({ w = 16, className = '' }) {
  return <span className={`redact redact--w${w}${className ? ` ${className}` : ''}`} aria-hidden="true" />;
}
