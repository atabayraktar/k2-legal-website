import { createElement, Fragment } from 'react';

// "Hukuk, *ölçüyle* yapılır." -> array of nodes with <em class="em"> for *word*.
export function renderEm(str) {
  return str
    .split(/(\*[^*]+\*)/g)
    .filter(Boolean)
    .map((part, i) =>
      part.startsWith('*')
        ? createElement('em', { className: 'em', key: i }, part.slice(1, -1))
        : createElement(Fragment, { key: i }, part),
    );
}

// Splits into groups of n words, keeping *emphasis* spans intact. Deterministic (SSR-safe).
export function groupWords(str, n = 3) {
  const words = str.match(/\*[^*]+\*[^\s*]*|\S+/g) ?? [];
  const groups = [];
  for (let i = 0; i < words.length; i += n) groups.push(words.slice(i, i + n).join(' '));
  return groups;
}

// Wraps unresolved-data tokens ("[Şehir]", "[…]", "+90 (___) ___ __ __") in <span class="pending"> so they read as
// deliberate blanks. Only for small factual fields and long-form legal text, never display-scale copy.
const PENDING_RE = /(\[[^\]]*\]|\+90 \(___\) ___ __ __)/g;
export function renderPending(str) {
  if (typeof str !== 'string') return str;
  const parts = str.split(PENDING_RE);
  if (parts.length === 1) return str;
  return parts.map((part, i) =>
    i % 2 === 1 ? createElement('span', { className: 'pending', key: i }, part) : createElement(Fragment, { key: i }, part),
  );
}
