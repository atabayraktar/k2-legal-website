import { useRef } from 'react';
import { useReveal } from '../hooks/useReveal';

// One reveal style sitewide: 24px up + fade. variant: 'up' | 'hair' (scaleX draw) | 'word' (opacity only).
// now: for first-viewport content. No observer, no hidden state, so the text is in the first paint (LCP);
// only a CSS-only 24px rise (transform, no opacity) plays on load.
export default function Reveal({ as: Tag = 'div', delay = 0, variant = 'up', now = false, className = '', children, ...rest }) {
  const ref = useRef(null);
  useReveal(ref, undefined, !now);
  const cls = `reveal${now ? ' reveal--now' : ''}${variant === 'hair' ? ' reveal--hair' : ''}${variant === 'word' ? ' reveal--word' : ''}${className ? ` ${className}` : ''}`;
  return (
    <Tag ref={ref} className={cls} data-delay={delay || undefined} {...rest}>
      {children}
    </Tag>
  );
}
