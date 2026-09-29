import { createElement, Fragment } from 'react';

// Transitional: v1 content still carries *word* markers. Strips them so no emphasis styling ever renders (D1 removes the markers).
export const plain = (str) => (typeof str === 'string' ? str.replaceAll('*', '') : str);

// Splits into groups of n words. Deterministic (SSR-safe).
export function groupWords(str, n = 3) {
  const words = plain(str).match(/\S+/g) ?? [];
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
