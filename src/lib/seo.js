import { site } from '../content/site.js';
import { abs, routePath } from './routes-util.js';

const MAX = 60;

// Title with " | legalName" suffix, but never longer than 60 chars: if the suffixed
// version is too long the bare title is used.
export function buildTitle(title, { raw = false } = {}) {
  if (raw) return title;
  const full = `${title} | ${site.legalName}`;
  return full.length <= MAX ? full : title;
}

export function trimDescription(text, max = 155) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(' '))}…`;
}

export function buildMeta({ routeKey, params }) {
  const path = routePath(routeKey, params);
  return { path, canonical: abs(path) };
}
