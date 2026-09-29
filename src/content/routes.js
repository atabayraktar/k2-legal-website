export const LOCALES = ['tr', 'en'];
export const DEFAULT_LOCALE = 'tr';

// key -> localized path (always leading + trailing slash)
export const pages = {
  home: { tr: '/', en: '/en/' },
  about: { tr: '/hakkimizda/', en: '/en/about/' },
  practice: { tr: '/calisma-alanlari/', en: '/en/practice-areas/' },
  team: { tr: '/ekibimiz/', en: '/en/team/' },
  contact: { tr: '/iletisim/', en: '/en/contact/' },
  privacy: { tr: '/aydinlatma-metni/', en: '/en/privacy-notice/' },
  cookies: { tr: '/cerez-politikasi/', en: '/en/cookie-policy/' },
  disclaimer: { tr: '/yasal-uyari/', en: '/en/legal-notice/' },
};

// order = display order 01-08; id is the stable key
export const practiceAreas = [
  { id: 'criminal', tr: 'ceza-hukuku', en: 'criminal-law' },
  { id: 'commercial', tr: 'ticaret-ve-sirketler-hukuku', en: 'commercial-and-corporate-law' },
  { id: 'employment', tr: 'is-ve-sosyal-guvenlik-hukuku', en: 'employment-and-social-security-law' },
  { id: 'realestate', tr: 'gayrimenkul-ve-insaat-hukuku', en: 'real-estate-and-construction-law' },
  { id: 'family', tr: 'aile-ve-miras-hukuku', en: 'family-and-inheritance-law' },
  { id: 'enforcement', tr: 'icra-ve-iflas-hukuku', en: 'enforcement-and-bankruptcy-law' },
  { id: 'ip', tr: 'fikri-mulkiyet-ve-bilisim-hukuku', en: 'intellectual-property-and-technology-law' },
  { id: 'arbitration', tr: 'tahkim-ve-uyusmazlik-cozumu', en: 'arbitration-and-dispute-resolution' },
];
