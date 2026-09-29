import { Instrument_Sans, Newsreader } from 'next/font/google';
import { useLenis } from '../hooks/useLenis';
import '../styles/index.scss';

// Payload budget: roman display only on the critical path (variable wght, no opsz axis).
// Italic (one emphasised word per page) is a separate, non-preloaded 300 instance and loads lazily.
const serif = Newsreader({
  subsets: ['latin', 'latin-ext'],
  style: ['normal'],
  weight: 'variable',
  display: 'swap',
  variable: '--font-serif',
});

const serifItalic = Newsreader({
  subsets: ['latin', 'latin-ext'],
  style: ['italic'],
  weight: ['300'],
  display: 'swap',
  preload: false,
  variable: '--font-serif-italic',
});

const sans = Instrument_Sans({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-sans',
});

export default function App({ Component, pageProps }) {
  useLenis();
  return (
    <div className={`${serif.variable} ${serifItalic.variable} ${sans.variable} app`}>
      <Component {...pageProps} />
    </div>
  );
}
