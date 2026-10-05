import { site, FEATURES } from '../content/site.js';
import { isPending } from './pending.js';
import { abs, origin, pagePath } from './routes-util.js';
import { fmt, addressLine } from './format.js';

// Removes null / pending / empty values recursively so placeholders never reach JSON-LD.
export function pruneSchema(v) {
  if (Array.isArray(v)) {
    const a = v.map(pruneSchema).filter((x) => x !== undefined);
    return a.length ? a : undefined;
  }
  if (v && typeof v === 'object') {
    const o = {};
    for (const [k, val] of Object.entries(v)) {
      const p = k.startsWith('@') ? val : pruneSchema(val);
      if (p !== undefined) o[k] = p;
    }
    return Object.keys(o).length ? o : undefined;
  }
  if (v == null || (typeof v === 'string' && (isPending(v) || v === ''))) return undefined;
  return v;
}

const orgId = () => `${origin()}/#organization`;

export const orgRef = () => ({ '@id': orgId() });

export function orgSchema() {
  const c = site.contact;
  const a = c.address;
  return pruneSchema({
    '@type': ['LegalService', 'Organization'],
    '@id': orgId(),
    name: site.legalName,
    url: abs(pagePath('home')),
    logo: abs('/og/og-default.png'),
    image: abs(site.seo.ogImage),
    telephone: [c.phone.tel, c.mobile.tel],
    email: c.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: a.street,
      addressLocality: a.district,
      addressRegion: a.city,
      postalCode: a.postalCode,
      addressCountry: a.country,
    },
    geo: c.geo ? { '@type': 'GeoCoordinates', latitude: c.geo.lat, longitude: c.geo.lng } : undefined,
    hasMap: c.map && c.map.href,
    // only when the client has confirmed the weekdays (hours.schema), never guessed
    openingHours: c.hours.schema,
    contactPoint: [
      { '@type': 'ContactPoint', contactType: 'customer service', telephone: c.phone.tel, email: c.email, availableLanguage: 'tr' },
      { '@type': 'ContactPoint', contactType: 'customer service', telephone: c.mobile.tel, availableLanguage: 'tr' },
    ],
    areaServed: { '@type': 'AdministrativeArea', name: a.city },
    sameAs: Object.values(site.social).filter(Boolean),
  });
}

export function websiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': `${origin()}/#website`,
    url: abs(pagePath('home')),
    name: site.legalName,
    inLanguage: 'tr',
    publisher: orgRef(),
  };
}

export function breadcrumbSchema(items) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: it.url })),
  };
}

export function serviceSchema(area, url) {
  return {
    '@type': 'Service',
    serviceType: area.title,
    name: area.title,
    description: area.oneLine,
    provider: orgRef(),
    url,
  };
}

// Allowed fields only (Reklam Yasagi Yonetmeligi m.7/1-d): name, title, alma mater, languages, bar membership.
export function personSchema(p) {
  return pruneSchema({
    '@type': 'Person',
    name: p.name,
    honorificPrefix: p.academicTitle,
    jobTitle: p.professionalTitle,
    alumniOf: p.university,
    memberOf: p.baro,
    worksFor: orgRef(),
  });
}

// Values for {tokens} in content strings (fmt(str, siteVars())). Pending data stays as its "[...]" placeholder.
export function siteVars() {
  const c = site.contact;
  return {
    legalName: site.legalName,
    city: site.city,
    foundedYear: site.foundedYear,
    phone: c.phone.display,
    mobile: c.mobile.display,
    email: c.email,
    kep: c.kep,
    address: addressLine(c.address),
    hours: c.hours.display,
    year: new Date().getFullYear(),
  };
}

// FAQPage built from the SAME items the page renders (tr.faq.items) so text cannot drift. Items are left out when
// they still contain placeholder data, or are gated on FEATURES.practiceConfirmed (gate: 'practice').
const hasPending = (str) => /\[[^\]]*\]|___/.test(str);
export function faqItems(items) {
  const vars = siteVars();
  return items
    .filter((it) => it.gate !== 'practice' || FEATURES.practiceConfirmed)
    .map((it) => ({ id: it.id, q: fmt(it.q, vars), a: fmt(it.a, vars) }))
    .filter((it) => !hasPending(it.q) && !hasPending(it.a) && !/\{\w+\}/.test(it.q + it.a));
}

export function faqSchema(items) {
  return {
    '@type': 'FAQPage',
    mainEntity: faqItems(items).map((it) => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: { '@type': 'Answer', text: it.a },
    })),
  };
}

export function graph(...nodes) {
  return { '@context': 'https://schema.org', '@graph': nodes.map((n) => pruneSchema(n)).filter(Boolean) };
}
