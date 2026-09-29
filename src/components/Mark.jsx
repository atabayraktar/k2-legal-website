// Inverted label: takes the section's foreground as background, so it flips on ink sections automatically.
export default function Mark({ as: Tag = 'span', className = '', children, ...rest }) {
  return (
    <Tag className={`mark${className ? ` ${className}` : ''}`} {...rest}>
      {children}
    </Tag>
  );
}
