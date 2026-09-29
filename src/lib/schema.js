import { site } from '../content/site.js';
import { isPending } from './pending.js';
import { abs, origin, pagePath } from './routes-util.js';

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

export function orgSchema(locale = 'tr') {
  const c = site.contact;
  const a = c.address;
  return pruneSchema({
    '@type': ['LegalService', 'Organization'],
    '@id': orgId(),
    name: site.legalName,
    url: abs(pagePath('home', locale)),
    logo: abs('/og/og-default.png'),
    image: abs(site.seo.ogImage),
    telephone: c.phone.tel,
    email: c.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: a.street,
      addressLocality: a.district,
      addressRegion: a.city,
      postalCode: a.postalCode,
      addressCountry: a.country,
    },
    sameAs: Object.values(site.social).filter(Boolean),
  });
}

export function websiteSchema(locale = 'tr') {
  return {
    '@type': 'WebSite',
    '@id': `${origin()}/#website`,
    url: abs(pagePath('home', locale)),
    name: site.legalName,
    inLanguage: locale,
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
    knowsLanguage: p.languages,
    memberOf: p.baro,
    worksFor: orgRef(),
  });
}

export function faqSchema(items) {
  return {
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: { '@type': 'Answer', text: it.a },
    })),
  };
}

export function graph(...nodes) {
  return { '@context': 'https://schema.org', '@graph': nodes.map((n) => pruneSchema(n)).filter(Boolean) };
}
