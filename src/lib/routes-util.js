// Pure JS helpers, importable from Node scripts (no JSX, no aliases).
import { pages, sections, practiceAreas } from '../content/routes.js';
import { site, INDEXABLE } from '../content/site.js';

// Standalone page path, or the home anchor for a section key (pagePath('contact') -> '/#iletisim').
export const pagePath = (key) => pages[key] ?? sections[key];

export const practiceArea = (id) => practiceAreas.find((a) => a.id === id);

export const practiceHasPage = (id) => practiceArea(id)?.page === true;

// Flagship areas (own URL), in display order.
export const flagshipAreas = () => practiceAreas.filter((a) => a.page);

// Flagship: /calisma-alanlari/<slug>/. Inline-only areas: /#<slug> (home panel deep link).
export const practicePath = (id) => {
  const a = practiceArea(id);
  return a.page ? `/calisma-alanlari/${a.slug}/` : `/#${a.slug}`;
};

// Slugs that have a real page (getStaticPaths). Inline-only slugs are NOT routes.
export const practiceSlugs = () => flagshipAreas().map((a) => a.slug);

export const allPracticeSlugs = () => practiceAreas.map((a) => a.slug);

// Only flagship slugs resolve to an id (a static export cannot serve inline-only slugs).
export const practiceIdBySlug = (slug) => flagshipAreas().find((a) => a.slug === slug)?.id ?? null;

// Path for a route key ('practiceDetail' needs { id }).
export function routePath(routeKey, params = {}) {
  if (routeKey === 'practiceDetail') return practicePath(params.id);
  if (routeKey === 'notFound') return '/404/';
  return pagePath(routeKey);
}

// Absolute URL on the real origin; root-relative while the domain is a placeholder (see INDEXABLE in site.js).
export const abs = (path) => (INDEXABLE ? `${site.domain}${path}` : path);
export const origin = () => (INDEXABLE ? site.domain : '');

// Every indexable URL: [{ key, id?, path }] = home + 3 legal + flagship practice pages (7 today).
export function allUrls() {
  const out = Object.keys(pages).map((key) => ({ key, path: pages[key] }));
  for (const a of flagshipAreas()) {
    out.push({ key: 'practiceDetail', id: a.id, path: practicePath(a.id) });
  }
  return out;
}
