// Single source of client data. Every unknown is a placeholder marked TODO(client).
// Placeholder convention: "[square brackets]", "+90 (___) ___ __ __", or null for optional values.
// Placeholders are rendered in the UI as-is and pruned from JSON-LD / sitemap / llms.txt.

// publications: Yayınlar OFF until the bar approves content.
// practiceConfirmed: the five working areas (confirmed by the client 2026-10-05); while false,
// Service JSON-LD and the llms.txt area list are not published as facts.
export const FEATURES = { publications: false, practiceConfirmed: true };

export const site = {
  legalName: 'Karaman Berat Avukatlık Ortaklığı', // TODO(client) confirm exact spelling against the baro record
  domain: 'https://alan-adi.example', // TODO(client) final production origin, no trailing slash
  foundedYear: null, // TODO(client) only if verified; UI hides the row when null
  // TODO(client) how the partnership was founded (year, who came together, when the baro registered it). The Hakkımızda
  // text is generic until then; a verified sentence set here is appended to the "Nasıl kuruldu" block. Never invent.
  founding: { note: null },
  city: 'İstanbul',
  // Baro sicil numbers were removed earlier on 2026-10-05, then re-added at the owner's explicit request (baro sicil only, no TBB sicil).
  partners: [
    // ONLY fields allowed by Reklam Yasağı Yönetmeliği m.7/1-d: no bio, cases, clients or awards.
    {
      id: 'partner-1',
      name: 'Enes Talha Karaman',
      academicTitle: null,
      professionalTitle: 'Avukat',
      baro: 'İstanbul 1 Nolu Barosu',
      baroSicil: '94812',
      startYear: '2023',
      university: 'İstanbul Bilgi Üniversitesi Hukuk Fakültesi; International University of Sarajevo (2015, İngilizce eğitim)',
      photo: { src: '/images/partner-enes-720.webp', width: 720, height: 960 },
    },
    {
      id: 'partner-2',
      name: 'Berat Kama',
      academicTitle: null,
      professionalTitle: 'Avukat',
      baro: 'İstanbul 2 Nolu Barosu',
      baroSicil: '1097',
      startYear: '2008',
      university: 'Marmara Üniversitesi Hukuk Fakültesi (2005)',
      photo: { src: '/images/partner-berat-720.webp', width: 720, height: 960 },
    },
  ],
  contact: {
    phone: { display: '0212 469 36 00', tel: '+902124693600' }, // sabit hat
    mobile: { display: '0533 924 79 86', tel: '+905339247986' },
    email: '[E-posta adresi]', // TODO(client)
    kep: '[KEP adresi]', // TODO(client)
    address: { street: 'Atatürk Bulvarı, Deposite İş Merkezi A1 Blok, Kat: 3, No: 424', district: 'Başakşehir', city: 'İstanbul', postalCode: '34490', country: 'TR' }, // TODO(client) verify postal code (sources conflict: 34490 vs 34306)
    hours: { display: '09:00 – 18:00', schema: null }, // TODO(client) confirm weekdays (schema e.g. 'Mo-Fr 09:00-18:00')
    whatsapp: { display: '0533 924 79 86', url: 'https://wa.me/905339247986' }, // same number as mobile
    geo: { lat: 41.0702133, lng: 28.809309 }, // from the client's Google Maps pin
    map: { image: null, href: 'https://maps.app.goo.gl/KFL58hSaip2Zc8SE8' }, // client's Google Maps link
  },
  social: { instagram: null, linkedin: null, x: null }, // TODO(client) real URLs only; they feed sameAs
  seo: { ogImage: '/og/og-default.png', themeColor: '#0B0B0C' },
};

// INDEXABILITY GATE. While site.domain is still the placeholder (*.example), the site is NOT indexable:
//  - every page emits <meta name="robots" content="noindex,nofollow"> and no canonical / og:url;
//  - JSON-LD ids and og:image use root-relative paths (never the fake origin);
//  - robots.txt is "Disallow: /", and sitemap.xml + llms.txt are not generated (scripts/generate-seo.mjs);
//  - verify-routes checks the noindex tags instead of canonicals.
// Set site.domain to the real production origin (https://..., no trailing slash) and everything flips to the
// indexable configuration on the next build; no other code change is needed.
export const INDEXABLE = !/\.example(?:[/:]|$)/i.test(site.domain) && /^https:\/\//.test(site.domain);

export const REQUIRED = [
  'domain', 'partners',
  'contact.phone', 'contact.email', 'contact.kep', 'contact.address', 'contact.hours',
];
