// key -> path (always leading + trailing slash). The site is Turkish-only.
// Standalone pages only: home + legal. Everything else lives on the home page as an anchor (see `sections`).
export const pages = {
  home: '/',
  privacy: '/aydinlatma-metni/',
  cookies: '/cerez-politikasi/',
  disclaimer: '/yasal-uyari/',
};

// Home-page sections (anchors). "More content never means a new URL."
export const sections = {
  about: '/#hakkimizda',
  principles: '/#ilkeler',
  practice: '/#calisma-alanlari',
  process: '/#calisma-bicimi',
  team: '/#ekibimiz',
  faq: '/#sss',
  contact: '/#iletisim',
};

// order = display order A.01-A.08; id is the stable key.
// page: true  -> own URL /calisma-alanlari/<slug>/ (all eight areas have a detail page; the home panels link to them).
//                 The slug wording is a client / bar decision (Reklam Yasagi Yonetmeligi m.7/2-e).
// page: false -> would be an inline panel only, deep link /#<slug> (currently unused)
export const practiceAreas = [
  { id: 'criminal', slug: 'ceza-hukuku', page: true },
  { id: 'commercial', slug: 'ticaret-ve-sirketler-hukuku', page: true },
  { id: 'employment', slug: 'is-ve-sosyal-guvenlik-hukuku', page: true },
  { id: 'realestate', slug: 'gayrimenkul-ve-insaat-hukuku', page: true },
  { id: 'family', slug: 'aile-ve-miras-hukuku', page: true },
  { id: 'enforcement', slug: 'icra-ve-iflas-hukuku', page: true },
  { id: 'ip', slug: 'fikri-mulkiyet-ve-bilisim-hukuku', page: true },
  { id: 'arbitration', slug: 'tahkim-ve-uyusmazlik-cozumu', page: true },
];

// Removed v1 pages -> 301 to the matching home anchor (firebase.json "redirects"; verify-routes asserts them).
export const redirects = [
  ['/hakkimizda', '/#hakkimizda'],
  ['/ekibimiz', '/#hakkimizda'],
  ['/iletisim', '/#iletisim'],
  ['/calisma-alanlari', '/#calisma-alanlari'],
].flatMap(([from, to]) => [
  { source: from, destination: to },
  { source: `${from}/`, destination: to },
]);
