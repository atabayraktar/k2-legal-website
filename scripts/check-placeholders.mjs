// Lists every open TODO(client) item. Exit code is non-zero only with --strict (use before launch).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { site, REQUIRED } from '../src/content/site.js';
import { isPending } from '../src/lib/pending.js';

const strict = process.argv.includes('--strict');
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const TOKEN = /\[[^\]]*\]|___/;
const rows = [];

const underRequired = (p) => REQUIRED.some((r) => p === r || p.startsWith(`${r}.`) || p.startsWith(`${r}[`));

function walk(v, p) {
  if (Array.isArray(v)) return v.forEach((x, i) => walk(x, `${p}[${i}]`));
  if (v && typeof v === 'object') return Object.entries(v).forEach(([k, x]) => walk(x, p ? `${p}.${k}` : k));
  if (v == null) {
    rows.push({ path: p, value: 'null', status: underRequired(p) ? 'PENDING' : 'optional' });
  } else if (typeof v === 'string' && (isPending(v) || TOKEN.test(v))) {
    rows.push({ path: p, value: v, status: 'PENDING' });
  }
}
walk(site, 'site');

// Copy-level TODO(client) items inside content files.
function scan(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const f = path.join(dir, e.name);
    if (e.isDirectory()) scan(f);
    else if (/\.js$/.test(e.name)) {
      fs.readFileSync(f, 'utf8').split('\n').forEach((line, i) => {
        // Rendered blanks are neutral "[…]" tokens; the TODO(client) marker lives in source comments only.
        const blank = line.match(/\[…\]/g);
        const m = line.match(/\[([^\]]*TODO\(client\)[^\]]*)\]/);
        const where = `${path.relative(root, f).split(path.sep).join('/')}:${i + 1}`;
        if (m) rows.push({ path: where, value: `[${m[1]}]`, status: 'PENDING' });
        else if (blank) rows.push({ path: where, value: line.trim().slice(0, 80), status: 'PENDING' });
      });
    }
  }
}
scan(path.join(root, 'src', 'content'));

const pad = (s, n) => String(s).padEnd(n).slice(0, n);
console.log(`${pad('path', 46)} ${pad('value', 48)} status`);
for (const r of rows) console.log(`${pad(r.path, 46)} ${pad(r.value, 48)} ${r.status}`);
const pending = rows.filter((r) => r.status === 'PENDING').length;
const optional = rows.length - pending;
console.log(`\ncheck-placeholders: ${pending} pending TODO(client) item(s), ${optional} optional empty value(s).${strict ? '' : ' (non-strict: exit 0)'}`);
if (strict && pending > 0) process.exit(1);
