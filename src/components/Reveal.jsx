import { useRef } from 'react';
import { useReveal } from '../hooks/useReveal';

// Reveal grammars (one shared IntersectionObserver adds .is-in):
//   up      24px rise + fade (default, plain blocks)
//   line    masked slide-up of a heading line (children sit in an overflow mask)
//   curtain clip-path wipe for images
//   hair    hairline draw (scaleX)
//   fade    opacity only
// now: first-viewport content. No observer and no hidden state, so the text is in the first paint (LCP);
// the CSS-only entrance plays on load instead.
const VARIANTS = new Set(['up', 'line', 'curtain', 'hair', 'fade', 'word']);

export default function Reveal({ as: Tag = 'div', delay = 0, variant = 'up', now = false, className = '', children, ...rest }) {
  const ref = useRef(null);
  useReveal(ref, undefined, !now);
  const v = VARIANTS.has(variant) ? (variant === 'word' ? 'fade' : variant) : 'up';
  const cls = `reveal reveal--${v}${now ? ' reveal--now' : ''}${className ? ` ${className}` : ''}`;
  return (
    <Tag ref={ref} className={cls} data-delay={delay || undefined} {...rest}>
      {v === 'line' ? <span className="reveal__inner">{children}</span> : children}
    </Tag>
  );
}
