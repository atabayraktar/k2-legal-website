// Home-page section anchors used by the header nav and the menu overlay (one source, redesign-v2 section 2.3).
// Labels are the visible nav text; ids match the section ids on the home page.
export const anchorNav = [
  { id: 'hakkimizda', label: 'Hakkımızda' },
  { id: 'calisma-alanlari', label: 'Çalışma Alanları' },
  { id: 'ekibimiz', label: 'Ekibimiz' },
  { id: 'sss', label: 'SSS' },
  { id: 'iletisim', label: 'İletişim' },
];

export const anchorHref = (id) => `/#${id}`;
