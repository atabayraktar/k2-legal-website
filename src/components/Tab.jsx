// File tab: a small rectangle attached to the top edge of a block. offset 1-3 staggers tabs like index dividers.
// open = filled (ink) state. Pass as="button"/"a" and props for an interactive tab.
export default function Tab({ as: Tag = 'span', offset = 0, open = false, className = '', children, ...rest }) {
  const cls = `tab${offset ? ` tab--o${offset}` : ''}${open ? ' is-open' : ''}${className ? ` ${className}` : ''}`;
  return (
    <Tag className={cls} {...rest}>
      {children}
    </Tag>
  );
}
