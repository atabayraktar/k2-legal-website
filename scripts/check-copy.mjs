// Compliance + structure lint for src/content. Exit 1 on any error (bar advertising rules, length limits, Turkish-only).
import tr from '../src/content/tr.js';
import { practiceAreas } from '../src/content/routes.js';

const L = '\p{L}\p{N}'; // letters/digits, for unicode-aware word edges
const word = (w) => new RegExp(`(?<![${L}])${w}(?![${L}])`, 'iu');
const stem = (w) => new RegExp(`(?<![${L}])${w}`, 'iu');

// Forbidden wording (Reklam Yasagi Yonetmeligi + CLAUDE.md). `negatable` = allowed when the same sentence negates it
// AND the string lives in an explicit compliance note (legal / contact content).
const RULES = [
  { re: stem('uzman'), why: '"uzman" implies specialisation', negatable: true },
  { re: new RegExp(`(?<![${L}])expert(?:s|ise)?(?![${L}])(?! (?:report|witness|opinion))`, 'iu'), why: 'expert claim ("expert report" as a procedural term is allowed)', negatable: true },
  { re: word('specialist(s)?'), why: 'specialist claim' },
  { re: /(?<![\p{L}])en iyi/iu, why: '"en iyi" superlative' },
  { re: word('best'), why: 'superlative' },
  { re: stem('lider'), why: '"lider" superlative' },
  { re: word('leading'), why: 'superlative' },
  { re: word('birinci'), why: 'ranking claim' },
  { re: /(?<![\p{L}\p{N}])(no\.? ?1|#1|1 numara)(?![\p{L}\p{N}])/iu, why: 'ranking claim' },
  { re: stem('ücretsiz'), why: 'free-service wording' },
  { re: /free (consultation|of charge|first)/iu, why: 'free-service wording' },
  { re: stem('garanti'), why: 'guarantee wording', negatable: true },
  { re: stem('guarantee'), why: 'guarantee wording', negatable: true },
  { re: stem('başarı'), why: 'success claim' },
  { re: /success rate/iu, why: 'success claim' },
  { re: stem('kazandı'), why: 'won-case claim' },
  { re: /%/u, why: 'percentage / statistic' },
  { re: stem('referans'), why: 'client references' },
  { re: word('references?'), why: 'client references' },
  { re: /müşteri yorum/iu, why: 'testimonial' },
  { re: word('testimonials?'), why: 'testimonial' },
  { re: stem('ödül'), why: 'award claim' },
  { re: /(?<![p{L}])(?<!of )(?<!arbitral )awards?(?![p{L}])/iu, why: 'award claim ("awards of a tribunal" is allowed)' },
  { re: word('hemen'), why: 'urgent / solicitation CTA' },
  { re: word('immediately'), why: 'urgent / solicitation CTA' },
  { re: /size yardımcı/iu, why: 'solicitation CTA' },
  { re: /hukuk bürosu/iu, why: 'wrong unvan ("Hukuk Bürosu")' },
  { re: /Danışmanlık A\.?Ş/iu, why: 'wrong unvan suffix' },
  { re: /Avukatlık Ortaklığı\s*&/iu, why: '"&" after the unvan' }, // "Karaman & Berat" is the owner's chosen name (2026-10-07)
  { re: /K2 Legal/u, why: '"K2 Legal" must not appear in copy' },
  // round 2: case-taking / assurance / self-praise patterns
  { re: /temsil (sağlan|yürütül|edilir)|vekilliğini kapsar|vekilliği(?![p{L}])/iu, why: 'case-taking wording (representation offered)' },
  { re: /alacaklı ve borçlu|işçi ve işveren tarafında|hem .{1,20} hem/iu, why: 'targets both sides of a dispute (solicitation)' },
  { re: /takvime işlen|eksiksiz|düzenli (olarak|biçimde)|dikkat edilerek|özenle|titizlik|ölçülülük|her aşamada|adım adım/iu, why: 'assurance / self-praise wording', negatable: true },
  { re: /esastır|ilkeye göre|ilkelerimiz|standart(lar)?ımız/iu, why: 'work-standard declaration' },
  { re: /sağdaki|soldaki/iu, why: 'layout-dependent wording (breaks on mobile)' },
  { re: /(?<![p{L}])(mühür|tescilli avukatlık ortaklığıs*$)/iu, why: 'official-seal connotation' },
];

const NEGATION = /(edilmez|etmez|vermez|değildir|değil|gelmez|kabul edilmez|does not|do not|is not|not guaranteed|not be|no liability|never|nor )/iu;
const NEGATION_FILES = /(^|\.)(legal|contact|note|index)(\.|$)/; // key path contains legal / contact -> explicit compliance notes

const errors = [];
const warnings = [];
const err = (loc, msg) => errors.push(`${loc}  ${msg}`);
const warn = (loc, msg) => warnings.push(`${loc}  ${msg}`);

// Collect [path, string] leaves.
function leaves(v, p, out = []) {
  if (Array.isArray(v)) v.forEach((x, i) => leaves(x, `${p}[${i}]`, out));
  else if (v && typeof v === 'object') Object.entries(v).forEach(([k, x]) => leaves(x, p ? `${p}.${k}` : k, out));
  else if (typeof v === 'string') out.push([p, v]);
  return out;
}
const words = (s) => s.replace(/\*/g, '').trim().split(/\s+/).filter(Boolean).length;

const locales = { tr };
for (const [loc, c] of Object.entries(locales)) {
  // --- forbidden wording ---
  for (const [p, s] of leaves(c, loc)) {
    // sentence split so negation must be in the same sentence
    for (const sentence of s.split(/(?<=[.!?;])\s+/)) {
      for (const r of RULES) {
        if (!r.re.test(sentence)) continue;
        if (r.negatable && NEGATION_FILES.test(p) && NEGATION.test(sentence)) continue;
        err(p, `forbidden wording (${r.why}): "${sentence.slice(0, 90)}"`);
      }
    }
  }

  // --- v2 structural rules: no emphasis markers, no eyebrow strings, no removed page-level copy ---
  for (const [p, v] of leaves(c, loc)) {
    if (/\*[^*\s][^*]*\*/.test(v)) err(p, 'emphasis marker (*word*) is not allowed (no italic / emphasis words)');
  }
  (function noEyebrow(v, p) {
    if (Array.isArray(v)) return v.forEach((x, i) => noEyebrow(x, `${p}[${i}]`));
    if (v && typeof v === 'object') {
      for (const [k, x] of Object.entries(v)) {
        if (k === 'eyebrow') err(`${p}.${k}`, 'eyebrow strings are removed in v2');
        noEyebrow(x, `${p}.${k}`);
      }
    }
  })(c, loc);
  for (const gone of ['about', 'manifesto']) if (c[gone] || c.home?.[gone]?.text && gone === 'manifesto') err(`${loc}.${gone}`, 'removed in v2');

  // --- structure & length ---
  const home = c.home, practice = c.practice, faq = c.faq;
  if (home?.about?.lede && words(home.about.lede) > 60) err(`${loc}.home.about.lede`, `about lede ${words(home.about.lede)} words (max 60)`);
  if (home?.process?.steps && home.process.steps.length !== 4) err(`${loc}.home.process.steps`, `must have 4 steps, has ${home.process.steps.length}`);
  if (home?.hero?.lines?.length !== 2) err(`${loc}.home.hero.lines`, 'hero needs exactly 2 lines');

  // Principles (Mühür Masası): exactly 4, each name + statement + detail, compliant tone.
  const pr = home?.principles?.items ?? [];
  if (pr.length !== 4) err(`${loc}.home.principles.items`, `must have 4 principles, has ${pr.length}`);
  pr.forEach((it, i) => {
    for (const k of ['id', 'index', 'name', 'statement', 'detail']) if (!it[k]) err(`${loc}.home.principles.items[${i}].${k}`, 'missing');
    if (it.detail && words(it.detail) > 60) err(`${loc}.home.principles.items[${i}].detail`, `detail ${words(it.detail)} words (max 60)`);
  });
  const prIds = pr.map((x) => x.id);
  if (new Set(prIds).size !== prIds.length) err(`${loc}.home.principles.items`, 'duplicate ids');

  // FAQ: 5-6 items (client ruling), ids s-01.., no fee / success / promise answers.
  const fq = faq?.items ?? [];
  if (fq.length < 5 || fq.length > 6) err(`${loc}.faq.items`, `must have 5-6 items, has ${fq.length}`);
  fq.forEach((it, i) => {
    const p = `${loc}.faq.items[${i}]`;
    if (!it.q || !it.a) err(p, 'q and a are required');
    if (it.id !== `s-${String(i + 1).padStart(2, '0')}`) err(`${p}.id`, `expected id s-${String(i + 1).padStart(2, '0')}, got ${it.id}`);
    const text = `${it.q} ${it.a}`;
    if (/(ücret|fiyat|bedel|harç|masraf|kampanya|indirim|tarife)/iu.test(text)) err(p, 'fee / price wording is not allowed in the FAQ');
    if (/(kazan|kaybet|sonuç al|garanti|başar|mutlaka|kesinlikle|en kısa)/iu.test(text)) err(p, 'result / promise wording is not allowed in the FAQ');
    if (words(it.a) > 75) err(`${p}.a`, `answer ${words(it.a)} words (max 75)`);
  });

  for (const a of practice?.areas ?? []) {
    const lo = 20, hi = 60;
    const w = words(a.lede ?? '');
    if (loc === 'tr' && (w < lo || w > hi)) err(`${loc}.practice.${a.id}.lede`, `lede ${w} words (TR ${lo}-${hi})`);
    const aw = words(a.approach ?? '');
    if (loc === 'tr' && (aw < 15 || aw > 50)) err(`${loc}.practice.${a.id}.approach`, `approach ${aw} words (15-50)`);
    if ((a.topics?.length ?? 0) !== 6) err(`${loc}.practice.${a.id}.topics`, `must have exactly 6 topics, has ${a.topics?.length ?? 0}`);
  }

  // SEO: home + flagship areas + legal + notFound. Removed pages must be gone.
  const seoEntries = [];
  for (const [key, m] of Object.entries(c.seo ?? {})) {
    if (key === 'areas') for (const [id, am] of Object.entries(m)) seoEntries.push([`areas.${id}`, am]);
    else seoEntries.push([key, m]);
  }
  for (const gone of ['about', 'practice', 'team', 'contact']) if (c.seo?.[gone]) err(`${loc}.seo.${gone}`, 'SEO entry for a removed page');
  const flagship = practiceAreas.filter((a) => a.page).map((a) => a.id);
  for (const id of flagship) if (!c.seo?.areas?.[id]) err(`${loc}.seo.areas.${id}`, 'missing SEO entry for flagship page');
  for (const [key, m] of seoEntries) {
    if (m.title && m.title.length > 70) err(`${loc}.seo.${key}.title`, `title ${m.title.length} chars (max 70)`);
    else if (m.title && m.title.length > 60) warn(`${loc}.seo.${key}.title`, `title ${m.title.length} chars (>60)`);
    if (m.description && m.description.length > 155) err(`${loc}.seo.${key}.description`, `description ${m.description.length} chars (max 155)`);
    if (!m.noindex && !m.description) err(`${loc}.seo.${key}`, 'missing description');
  }
}

for (const w of warnings) console.warn(`warn   ${w}`);
for (const e of errors) console.error(`ERROR  ${e}`);
console.log(`check-copy: ${errors.length} error(s), ${warnings.length} warning(s)`);
if (errors.length) process.exit(1);
