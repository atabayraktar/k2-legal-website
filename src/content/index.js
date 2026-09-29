import tr from './tr.js';

// page = tr[pageKey]; `all` exposes the whole content tree (e.g. all.faq / all.team / all.contact for the home page).
export const getContent = (pageKey) => ({
  common: tr.common,
  seo: tr.seo[pageKey] ?? null,
  page: tr[pageKey] ?? null,
  all: tr,
});
