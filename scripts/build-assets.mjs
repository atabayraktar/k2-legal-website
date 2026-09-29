// Generates public/ assets: logo copies, favicon set, and the 1200x630 Open Graph card.
// usage: npm run assets   (public/logos, public/favicon*, public/apple-touch-icon.png, public/og/og-default.png are committed)
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const SRC = '.claude/logos';
const PUB = 'public';
const LOGOS = [
  'k2-horizontal-dark.svg',
  'k2-horizontal-light.svg',
  'k2-seal-dark.svg',
  'k2-mark-dark.svg',
  'k2-mark-light.svg',
  'k2-mark-accent-dark.svg',
  'k2-mark-accent-light.svg',
];

fs.mkdirSync(path.join(PUB, 'logos'), { recursive: true });
fs.mkdirSync(path.join(PUB, 'og'), { recursive: true });
fs.mkdirSync(path.join(PUB, 'images'), { recursive: true });

for (const f of LOGOS) fs.copyFileSync(path.join(SRC, f), path.join(PUB, 'logos', f));

// favicon = seal
fs.copyFileSync(path.join(SRC, 'k2-seal-dark.svg'), path.join(PUB, 'favicon.svg'));
const seal = fs.readFileSync(path.join(SRC, 'k2-seal-dark.svg'));
await sharp(seal, { density: 600 }).resize(32, 32).png().toFile(path.join(PUB, 'favicon-32.png'));
await sharp(seal, { density: 600 }).resize(180, 180).png().toFile(path.join(PUB, 'apple-touch-icon.png'));

// og card: ink background, light lockup centred, 1px hairline frame inset 48px, no other text
const W = 1200;
const H = 630;
const LOGO_W = 760;
const logo = await sharp(fs.readFileSync(path.join(SRC, 'k2-horizontal-light.svg')), { density: 300 })
  .resize({ width: LOGO_W })
  .png()
  .toBuffer();
const meta = await sharp(logo).metadata();
const frame = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><rect x="48.5" y="48.5" width="${W - 97}" height="${H - 97}" fill="none" stroke="rgba(242,239,233,0.18)" stroke-width="1"/></svg>`,
);
await sharp({ create: { width: W, height: H, channels: 4, background: '#0B0B0C' } })
  .composite([
    { input: frame, top: 0, left: 0 },
    { input: logo, top: Math.round((H - meta.height) / 2), left: Math.round((W - LOGO_W) / 2) },
  ])
  .png({ compressionLevel: 9 })
  .toFile(path.join(PUB, 'og', 'og-default.png'));

console.log('assets written to public/');
