import { useRef } from 'react';
import { useReveal } from '../hooks/useReveal';

// Typewriter caption. The full text is always in the DOM; the wipe is a CSS clip-path in 28 steps on the inner span,
// started when the (unclipped) wrapper is observed (.is-in). Reduced motion and no-JS show the final state.
export default function Typed({ as: Tag = 'p', className = '', now = false, children, ...rest }) {
  const ref = useRef(null);
  useReveal(ref, undefined, !now);
  return (
    <Tag ref={ref} className={`typed${now ? ' is-in' : ''}${className ? ` ${className}` : ''}`} {...rest}>
      <span className="typed__t">{children}</span>
    </Tag>
  );
}
