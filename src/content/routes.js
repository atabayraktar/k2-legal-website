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

// order = display order A.01-A.05; id is the stable key.
// page: true  -> own URL /calisma-alanlari/<slug>/ (all five areas have a detail page; the home panels link to them).
//                 The slug wording is a client / bar decision (Reklam Yasagi Yonetmeligi m.7/2-e).
// page: false -> would be an inline panel only, deep link /#<slug> (currently unused)
export const practiceAreas = [
  { id: 'enforcement', slug: 'icra-ve-iflas-hukuku', page: true },
  { id: 'maritime', slug: 'deniz-hukuku', page: true },
  { id: 'criminal', slug: 'ceza-hukuku', page: true },
  { id: 'commercial', slug: 'ticaret-hukuku', page: true },
  { id: 'corporate', slug: 'sirketler-hukuku-ve-danismanlik', page: true },
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
