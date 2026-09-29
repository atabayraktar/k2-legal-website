// fmt('Hello {name}', { name: 'x' }); unknown tokens stay as-is.
export const fmt = (str, vars = {}) =>
  String(str).replace(/\{(\w+)\}/g, (m, k) => (vars[k] !== undefined && vars[k] !== null ? vars[k] : m));

export const addressLine = (a) => [a.street, a.district, a.postalCode, a.city].filter(Boolean).join(', ');
