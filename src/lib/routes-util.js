// Pure JS helpers, importable from Node scripts (no JSX, no aliases).
import { pages, practiceAreas, LOCALES } from '../content/routes.js';
import { site, INDEXABLE } from '../content/site.js';

export const pagePath = (key, locale) => pages[key][locale];

export const practiceArea = (id) => practiceAreas.find((a) => a.id === id);

export const practicePath = (id, locale) => {
  const a = practiceArea(id);
  return `${pages.practice[locale]}${a[locale]}/`;
};

export const practiceSlugs = (locale) => practiceAreas.map((a) => a[locale]);

export const practiceIdBySlug = (slug, locale) => practiceAreas.find((a) => a[locale] === slug)?.id ?? null;

// -> { tr, en } paths for a route key ('practiceDetail' needs { id }).
export function alternates(routeKey, params = {}) {
  if (routeKey === 'practiceDetail') {
    return Object.fromEntries(LOCALES.map((l) => [l, practicePath(params.id, l)]));
  }
  if (routeKey === 'notFound') return { tr: '/404/', en: '/404/' };
  return Object.fromEntries(LOCALES.map((l) => [l, pages[routeKey][l]]));
}

// Absolute URL on the real origin; root-relative while the domain is a placeholder (see INDEXABLE in site.js).
export const abs = (path) => (INDEXABLE ? `${site.domain}${path}` : path);
export const origin = () => (INDEXABLE ? site.domain : '');

// Every indexable URL: [{ key, id?, tr, en }]
export function allUrls() {
  const out = Object.keys(pages).map((key) => ({ key, ...alternates(key) }));
  for (const a of practiceAreas) {
    out.push({ key: 'practiceDetail', id: a.id, ...alternates('practiceDetail', { id: a.id }) });
  }
  return out;
}
