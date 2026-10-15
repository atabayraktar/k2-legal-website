// K with angular superscript two. Geometry mirrors scripts/build-logos.mjs (viewBox 0 0 126 100).
// The K's lower part (from the notch vertex, y=47, down) is wax; the clip id is per-instance via useId.
// Size via height on a parent class (or font-size); never rotated, stretched or shadowed.
import { useId } from 'react';

export default function Monogram({ accent = false, className = '', title }) {
  const clipId = `mono-${useId().replace(/:/g, '')}`;
  return (
    <svg
      className={`monogram ${className}`.trim()}
      viewBox="0 0 126 100"
      width="126"
      height="100"
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      focusable="false"
    >
      <path fill="currentColor" d="M0 0H23.5V100H0Z" />
      <path fill="currentColor" d="M55.9 0H88.2L47 47L91.2 100H55.9L27.5 63.9V36.1Z" />
      <clipPath id={clipId}>
        <rect x="-1" y="47" width="93.2" height="54" />
      </clipPath>
      <g className="monogram__low" clipPath={`url(#${clipId})`}>
        <path d="M0 0H23.5V100H0Z" />
        <path d="M55.9 0H88.2L47 47L91.2 100H55.9L27.5 63.9V36.1Z" />
      </g>
      <path
        className={accent ? 'monogram__two monogram__two--accent' : 'monogram__two'}
        fill="none"
        stroke="currentColor"
        strokeWidth="8"
        strokeLinejoin="miter"
        strokeMiterlimit="4"
        d="M97 4H120V19H101V34H124"
      />
    </svg>
  );
}
