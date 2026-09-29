// Index card: paper face with a hairline offset "card behind". Always light (paper + ink), also on ink sections.
// tab: optional <Tab> node rendered attached to the top edge. stacked: show the card behind always; lifted: show it (animated).
export default function IdxCard({ as: Tag = 'div', tab = null, stacked = false, lifted = false, className = '', children, ...rest }) {
  const cls = `idx-card${stacked ? ' is-stacked' : ''}${lifted ? ' is-lifted' : ''}${className ? ` ${className}` : ''}`;
  return (
    <Tag className={cls} {...rest}>
      {tab}
      <div className="idx-card__stack">
        <span className="idx-card__behind" aria-hidden="true" />
        <div className="idx-card__face">{children}</div>
      </div>
    </Tag>
  );
}
