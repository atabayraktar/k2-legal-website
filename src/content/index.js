import tr from './tr.js';
import en from './en.js';

const all = { tr, en };

export const getContent = (locale, pageKey) => ({
  locale,
  common: all[locale].common,
  seo: all[locale].seo[pageKey] ?? null,
  page: all[locale][pageKey] ?? null,
});
