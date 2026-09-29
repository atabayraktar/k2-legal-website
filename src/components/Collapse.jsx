import { lenisResize } from '../lib/scroll.js';

// Animated height via grid-template-rows 0fr -> 1fr (CSS only). Closed content stays in the DOM for crawlers and find-in-page:
// it is inert + visibility:hidden (visibility flips after the transition), never display:none.
// Animated height changes the page length, so Lenis is told to re-measure when the transition ends.
export default function Collapse({ open = false, id, labelledBy, role = 'region', className = '', children, ...rest }) {
  const onEnd = (e) => {
    if (e.target === e.currentTarget && e.propertyName === 'grid-template-rows') lenisResize();
  };
  return (
    <div
      id={id}
      role={id ? role : undefined}
      aria-labelledby={id ? labelledBy : undefined}
      className={`collapse${open ? ' is-open' : ''}${className ? ` ${className}` : ''}`}
      inert={!open}
      onTransitionEnd={onEnd}
      {...rest}
    >
      <div className="collapse__inner">{children}</div>
    </div>
  );
}
