import { Bricolage_Grotesque, Courier_Prime, Instrument_Sans } from 'next/font/google';
import { useLenis } from '../hooks/useLenis';
import { usePreloadImages } from '../hooks/usePreloadImages';
import '../styles/index.scss';

// Three families, hard budget (redesign-v2 section 3.2). Only Bricolage 800 + Instrument Sans are on the critical path.
// Display: 800 = section/hero titles, 700 = h3/h4.
const display = Bricolage_Grotesque({
  subsets: ['latin', 'latin-ext'],
  weight: ['800'],
  display: 'swap',
  variable: '--font-display',
});

// Typewriter accent: labels, dockets, captions. Not LCP, so not preloaded.
const mono = Courier_Prime({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '700'],
  display: 'swap',
  preload: false,
  // real monospace fallback (Courier New is 0.6em per glyph, like Courier Prime), so the late swap cannot reflow anything
  adjustFontFallback: false,
  fallback: ['Courier New', 'Courier', 'monospace'],
  variable: '--font-mono',
});

const sans = Instrument_Sans({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '600'],
  display: 'swap',
  variable: '--font-sans',
});

export default function App({ Component, pageProps }) {
  useLenis();
  usePreloadImages();
  return (
    <div className={`${display.variable} ${mono.variable} ${sans.variable} app`}>
      <Component {...pageProps} />
    </div>
  );
}
