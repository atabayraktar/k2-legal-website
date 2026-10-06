// Horizontal lockup. The superscript 2 is an inline SVG laid over the lockup-without-2 image so it can animate on hover
// (it redraws itself, stroke by stroke). tone: "dark" = logo for light surfaces, "light" = logo for dark surfaces.
export default function Logo({ tone = 'light', className = '', ...rest }) {
  return (
    <span className={`logo logo--${tone}${className ? ` ${className}` : ''}`} {...rest}>
      <img className="logo__img" src={`/logos/k2-horizontal-${tone}-no2.svg`} width="414" height="100" alt="" />
      <svg className="logo__two" viewBox="0 0 414 100" aria-hidden="true" focusable="false">
        <path d="M97 4H120V19H101V34H124" pathLength="100" />
      </svg>
    </span>
  );
}
