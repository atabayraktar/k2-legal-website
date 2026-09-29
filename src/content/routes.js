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
// page: true  -> own URL /calisma-alanlari/<slug>/ (content depth only). Whether any area gets its own URL, and the
//                 slug wording, is a client / bar decision (Reklam Yasagi Yonetmeligi m.7/2-e).
// page: false -> inline panel on the home page only, deep link /#<slug>
export const practiceAreas = [
  { id: 'criminal', slug: 'ceza-hukuku', page: true },
  { id: 'commercial', slug: 'ticaret-ve-sirketler-hukuku', page: true },
  { id: 'employment', slug: 'is-ve-sosyal-guvenlik-hukuku', page: true },
  { id: 'realestate', slug: 'gayrimenkul-ve-insaat-hukuku', page: false },
  { id: 'family', slug: 'aile-ve-miras-hukuku', page: false },
  { id: 'enforcement', slug: 'icra-ve-iflas-hukuku', page: false },
  { id: 'ip', slug: 'fikri-mulkiyet-ve-bilisim-hukuku', page: false },
  { id: 'arbitration', slug: 'tahkim-ve-uyusmazlik-cozumu', page: false },
];

// Removed v1 pages -> 301 to the matching home anchor (firebase.json "redirects"; verify-routes asserts them).
export const redirects = [
  ['/hakkimizda', '/#hakkimizda'],
  ['/ekibimiz', '/#ekibimiz'],
  ['/iletisim', '/#iletisim'],
  ['/calisma-alanlari', '/#calisma-alanlari'],
].flatMap(([from, to]) => [
  { source: from, destination: to },
  { source: `${from}/`, destination: to },
]);
