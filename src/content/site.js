// Single source of client data. Every unknown is a placeholder marked TODO(client).
// Placeholder convention: "[square brackets]", "+90 (___) ___ __ __", or null for optional values.
// Placeholders are rendered in the UI as-is and pruned from JSON-LD / sitemap / llms.txt.

// publications: Yayınlar OFF until the bar approves content.
// practiceConfirmed: the eight working areas are placeholders until the client confirms them; while false,
// Service JSON-LD and the llms.txt area list are not published as facts.
export const FEATURES = { publications: false, practiceConfirmed: false }; // TODO(client) confirm the areas

export const site = {
  legalName: 'Karaman Berat Avukatlık Ortaklığı', // TODO(client) confirm exact spelling against the baro record
  domain: 'https://alan-adi.example', // TODO(client) final production origin, no trailing slash
  foundedYear: null, // TODO(client) only if verified; UI hides the row when null
  city: '[Şehir]', // TODO(client)
  baro: '[Baro adı] Barosu', // TODO(client) baro the ortaklık is registered with
  baroRegistry: '[Ortaklık baro sicil no]', // TODO(client) partnership registry number at the baro
  partners: [
    // Exactly 2. ONLY fields allowed by Reklam Yasağı Yönetmeliği m.7/1-d. No bio, cases, clients or awards fields exist by design.
    {
      id: 'partner-1',
      name: '[Ortak 1 Ad Soyad]', // TODO(client)
      academicTitle: null, // TODO(client) e.g. 'Dr.' only for an academic title in law
      professionalTitle: 'Avukat',
      baro: '[Baro adı] Barosu', // TODO(client)
      baroSicil: '[Baro sicil no]', // TODO(client)
      tbbSicil: '[TBB sicil no]', // TODO(client)
      startYear: '[Mesleğe başlama yılı]', // TODO(client)
      university: '[Mezun olduğu üniversite]', // TODO(client)
      languages: ['[Yabancı dil]'], // TODO(client)
      photo: null, // TODO(client) { src: '/images/x.webp', width, height } (black and white)
    },
    {
      id: 'partner-2',
      name: '[Ortak 2 Ad Soyad]', // TODO(client)
      academicTitle: null, // TODO(client)
      professionalTitle: 'Avukat',
      baro: '[Baro adı] Barosu', // TODO(client)
      baroSicil: '[Baro sicil no]', // TODO(client)
      tbbSicil: '[TBB sicil no]', // TODO(client)
      startYear: '[Mesleğe başlama yılı]', // TODO(client)
      university: '[Mezun olduğu üniversite]', // TODO(client)
      languages: ['[Yabancı dil]'], // TODO(client)
      photo: null, // TODO(client)
    },
  ],
  contact: {
    phone: { display: '+90 (___) ___ __ __', tel: null }, // TODO(client) tel = '+90…' digits for the tel: link
    email: '[E-posta adresi]', // TODO(client)
    kep: '[KEP adresi]', // TODO(client)
    address: { street: '[Adres satırı]', district: '[İlçe]', city: '[Şehir]', postalCode: '[Posta kodu]', country: 'TR' }, // TODO(client)
    hours: { display: '[Çalışma saatleri]', schema: null }, // TODO(client) schema e.g. 'Mo-Fr 09:00-18:00'
    whatsapp: { display: '[WhatsApp numarası]', url: null }, // TODO(client) url 'https://wa.me/90…'
    geo: { lat: null, lng: null }, // TODO(client)
    map: { image: null, href: null }, // TODO(client) static map image { src, width, height } + Google/Apple Maps URL
  },
  social: { instagram: null, linkedin: null, x: null }, // TODO(client) real URLs only; they feed sameAs
  seo: { ogImage: '/og/og-default.png', themeColor: '#0B0B0C' },
};

// INDEXABILITY GATE. While site.domain is still the placeholder (*.example), the site is NOT indexable:
//  - every page emits <meta name="robots" content="noindex,nofollow"> and no canonical / hreflang / og:url;
//  - JSON-LD ids and og:image use root-relative paths (never the fake origin);
//  - robots.txt is "Disallow: /", and sitemap.xml + llms.txt are not generated (scripts/generate-seo.mjs);
//  - verify-routes checks the noindex tags instead of canonicals.
// Set site.domain to the real production origin (https://..., no trailing slash) and everything flips to the
// indexable configuration on the next build; no other code change is needed.
export const INDEXABLE = !/\.example(?:[/:]|$)/i.test(site.domain) && /^https:\/\//.test(site.domain);

export const REQUIRED = [
  'domain', 'city', 'baro', 'baroRegistry', 'partners',
  'contact.phone', 'contact.email', 'contact.kep', 'contact.address', 'contact.hours',
];
