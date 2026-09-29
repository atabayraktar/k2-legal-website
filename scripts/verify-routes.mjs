// After `next build`: checks out/ has every expected page with lang, one h1, canonical and hreflang (reciprocal).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { allUrls, abs } from '../src/lib/routes-util.js';
import { INDEXABLE } from '../src/content/site.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = path.join(root, 'out');
if (!fs.existsSync(out)) {
  console.error('verify-routes: out/ not found. Run `npm run build` first.');
  process.exit(1);
}

const errors = [];
const err = (loc, msg) => errors.push(`${loc}  ${msg}`);
const fileFor = (p) => path.join(out, ...p.split('/').filter(Boolean), 'index.html');
const attr = (tag, name) => tag.match(new RegExp(`${name}=(?:"([^"]*)"|'([^']*)')`, 'i'))?.slice(1).find((x) => x !== undefined);
const decode = (s) => s?.replace(/&amp;/g, '&');

function inspect(html) {
  const links = html.match(/<link\b[^>]*>/gi) ?? [];
  const canonical = links.map((l) => ({ rel: attr(l, 'rel'), href: decode(attr(l, 'href')) })).find((l) => l.rel === 'canonical')?.href;
  const hreflang = {};
  for (const l of links) {
    if (attr(l, 'rel') === 'alternate' && attr(l, 'hreflang')) hreflang[attr(l, 'hreflang')] = decode(attr(l, 'href'));
  }
  const robots = (html.match(/<meta\b[^>]*>/gi) ?? []).find((m) => attr(m, 'name') === 'robots');
  return {
    robots: robots ? attr(robots, 'content') : undefined,
    lang: html.match(/<html\b[^>]*\blang=["']([^"']+)["']/i)?.[1],
    h1: (html.match(/<h1\b/gi) ?? []).length,
    canonical,
    hreflang,
  };
}

const expected = new Set();
const info = new Map();
for (const u of allUrls()) {
  for (const locale of ['tr', 'en']) {
    const p = u[locale];
    expected.add(path.normalize(fileFor(p)));
    const f = fileFor(p);
    if (!fs.existsSync(f)) { err(p, `missing ${path.relative(root, f)}`); continue; }
    const i = inspect(fs.readFileSync(f, 'utf8'));
    info.set(p, i);
    if (i.lang !== locale) err(p, `<html lang="${i.lang}"> expected "${locale}"`);
    if (i.h1 !== 1) err(p, `${i.h1} <h1> elements (expected 1)`);
    if (INDEXABLE) {
      if (i.canonical !== abs(p)) err(p, `canonical "${i.canonical}" expected "${abs(p)}"`);
      for (const [hl, target] of [['tr', abs(u.tr)], ['en', abs(u.en)], ['x-default', abs(u.tr)]]) {
        if (i.hreflang[hl] !== target) err(p, `hreflang ${hl} "${i.hreflang[hl]}" expected "${target}"`);
      }
    } else {
      // Placeholder domain: every page must be noindex,nofollow and carry no canonical / hreflang.
      if (i.robots !== 'noindex,nofollow') err(p, `robots meta "${i.robots}" expected "noindex,nofollow" (placeholder domain)`);
      if (i.canonical || Object.keys(i.hreflang).length) err(p, 'canonical/hreflang present while site.domain is a placeholder');
      if (/alan-adi\.example/.test(fs.readFileSync(f, 'utf8'))) err(p, 'placeholder origin leaked into the HTML');
    }
  }
  // reciprocity: each alternate declares the same set
  const a = info.get(u.tr), b = info.get(u.en);
  if (INDEXABLE && a && b && JSON.stringify(a.hreflang) !== JSON.stringify(b.hreflang)) err(u.tr, `hreflang sets of ${u.tr} and ${u.en} differ (not reciprocal)`);
}

// orphans
const orphans = [];
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const f = path.join(d, e.name);
    if (e.isDirectory()) { if (e.name !== '_next') walk(f); }
    else if (e.name === 'index.html' && !expected.has(path.normalize(f))) orphans.push(path.relative(out, f).split(path.sep).join('/'));
  }
})(out);
for (const o of orphans) if (o !== '404/index.html') console.warn(`warn   orphan page not in route list: ${o}`);
if (!fs.existsSync(path.join(out, '404.html')) && !fs.existsSync(path.join(out, '404/index.html'))) err('404', 'no 404 page exported');
for (const f of INDEXABLE ? ['sitemap.xml', 'robots.txt', 'llms.txt'] : ['robots.txt']) if (!fs.existsSync(path.join(out, f))) err(f, `missing out/${f}`);
if (!INDEXABLE) {
  if (!/Disallow:\s*\/\s*$/m.test(fs.readFileSync(path.join(out, 'robots.txt'), 'utf8'))) err('robots.txt', 'must Disallow: / while the domain is a placeholder');
  for (const f of ['sitemap.xml', 'llms.txt']) if (fs.existsSync(path.join(out, f))) err(f, `out/${f} must not exist while the domain is a placeholder`);
}

for (const e of errors) console.error(`ERROR  ${e}`);
console.log(`verify-routes: ${expected.size} pages expected, ${errors.length} error(s)`);
if (errors.length) process.exit(1);
