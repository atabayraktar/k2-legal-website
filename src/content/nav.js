// Header / menu / footer navigation (one source). Items with `page` are standalone pages; the others are home-page section ids.
export const anchorNav = [
  { id: 'hakkimizda', label: 'Hakkımızda', page: '/hakkimizda/' },
  { id: 'calisma-alanlari', label: 'Çalışma Alanları' },
  { id: 'sss', label: 'SSS' },
  { id: 'iletisim', label: 'İletişim' },
];

export const anchorHref = (id) => `/#${id}`;
export const navHref = (item) => item.page ?? anchorHref(item.id);
