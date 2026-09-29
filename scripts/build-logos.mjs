// Generates the K2 Legal logo family as real-vector SVGs (text converted to outlines).
import opentype from 'opentype.js';
import fs from 'node:fs';
import path from 'node:path';

const F = 'node_modules/@fontsource/instrument-sans/files/';
const load = (n) => opentype.parse(fs.readFileSync(F + n).buffer.slice(0));
const fonts = {
  600: [load('instrument-sans-latin-600-normal.woff'), load('instrument-sans-latin-ext-600-normal.woff')],
  500: [load('instrument-sans-latin-500-normal.woff'), load('instrument-sans-latin-ext-500-normal.woff')],
};

const INK = '#0B0B0C', PAPER = '#F2EFE9', WAX = '#B3222C', WAX_ON_DARK = '#E0525B';

// text -> outline path, tracked caps
function text(str, weight, size, x, y, tracking = 0) {
  let d = '', cx = x;
  for (const ch of str) {
    const font = fonts[weight].find((f) => f.charToGlyph(ch).index !== 0) || fonts[weight][0];
    const g = font.charToGlyph(ch);
    d += g.getPath(cx, y, size).toPathData(2);
    cx += (g.advanceWidth / font.unitsPerEm) * size + tracking * size;
  }
  return { d, width: cx - x - tracking * size };
}

// K: stem + detached blade ("<"), a hard 4u slit between them. 100u tall.
const K_STEM = 'M0 0H23.5V100H0Z';
const K_BLADE = 'M55.9 0H88.2L47 47L91.2 100H55.9L27.5 63.9V36.1Z';
const K_SOLID = 'M0 0V100H23.5V58.8L55.9 100H91.2L47 47L88.2 0H55.9L23.5 41.2V0Z';
const K_W = 91.2;

// angular superscript 2 (outer box x0..x1, height h, stroke w)
function two(x0, x1, h, w) {
  const r = x1 - w / 2, l = x0 + w / 2;
  return `M${x0} ${w / 2}H${r}V${h / 2}H${l}V${h - w / 2}H${x1}`;
}
const TWO = { x0: 97, x1: 124, h: 38, w: 8 };

function mark({ k = INK, two: c2 = k, solid = false }) {
  const kd = solid ? `<path fill="${k}" d="${K_SOLID}"/>` : `<path fill="${k}" d="${K_STEM}"/><path fill="${k}" d="${K_BLADE}"/>`;
  return kd + `<path fill="none" stroke="${c2}" stroke-width="${TWO.w}" stroke-linejoin="miter" stroke-miterlimit="4" d="${two(TWO.x0, TWO.x1, TWO.h, TWO.w)}"/>`;
}
const MARK_W = TWO.x1; // 126

const svg = (w, h, body, title) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="${title}"><title>${title}</title>${body}</svg>\n`;

const themes = {
  dark: { fg: INK, muted: 'rgba(11,11,12,.62)', accent: WAX, bg: PAPER },   // on light surfaces
  light: { fg: PAPER, muted: 'rgba(242,239,233,.66)', accent: WAX_ON_DARK, bg: INK }, // on dark surfaces
};

const out = {};
for (const [name, t] of Object.entries(themes)) {
  const T = 'Karaman Berat Avukatlık Ortaklığı';
  // 1 mark
  out[`k2-mark-${name}`] = svg(MARK_W, 100, mark({ k: t.fg }), 'Karaman Berat Avukatlık Ortaklığı');
  // 2 mark, accent 2
  out[`k2-mark-accent-${name}`] = svg(MARK_W, 100, mark({ k: t.fg, two: t.accent }), 'Karaman Berat Avukatlık Ortaklığı');
  // 3 seal: square block, K knocked out, ² knocked out
  {
    const S = 120, kh = 70, s = kh / 100;
    const kx = 15, ky = S - 15 - kh;
    const inner = `<g transform="translate(${kx} ${ky}) scale(${s})" fill="${t.bg}"><path d="${K_STEM}"/><path d="${K_BLADE}"/></g>
<path fill="none" stroke="${t.bg}" stroke-width="6" stroke-miterlimit="4" transform="translate(${S - 15 - 19} 15)" d="${two(0, 19, 26, 6)}"/>`;
    out[`k2-seal-${name}`] = svg(S, S, `<rect width="${S}" height="${S}" fill="${t.fg}"/>${inner}`, 'Karaman Berat Avukatlık Ortaklığı');
  }
  // 4 horizontal lockup
  {
    const l1 = text('KARAMAN BERAT', 600, 23, 0, 0, 0.2);
    const l2 = text('AVUKATLIK ORTAKLIĞI', 500, 13.2, 0, 0, 0.34);
    const tx = MARK_W + 34, w = tx + Math.max(l1.width, l2.width);
    const y1 = 47, y2 = 72;
    const p1 = text('KARAMAN BERAT', 600, 23, tx, y1, 0.2).d;
    const p2 = text('AVUKATLIK ORTAKLIĞI', 500, 13.2, tx, y2, 0.34).d;
    const body = mark({ k: t.fg, two: t.accent }) +
      `<path d="M${MARK_W + 17} 6V94" stroke="${t.muted}" stroke-width="1.2" fill="none"/>` +
      `<path fill="${t.fg}" d="${p1}"/><path fill="${t.muted}" d="${p2}"/>`;
    out[`k2-horizontal-${name}`] = svg(Math.ceil(w), 100, body, T);
  }
  // 5 stacked lockup
  {
    const l1 = text('KARAMAN BERAT', 600, 23, 0, 0, 0.2);
    const l2 = text('AVUKATLIK ORTAKLIĞI', 500, 13.2, 0, 0, 0.34);
    const W = Math.max(l1.width, l2.width) + 40;
    const mx = (W - MARK_W) / 2;
    const p1 = text('KARAMAN BERAT', 600, 23, (W - l1.width) / 2, 152, 0.2).d;
    const p2 = text('AVUKATLIK ORTAKLIĞI', 500, 13.2, (W - l2.width) / 2, 178, 0.34).d;
    const body = `<g transform="translate(${mx} 0)">${mark({ k: t.fg, two: t.accent })}</g><path fill="${t.fg}" d="${p1}"/><path fill="${t.muted}" d="${p2}"/>`;
    out[`k2-stacked-${name}`] = svg(Math.ceil(W), 190, body, T);
  }
}

// favicon: transparent background, ink K + wax 2. The 2 is bolder/taller than in the
// logo so it survives 16px; padded to a square so browsers don't crop it.
{
  const T2 = { x0: 97, x1: 126, h: 46, w: 12 };
  const body = `<g transform="translate(0 13)"><path fill="${INK}" d="${K_STEM}"/><path fill="${INK}" d="${K_BLADE}"/><path fill="none" stroke="${WAX}" stroke-width="${T2.w}" stroke-miterlimit="4" d="${two(T2.x0, T2.x1, T2.h, T2.w)}"/></g>`;
  out['k2-favicon'] = svg(126, 126, body, 'K2 Legal');
}

const dir = '.claude/logos';
fs.mkdirSync(dir, { recursive: true });
for (const [n, s] of Object.entries(out)) fs.writeFileSync(path.join(dir, n + '.svg'), s);
console.log(Object.keys(out).join('\n'));
