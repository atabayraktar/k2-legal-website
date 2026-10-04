// One-off: stitches OpenStreetMap tiles around site.contact.geo into public/images/map.webp (grayscale, static, no runtime tiles).
// Attribution "© OpenStreetMap" is rendered in MapCard. Run: node scripts/build-map.mjs
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';
import { site } from '../src/content/site.js';

const { lat, lng } = site.contact.geo;
const Z = 16, T = 256, W = 1000, H = 800;
const n = 2 ** Z;
const fx = ((lng + 180) / 360) * n;
const fy = ((1 - Math.log(Math.tan((lat * Math.PI) / 180) + 1 / Math.cos((lat * Math.PI) / 180)) / Math.PI) / 2) * n;
const x0 = Math.floor(fx) - 2, y0 = Math.floor(fy) - 2, N = 5;
const comps = [];
for (let i = 0; i < N; i++)
  for (let j = 0; j < N; j++) {
    const r = await fetch(`https://tile.openstreetmap.org/${Z}/${x0 + i}/${y0 + j}.png`, { headers: { 'User-Agent': 'k2-legal-site-build/1.0' } });
    if (!r.ok) throw new Error(`tile ${r.status}`);
    comps.push({ input: Buffer.from(await r.arrayBuffer()), left: i * T, top: j * T });
  }
const px = (fx - x0) * T, py = (fy - y0) * T;
mkdirSync('public/images', { recursive: true });
const stitched = await sharp({ create: { width: N * T, height: N * T, channels: 3, background: '#fff' } }).composite(comps).png().toBuffer();
await sharp(stitched)
  .extract({ left: Math.round(px - W / 2), top: Math.round(py - H / 2), width: W, height: H })
  .grayscale().linear(1.15, -12).webp({ quality: 78 }).toFile('public/images/map.webp');
console.log('ok', { lat, lng });
