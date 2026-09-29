// Generates public/sitemap.xml, public/robots.txt and public/llms.txt from the same route/site source the pages use.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { site, INDEXABLE, FEATURES } from '../src/content/site.js';
import { pages, sections, practiceAreas } from '../src/content/routes.js';
import { allUrls, abs, practicePath } from '../src/lib/routes-util.js';
import { isPending } from '../src/lib/pending.js';
import trSeo from '../src/content/tr/seo.js';
import trPractice from '../src/content/tr/practice.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pub = path.join(root, 'public');
fs.mkdirSync(pub, { recursive: true });

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const today = new Date().toISOString().slice(0, 10);
const urls = allUrls();

// While site.domain is a placeholder (INDEXABLE === false): robots.txt disallows everything and neither
// sitemap.xml nor llms.txt is generated, so the fake origin is never advertised. Real domain => full output.
const rm = (f) => fs.rmSync(path.join(pub, f), { force: true });
if (!INDEXABLE) {
  rm('sitemap.xml');
  rm('llms.txt');
  fs.writeFileSync(path.join(pub, 'robots.txt'), ['User-agent: *', 'Disallow: /', ''].join('\n'));
  console.log('generate-seo: site.domain is a placeholder -> NOT indexable: robots.txt = Disallow all; sitemap.xml and llms.txt not generated');
  process.exit(0);
}

// Launch gate: an indexable build must have zero open TODO(client) placeholders (legal texts included).
import { spawnSync } from 'node:child_process';
const gate = spawnSync(process.execPath, ['scripts/check-placeholders.mjs', '--strict'], { stdio: 'inherit' });
if (gate.status !== 0) {
  console.error('generate-seo: INDEXABLE build refused - check-placeholders --strict found open items');
  process.exit(1);
}

// ---------- sitemap.xml ----------
const entry = (u) => `  <url>
    <loc>${esc(abs(u.path))}</loc>
    <lastmod>${today}</lastmod>
  </url>`;
const body = urls.map(entry).join(String.fromCharCode(10));
fs.writeFileSync(
  path.join(pub, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`,
);

// ---------- robots.txt ----------
const AI_BOTS = [
  'GPTBot', 'ChatGPT-User', 'OAI-SearchBot', 'ClaudeBot', 'Claude-User', 'Claude-SearchBot',
  'PerplexityBot', 'Perplexity-User', 'Google-Extended', 'Applebot-Extended', 'CCBot', 'Bingbot', 'Googlebot',
];
const robots = [
  'User-agent: *',
  'Allow: /',
  '',
  ...AI_BOTS.flatMap((b) => [`User-agent: ${b}`, 'Allow: /', '']),
  `Sitemap: ${abs('/sitemap.xml')}`,
  '',
].join('\n');
fs.writeFileSync(path.join(pub, 'robots.txt'), robots);

// ---------- llms.txt ----------
// Any bracketed token or ___ blank anywhere in the string counts as a placeholder.
const ok = (v) => (isPending(v) || /\[[^\]]*\]|___/.test(String(v ?? '')) ? null : v);
const areas = trPractice.areas ?? [];
const describe = (u) => (u.key === 'practiceDetail' ? trSeo.areas?.[u.id]?.description ?? areas.find((a) => a.id === u.id)?.oneLine ?? '' : trSeo[u.key]?.description ?? '');
const titleOf = (u) => (u.key === 'practiceDetail' ? areas.find((a) => a.id === u.id)?.title ?? u.id : trSeo[u.key]?.title ?? u.key);
const list = () => urls.map((u) => `- [${titleOf(u)}](${abs(u.path)}): ${describe(u)}`.trimEnd()).join(String.fromCharCode(10));

const c = site.contact;
const addr = c.address;
const addressText = [addr.street, addr.district, addr.postalCode, addr.city].map(ok).filter(Boolean).join(', ');
const contactRows = [
  ['Adres', addressText],
  ['Telefon', ok(c.phone.display)],
  ['E-posta', ok(c.email)],
  ['KEP', ok(c.kep)],
  ['Çalışma saatleri', ok(c.hours.display)],
  ['WhatsApp', ok(c.whatsapp.url)],
].filter(([, v]) => v);
const where = [ok(site.city), ok(site.baro)].filter(Boolean);
const areasText = FEATURES.practiceConfirmed ? ' Ceza, ticaret ve şirketler, iş ve sosyal güvenlik, gayrimenkul ve inşaat, aile ve miras, icra ve iflas, fikri mülkiyet ve bilişim ile tahkim ve uyuşmazlık çözümü alanlarında faaliyet gösterir.' : '';
const entity = `${site.legalName}, ${[ok(site.city) && `${site.city} merkezli`, ok(site.baro) && `${site.baro} nezdinde kayıtlı`].filter(Boolean).join(', ')}${where.length ? ' ' : ''}tescilli bir avukatlık ortaklığıdır.${areasText}`;
// Single-page structure: home sections as anchors; inline-only areas by name with their /#slug anchors.
const SECTION_TITLES = {
  about: 'Hakkımızda', principles: 'Çalışma ilkeleri', practice: 'Faaliyet alanları', process: 'Çalışma biçimi',
  team: 'Ortaklar (Ekibimiz)', faq: 'Sıkça sorulan sorular', contact: 'İletişim',
};
const sectionLines = () => Object.entries(sections).map(([k, p]) => `- [${SECTION_TITLES[k]}](${abs(p)})`).join(String.fromCharCode(10));
const areaLines = () => {
  if (!FEATURES.practiceConfirmed) return '';
  return practiceAreas
    .map((a) => {
      const t = areas.find((x) => x.id === a.id)?.title ?? a.id;
      return `- ${t}: ${a.page ? 'ayrı sayfa ' : 'ana sayfada bölüm '}${abs(practicePath(a.id))}`;
    })
    .join(String.fromCharCode(10));
};

const llms = `# ${site.legalName}

> ${entity}

Bu internet sitesi 1136 sayılı Avukatlık Kanunu ve Türkiye Barolar Birliği Reklam Yasağı Yönetmeliği kapsamında yalnızca bilgilendirme amacıyla hazırlanmıştır; reklam ve tanıtım niteliği taşımaz. Site içeriği hukuki görüş değildir ve avukat–müvekkil ilişkisi kurmaz.

## Site yapısı

Ana sayfa tek sayfadır; bölümler sayfa içi bağlantılardır (bir bölümün ayrıntıları aynı sayfada açılır). Ayrı sayfalar yalnızca üç çalışma alanı ile yasal metinler için vardır.

${sectionLines()}

## Sayfalar

${list()}

${FEATURES.practiceConfirmed ? `## Çalışma alanları

${areaLines()}

` : ''}## İletişim

${contactRows.map(([k, v]) => `- ${k}: ${v}`).join(String.fromCharCode(10))}
- İletişim bölümü: ${abs(sections.contact)}
`;
fs.writeFileSync(path.join(pub, 'llms.txt'), llms);
console.log(`generate-seo: ${urls.length} sitemap URLs, robots.txt, llms.txt written to public/ (indexable, origin ${site.domain})`);
