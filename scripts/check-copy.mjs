// Compliance + structure lint for src/content. Exit 1 on any error (bar advertising rules, length limits, TR/EN parity).
import tr from '../src/content/tr.js';
import en from '../src/content/en.js';

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
  { re: /Avukatlık Ortaklığı\s*&|&\s*Karaman|Karaman\s*&/iu, why: '"&" next to unvan' },
  { re: /K2 Legal/u, why: '"K2 Legal" must not appear in copy' },
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

const locales = { tr, en };
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

  // --- structure & length ---
  const home = c.home, practice = c.practice;
  if (home?.manifesto?.text && words(home.manifesto.text) > 60) err(`${loc}.home.manifesto.text`, `manifesto ${words(home.manifesto.text)} words (max 60)`);
  if (home?.process?.steps && home.process.steps.length !== 4) err(`${loc}.home.process.steps`, `must have 4 steps, has ${home.process.steps.length}`);
  for (const a of practice?.areas ?? []) {
    const lo = loc === 'tr' ? 30 : 25, hi = 60;
    const w = words(a.lede ?? '');
    if (loc === 'tr' && (w < lo || w > hi)) err(`${loc}.practice.${a.id}.lede`, `lede ${w} words (TR ${lo}-${hi})`);
    if (loc === 'en' && (w < lo || w > 75)) warn(`${loc}.practice.${a.id}.lede`, `lede ${w} words`);
    const aw = words(a.approach ?? '');
    if (loc === 'tr' && (aw < 25 || aw > 50)) err(`${loc}.practice.${a.id}.approach`, `approach ${aw} words (25-50)`);
    if ((a.topics?.length ?? 0) !== 6) err(`${loc}.practice.${a.id}.topics`, `must have exactly 6 topics, has ${a.topics?.length ?? 0}`);
  }
  for (const [key, m] of Object.entries(c.seo ?? {})) {
    if (m.title && m.title.length > 70) err(`${loc}.seo.${key}.title`, `title ${m.title.length} chars (max 70)`);
    else if (m.title && m.title.length > 60) warn(`${loc}.seo.${key}.title`, `title ${m.title.length} chars (>60)`);
    if (m.description && m.description.length > 155) err(`${loc}.seo.${key}.description`, `description ${m.description.length} chars (max 155)`);
  }
  for (const [key, m] of Object.entries(c.seo ?? {})) {
    if (!m.noindex && !m.description) err(`${loc}.seo.${key}`, 'missing description');
  }
}

// --- TR/EN key parity ---
const paths = (v, p = '', out = new Set()) => {
  if (Array.isArray(v)) { out.add(`${p}[]`); v.forEach((x) => paths(x, `${p}[]`, out)); }
  else if (v && typeof v === 'object') Object.entries(v).forEach(([k, x]) => paths(x, `${p}.${k}`, out));
  else out.add(p);
  return out;
};
const pt = paths(tr), pe = paths(en);
for (const p of pt) if (!pe.has(p)) err(`parity`, `in TR, missing in EN: ${p}`);
for (const p of pe) if (!pt.has(p)) err(`parity`, `in EN, missing in TR: ${p}`);

for (const w of warnings) console.warn(`warn   ${w}`);
for (const e of errors) console.error(`ERROR  ${e}`);
console.log(`check-copy: ${errors.length} error(s), ${warnings.length} warning(s)`);
if (errors.length) process.exit(1);
