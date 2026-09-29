// Generates public/sitemap.xml, public/robots.txt and public/llms.txt from the same route/site source the pages use.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { site, INDEXABLE, FEATURES } from '../src/content/site.js';
import { pages, practiceAreas } from '../src/content/routes.js';
import { allUrls, abs } from '../src/lib/routes-util.js';
import { isPending } from '../src/lib/pending.js';
import trSeo from '../src/content/tr/seo.js';
import enSeo from '../src/content/en/seo.js';
import trPractice from '../src/content/tr/practice.js';
import enPractice from '../src/content/en/practice.js';

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

// ---------- sitemap.xml ----------
const entry = (u, locale) => {
  const self = abs(u[locale]);
  const links = [
    `<xhtml:link rel="alternate" hreflang="tr" href="${esc(abs(u.tr))}"/>`,
    `<xhtml:link rel="alternate" hreflang="en" href="${esc(abs(u.en))}"/>`,
    `<xhtml:link rel="alternate" hreflang="x-default" href="${esc(abs(u.tr))}"/>`,
  ];
  return `  <url>\n    <loc>${esc(self)}</loc>\n    <lastmod>${today}</lastmod>\n    ${links.join('\n    ')}\n  </url>`;
};
const body = urls.flatMap((u) => [entry(u, 'tr'), entry(u, 'en')]).join('\n');
fs.writeFileSync(
  path.join(pub, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${body}\n</urlset>\n`,
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
const seoOf = { tr: trSeo, en: enSeo };
const areaOf = (locale) => (locale === 'tr' ? trPractice : enPractice).areas ?? [];
const describe = (u, locale) => {
  if (u.key === 'practiceDetail') return areaOf(locale).find((a) => a.id === u.id)?.oneLine ?? '';
  return seoOf[locale][u.key]?.description ?? '';
};
const titleOf = (u, locale) => {
  if (u.key === 'practiceDetail') return areaOf(locale).find((a) => a.id === u.id)?.title ?? u.id;
  return seoOf[locale][u.key]?.title ?? u.key;
};
const list = (locale) =>
  urls.map((u) => `- [${titleOf(u, locale)}](${abs(u[locale])}): ${describe(u, locale)}`.trimEnd()).join('\n');

const c = site.contact;
const addr = c.address;
const addressText = [addr.street, addr.district, addr.postalCode, addr.city].map(ok).filter(Boolean).join(', ');
const contactRows = [
  ['Adres / Address', addressText],
  ['Telefon / Telephone', ok(c.phone.display)],
  ['E-posta / E-mail', ok(c.email)],
  ['KEP', ok(c.kep)],
  ['Çalışma saatleri / Hours', ok(c.hours.display)],
  ['WhatsApp', ok(c.whatsapp.url)],
].filter(([, v]) => v);
const where = [ok(site.city), ok(site.baro)].filter(Boolean);
const areasTr = FEATURES.practiceConfirmed ? ' Ceza, ticaret ve şirketler, iş ve sosyal güvenlik, gayrimenkul ve inşaat, aile ve miras, icra ve iflas, fikri mülkiyet ve bilişim ile tahkim ve uyuşmazlık çözümü alanlarında faaliyet gösterir.' : '';
const areasEn = FEATURES.practiceConfirmed ? ' It works in criminal, commercial and corporate, employment and social security, real estate and construction, family and inheritance, enforcement and bankruptcy, intellectual property and technology, and arbitration and dispute resolution matters.' : '';
const entityTr = `${site.legalName}, ${[ok(site.city) && `${site.city} merkezli`, ok(site.baro) && `${site.baro} nezdinde kayıtlı`].filter(Boolean).join(', ')}${where.length ? ' ' : ''}tescilli bir avukatlık ortaklığıdır.${areasTr}`;
const entityEn = `${site.legalName} is a registered law partnership${where.length ? ` (${where.join(', ')})` : ''} in Türkiye.${areasEn}`;
const areaLines = (locale) => !FEATURES.practiceConfirmed ? '' : practiceAreas.map((a) => areaOf(locale).find((x) => x.id === a.id)?.title ?? a[locale]).join('; ');

const llms = `# ${site.legalName}

> ${entityTr}
> ${entityEn}

Bu internet sitesi 1136 sayılı Avukatlık Kanunu ve Türkiye Barolar Birliği Reklam Yasağı Yönetmeliği kapsamında yalnızca bilgilendirme amacıyla hazırlanmıştır; reklam ve tanıtım niteliği taşımaz. Site içeriği hukuki görüş değildir ve avukat–müvekkil ilişkisi kurmaz. / This website is for information only, is not advertising, is not legal advice and does not create a lawyer–client relationship.

Languages: Türkçe (${abs(pages.home.tr)}), English (${abs(pages.home.en)}).

## Sayfalar

${list('tr')}

## Pages

${list('en')}

${FEATURES.practiceConfirmed ? `## Çalışma alanları / Practice areas

${areaLines('tr')}

${areaLines('en')}

` : ''}## İletişim / Contact

${contactRows.map(([k, v]) => `- ${k}: ${v}`).join('\n')}
- Contact page: ${abs(pages.contact.tr)}
`;
fs.writeFileSync(path.join(pub, 'llms.txt'), llms);
console.log(`generate-seo: ${urls.length * 2} sitemap URLs, robots.txt, llms.txt written to public/ (indexable, origin ${site.domain})`);
