import Head from 'next/head';
import { site, INDEXABLE } from '../content/site.js';
import { abs } from '../lib/routes-util.js';
import { buildMeta, buildTitle } from '../lib/seo.js';

// Escapes "<" so a JSON-LD string can never close the script tag.
const ld = (node) => JSON.stringify(node).replace(/</g, '\\u003c');

export default function Seo({ routeKey, params, title, description, raw = false, noindex = false, jsonLd = [], preload = [] }) {
  const { canonical } = buildMeta({ routeKey, params });
  const fullTitle = buildTitle(title, { raw });
  const image = abs(site.seo.ogImage);
  const nodes = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
  // Placeholder domain: whole site is noindex,nofollow and carries no absolute URLs (see INDEXABLE in site.js).
  const live = INDEXABLE && !noindex;

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {description ? <meta name="description" content={description} /> : null}
      {!INDEXABLE ? <meta name="robots" content="noindex,nofollow" /> : noindex ? <meta name="robots" content="noindex,follow" /> : null}
      {preload.map((p) => (
        <link key={p.href} rel="preload" as="image" href={p.href} imageSrcSet={p.imagesrcset} imageSizes={p.imagesizes} fetchPriority="high" />
      ))}
      <meta name="theme-color" content={site.seo.themeColor} />
      {live && <link rel="canonical" href={canonical} />}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={site.legalName} />
      <meta property="og:title" content={fullTitle} />
      {description ? <meta property="og:description" content={description} /> : null}
      {live && <meta property="og:url" content={canonical} />}
      <meta property="og:locale" content="tr_TR" />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={site.legalName} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      {description ? <meta name="twitter:description" content={description} /> : null}
      <meta name="twitter:image" content={image} />
      <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      <link rel="icon" href="/favicon-32.png" sizes="32x32" type="image/png" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      {nodes.filter(Boolean).map((node, i) => (
        <script key={`ld-${i}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld(node) }} />
      ))}
    </Head>
  );
}
