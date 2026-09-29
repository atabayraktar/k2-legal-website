import { site, REQUIRED } from '../content/site.js';

const RE = /^\[.*\]$|___|\.example\b|^TODO/;

// True for placeholder strings, and for null where the value is required.
export function isPending(value, { required = false } = {}) {
  if (value == null) return required;
  if (typeof value === 'string') return RE.test(value.trim());
  if (Array.isArray(value)) return value.length === 0 || value.every((v) => isPending(v));
  if (typeof value === 'object') {
    const vals = Object.values(value);
    return vals.length > 0 && vals.every((v) => v == null || isPending(v));
  }
  return false;
}

export const isRequiredKey = (p) => REQUIRED.includes(p);
export { site };
