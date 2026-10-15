// Renders the e-mail signature banner (public/logos/k2-signature.png) with the site's own fonts and the light logo.
// Run after `npm run build` (reads the font files from out/_next/static). Output is committed to public/.
import puppeteer from 'puppeteer-core';
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const CHROME = 'C:/Users/ataba/.cache/puppeteer/chrome/win64-146.0.7680.153/chrome-win64/chrome.exe';
const root = process.cwd();
const cssDir = path.join(root, 'out/_next/static/chunks');
const css = fs.readdirSync(cssDir).filter((f) => f.endsWith('.css')).map((f) => fs.readFileSync(path.join(cssDir, f), 'utf8')).join('\n');
const faces = (css.match(/@font-face\{[^}]*\}/g) || [])
  .filter((f) => /url\(/.test(f))
  .map((f) => f.replace(/url\(([^)]+)\)/, (_, u) => `url(${pathToFileURL(path.resolve(cssDir, u.replace(/["']/g, ''))).href})`))
  .join('\n');
const logo = pathToFileURL(path.join(root, 'public/logos/k2-horizontal-light.svg')).href;

const W = 640, H = 214;
const html = `<!doctype html><meta charset="utf-8"><style>
${faces}
*{margin:0;padding:0;box-sizing:border-box}
body{width:${W}px;height:${H}px;background:#0B0B0C;color:#F2EFE9;font-family:'Instrument Sans',Arial,sans-serif;position:relative;overflow:hidden}
.frame{position:absolute;inset:10px;border:1px solid rgba(242,239,233,.18)}
.logo{position:absolute;left:34px;top:50%;transform:translateY(-50%);width:236px;height:auto}
.rule{position:absolute;left:304px;top:30px;bottom:30px;width:1px;background:rgba(242,239,233,.18)}
.rows{position:absolute;left:330px;top:34px;right:30px;display:grid;grid-template-columns:48px 1fr;row-gap:9px;align-items:baseline}
.k{font:700 10px 'Courier Prime',monospace;letter-spacing:.2em;text-transform:uppercase;color:#A9A59D}
.v{font:500 14px/1.35 'Instrument Sans',sans-serif;color:#F2EFE9}
.web{position:absolute;left:330px;bottom:30px;font:800 17px 'Bricolage Grotesque',sans-serif;letter-spacing:-.01em;text-transform:uppercase;color:#F2EFE9;display:flex;align-items:center;gap:10px}
.web i{display:block;width:8px;height:8px;background:#E0525B}
</style>
<div class="frame"></div>
<img class="logo" src="${logo}">
<div class="rule"></div>
<div class="rows">
  <span class="k">Tel</span><span class="v">0212 469 36 00</span>
  <span class="k">Gsm</span><span class="v">0533 924 79 86</span>
  <span class="k">Adres</span><span class="v">Atatürk Bulvarı, Deposite İş Merkezi<br>A1 Blok, Kat: 3, No: 424<br>Başakşehir / İstanbul</span>
</div>
<div class="web"><i></i>k2hukuk.com</div>`;

const tmp = path.join(root, '.claude/_sig.html');
fs.writeFileSync(tmp, html);
const b = await puppeteer.launch({ executablePath: CHROME, args: ['--allow-file-access-from-files'] });
const p = await b.newPage();
await p.setViewport({ width: W, height: H, deviceScaleFactor: 2 });
await p.goto(pathToFileURL(tmp).href);
await p.evaluate(() => document.fonts.ready);
await p.screenshot({ path: path.join(root, 'public/logos/k2-signature.png') });
await b.close();
fs.unlinkSync(tmp);
console.log(`k2-signature.png ${W * 2}x${H * 2} written`);
