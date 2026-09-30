// After `next build`: checks out/ against the route/content source (redesign v2, plan section 2.4).
//  - exactly the expected pages exist (home, 8 practice pages, 3 legal, 404); removed pages and inline-only
//    practice slugs are NOT exported; firebase.json carries the 301 redirects for the removed URLs
//  - every page: lang, exactly one h1, self-canonical (or noindex while the domain is a placeholder), parseable JSON-LD
//  - home: section ids, 8 practice slug ids, 4 principle ids, FAQ ids, FAQPage JSON-LD == visible FAQ text,
//    "Ayrı sayfada oku" only on flagship panels and resolving to real pages
//  - no italic / <em anywhere in built HTML or CSS
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { allUrls, abs, practicePath, flagshipAreas } from '../src/lib/routes-util.js';
import { faqItems } from '../src/lib/schema.js';
import { INDEXABLE, FEATURES } from '../src/content/site.js';
import { sections, practiceAreas, redirects } from '../src/content/routes.js';
import tr from '../src/content/tr.js';

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
const decode = (s) =>
  s
    ?.replace(/&#x27;|&#39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&');
const visibleText = (html) =>
  decode(
    html
      .replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
      .replace(/<[^>]+>/g, ' '),
  )
    .replace(/\s+/g, ' ')
    .trim();
const norm = (s) => s.replace(/\s+/g, ' ').trim();
const hasId = (html, id) => new RegExp(`\\sid=["']${id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["']`).test(html);

function inspect(html) {
  const links = html.match(/<link\b[^>]*>/gi) ?? [];
  const canonical = links.map((l) => ({ rel: attr(l, 'rel'), href: decode(attr(l, 'href')) })).find((l) => l.rel === 'canonical')?.href;
  const hreflang = {}; // must stay empty: single-language site
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

// All JSON-LD nodes (flattening @graph). Records a parse error per broken block.
function jsonLd(html, loc) {
  const nodes = [];
  const re = /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let m;
  while ((m = re.exec(html))) {
    try {
      const data = JSON.parse(m[1]);
      for (const n of data['@graph'] ?? [data]) nodes.push(n);
    } catch (e) {
      err(loc, `unparseable JSON-LD block: ${e.message}`);
    }
  }
  return nodes;
}
const typesOf = (n) => [].concat(n['@type'] ?? []);

const expected = new Set();
const pageHtml = {};
for (const u of allUrls()) {
  const p = u.path;
  expected.add(path.normalize(fileFor(p)));
  const f = fileFor(p);
  if (!fs.existsSync(f)) {
    err(p, `missing ${path.relative(root, f)}`);
    continue;
  }
  const html = fs.readFileSync(f, 'utf8');
  pageHtml[p] = html;
  const i = inspect(html);
  if (i.lang !== 'tr') err(p, `<html lang="${i.lang}"> expected "tr"`);
  if (i.h1 !== 1) err(p, `${i.h1} <h1> elements (expected 1)`);
  if (Object.keys(i.hreflang).length) err(p, 'hreflang present (site is Turkish-only)');
  if (INDEXABLE) {
    if (i.canonical !== abs(p)) err(p, `canonical "${i.canonical}" expected "${abs(p)}"`);
  } else {
    if (i.robots !== 'noindex,nofollow') err(p, `robots meta "${i.robots}" expected "noindex,nofollow" (placeholder domain)`);
    if (i.canonical) err(p, 'canonical present while site.domain is a placeholder');
    if (/alan-adi.example/.test(html)) err(p, 'placeholder origin leaked into the HTML');
  }

  // JSON-LD per page type
  const nodes = jsonLd(html, p);
  const has = (t) => nodes.some((n) => typesOf(n).includes(t));
  if (u.key === 'home') {
    for (const t of ['LegalService', 'WebSite', 'FAQPage']) if (!has(t)) err(p, `JSON-LD ${t} missing`);
  } else if (u.key === 'practiceDetail') {
    const bc = nodes.find((n) => typesOf(n).includes('BreadcrumbList'));
    if (!bc) err(p, 'JSON-LD BreadcrumbList missing');
    else if (bc.itemListElement?.length !== 2) err(p, `BreadcrumbList has ${bc.itemListElement?.length} items (expected 2: Ana Sayfa, alan)`);
    if (FEATURES.practiceConfirmed && !has('Service')) err(p, 'JSON-LD Service missing (practiceConfirmed)');
    if (!FEATURES.practiceConfirmed && has('Service')) err(p, 'JSON-LD Service present while practiceConfirmed=false');
  }
}

// ---------- removed pages / inline-only areas must not be exported ----------
const removed = ['/hakkimizda/', '/ekibimiz/', '/iletisim/', '/calisma-alanlari/'];
for (const p of removed) {
  if (fs.existsSync(fileFor(p))) err(p, 'removed page still exported (must be a 301 to a home anchor)');
  if (fs.existsSync(path.join(out, `${p.replace(/^\/|\/$/g, '')}.html`))) err(p, 'removed page still exported as .html');
}
for (const a of practiceAreas.filter((x) => !x.page)) {
  const p = `/calisma-alanlari/${a.slug}/`;
  if (fs.existsSync(fileFor(p))) err(p, 'inline-only area must not have its own page');
}

// ---------- firebase.json redirects ----------
try {
  const fb = JSON.parse(fs.readFileSync(path.join(root, 'firebase.json'), 'utf8'));
  const got = fb.hosting?.redirects ?? [];
  for (const r of redirects) {
    const hit = got.find((g) => g.source === r.source);
    if (!hit) err('firebase.json', `redirect ${r.source} missing`);
    else if (hit.destination !== r.destination || hit.type !== 301) err('firebase.json', `redirect ${r.source} must be 301 -> ${r.destination}`);
  }
  if (got.length !== redirects.length) err('firebase.json', `expected ${redirects.length} redirects, found ${got.length}`);
} catch (e) {
  err('firebase.json', `unreadable: ${e.message}`);
}

// ---------- home structure ----------
const home = pageHtml['/'];
if (home) {
  const text = visibleText(home);
  const sectionIds = Object.values(sections).map((s) => s.replace('/#', ''));
  for (const id of sectionIds) if (!hasId(home, id)) err('/', `missing section id="${id}"`);
  for (const a of practiceAreas) if (!hasId(home, a.slug)) err('/', `missing practice panel id="${a.slug}"`);
  for (const it of tr.home.principles.items) if (!hasId(home, `ilke-${it.id}`)) err('/', `missing principle id="ilke-${it.id}"`);
  for (const it of tr.faq.items) if (!hasId(home, it.id)) err('/', `missing FAQ id="${it.id}"`);

  // FAQPage must equal the visible FAQ text (subset: pending / gated items are pruned from JSON-LD only).
  const faq = jsonLd(home, '/').find((n) => typesOf(n).includes('FAQPage'));
  const want = faqItems(tr.faq.items);
  const ents = faq?.mainEntity ?? [];
  if (faq && ents.length !== want.length) err('/', `FAQPage has ${ents.length} Questions, expected ${want.length} from tr.faq`);
  if (want.length < 1) err('/', 'no FAQ item is publishable in JSON-LD');
  for (const q of ents) {
    if (q['@type'] !== 'Question') err('/', 'FAQPage entity is not a Question');
    if (!text.includes(norm(q.name))) err('/', `FAQ question not found in visible text: "${q.name.slice(0, 60)}"`);
    if (!text.includes(norm(q.acceptedAnswer?.text ?? '~'))) err('/', `FAQ answer not found verbatim in visible text: "${q.name.slice(0, 60)}"`);
  }
  for (const it of tr.faq.items) {
    if (!/\{\w+\}/.test(it.q + it.a) && !text.includes(norm(it.q))) err('/', `visible FAQ question missing: "${it.q.slice(0, 60)}"`);
  }

  // "Ayrı sayfada oku": only flagship panels, each resolving to an existing page.
  const flagshipPaths = new Set(flagshipAreas().map((a) => practicePath(a.id)));
  const read = [];
  const re = /<a\b([^>]*)>([\s\S]*?)<\/a>/gi;
  let m;
  while ((m = re.exec(home))) {
    if (visibleText(m[2]).includes(tr.home.practice.readSeparate)) read.push(decode(attr(`<a ${m[1]}>`, 'href')));
  }
  if (read.length !== flagshipPaths.size) err('/', `${read.length} "${tr.home.practice.readSeparate}" links, expected ${flagshipPaths.size} (flagship areas only)`);
  for (const h of read) {
    const p = h?.replace(/^https?:\/\/[^/]+/, '');
    if (!flagshipPaths.has(p)) err('/', `"${tr.home.practice.readSeparate}" points to "${h}", not a flagship page`);
    else if (!fs.existsSync(fileFor(p))) err('/', `"${tr.home.practice.readSeparate}" target ${p} not exported`);
  }
}

// ---------- no italic / <em anywhere ----------
const walkFiles = (d, test, acc = []) => {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const f = path.join(d, e.name);
    if (e.isDirectory()) walkFiles(f, test, acc);
    else if (test(e.name)) acc.push(f);
  }
  return acc;
};
for (const f of walkFiles(out, (n) => n.endsWith('.html') || n.endsWith('.css'))) {
  const src = fs.readFileSync(f, 'utf8');
  const rel = path.relative(out, f).split(path.sep).join('/');
  if (/font-style\s*:\s*(italic|oblique)/i.test(src)) err(rel, 'font-style italic/oblique found');
  if (f.endsWith('.html') && /<em[\s>]/i.test(src)) err(rel, '<em> element found');
}

// ---------- orphans / 404 / seo files ----------
const orphans = [];
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const f = path.join(d, e.name);
    if (e.isDirectory()) { if (e.name !== '_next') walk(f); }
    else if (e.name === 'index.html' && !expected.has(path.normalize(f))) orphans.push(path.relative(out, f).split(path.sep).join('/'));
  }
})(out);
for (const o of orphans) if (o !== '404/index.html') err(o, 'orphan page not in route list');
if (!fs.existsSync(path.join(out, '404.html')) && !fs.existsSync(path.join(out, '404/index.html'))) err('404', 'no 404 page exported');
for (const f of INDEXABLE ? ['sitemap.xml', 'robots.txt', 'llms.txt'] : ['robots.txt']) if (!fs.existsSync(path.join(out, f))) err(f, `missing out/${f}`);
if (INDEXABLE) {
  const sm = fs.existsSync(path.join(out, 'sitemap.xml')) ? fs.readFileSync(path.join(out, 'sitemap.xml'), 'utf8') : '';
  const locs = sm.match(/<loc>/g)?.length ?? 0;
  if (locs !== allUrls().length) err('sitemap.xml', `${locs} URLs, expected ${allUrls().length}`);
} else {
  if (!/Disallow:\s*\/\s*$/m.test(fs.readFileSync(path.join(out, 'robots.txt'), 'utf8'))) err('robots.txt', 'must Disallow: / while the domain is a placeholder');
  for (const f of ['sitemap.xml', 'llms.txt']) if (fs.existsSync(path.join(out, f))) err(f, `out/${f} must not exist while the domain is a placeholder`);
}

for (const e of errors) console.error(`ERROR  ${e}`);
console.log(`verify-routes: ${expected.size} pages expected, ${errors.length} error(s)`);
if (errors.length) process.exit(1);
