// Square stamp (never rotated). size: md 112px, sm 84px.
export default function Stamp({ size = 'md', className = '', children = 'Tescilli Avukatlık Ortaklığı', ...rest }) {
  return (
    <span className={`stamp${size === 'sm' ? ' stamp--sm' : ''}${className ? ` ${className}` : ''}`} {...rest}>
      <span className="stamp__text">{children}</span>
    </span>
  );
}
