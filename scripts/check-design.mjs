// Design-direction lint (DESIGN DIRECTION v2). Fails the build when a forbidden pattern appears in src/.
// Forbidden: italic / <em, font-style (other than "normal"), gradients, border-radius != 0, box-shadow (other than "none"),
// backdrop-filter, transition: all, !important, inline style objects in JSX, font-family literals outside the tokens file,
// the dropped serif family and its tokens.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(root, 'src');
const SKIP_FILES = new Set([path.join(SRC, 'content', 'images.generated.js')]);
const EXT = new Set(['.js', '.jsx', '.scss', '.css']);

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (EXT.has(path.extname(e.name)) && !SKIP_FILES.has(p)) out.push(p);
  }
  return out;
}

// Replaces comments with spaces (keeps offsets/line numbers). "//" only counts when not preceded by ":" (URLs).
function stripComments(src) {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, ' '))
    .replace(/(^|[^:"'`])\/\/[^\n]*/g, (m, pre) => pre + ' '.repeat(m.length - pre.length));
}

// [name, regex, applies to (ext test), scan comments too?, allow(match) => bool]
const RULES = [
  ['italic', /italic/i, () => true, true],
  ['<em element', /<em[\s>]/i, () => true, true],
  ['font-style (only "normal" allowed)', /font-style\s*:(?!\s*normal\b)[^;}\n]+/i, () => true, false],
  ['gradient', /gradient\s*\(/i, () => true, false],
  ['border-radius other than 0', /[a-z-]*radius\s*:(?!\s*0(px)?\s*([;}]|$))[^;}\n]+/i, (f) => /\.s?css$/.test(f), false],
  ['box-shadow (only "none" allowed)', /box-shadow\s*:(?!\s*none\b)[^;}\n]+/i, () => true, false],
  ['backdrop-filter', /backdrop-filter/i, () => true, false],
  ['transition: all', /transition(-property)?\s*:\s*all\b/i, () => true, false],
  ['!important', /!\s*important/i, () => true, false],
  ['inline style object in JSX', /style=\{\{/, (f) => /\.jsx$/.test(f), false],
  ['font-family literal outside tokens', /font-family\s*:(?!\s*(var\(--font-|inherit\b))[^;}\n]+/i, (f) => /\.s?css$/.test(f) && !f.endsWith(path.join('tokens', '_tokens.scss')), false],
  ['Newsreader / serif token', /newsreader|--font-serif/i, () => true, true],
];

let problems = 0;
for (const file of walk(SRC)) {
  const raw = fs.readFileSync(file, 'utf8');
  const stripped = stripComments(raw);
  for (const [name, re, applies, inComments] of RULES) {
    if (!applies(file)) continue;
    const text = inComments ? raw : stripped;
    const lines = text.split('\n');
    lines.forEach((line, i) => {
      if (re.test(line)) {
        problems++;
        console.error(`${path.relative(root, file)}:${i + 1}  ${name}\n    ${line.trim().slice(0, 140)}`);
      }
    });
  }
}

if (problems) {
  console.error(`\ncheck-design: ${problems} problem(s). See .claude/CLAUDE.md "DESIGN DIRECTION v2".`);
  process.exit(1);
}
console.log('check-design: ok');
