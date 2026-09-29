export const notFound = {
  title: 'Page not found',
  text: 'The page you are looking for is not published or may have moved.',
  cta: 'Home',
};

export default {
  htmlLang: 'en',
  skip: 'Skip to content',
  nav: [
    { key: 'about', label: 'About' },
    { key: 'practice', label: 'Practice Areas' },
    { key: 'team', label: 'Team' },
    { key: 'contact', label: 'Contact' },
  ],
  cta: {
    appointment: 'Request an Appointment',
    practice: 'Practice Areas',
    all: 'View All',
    team: 'Team',
    about: 'About',
    write: 'Write to Us',
    back: 'Back',
  },
  menu: { open: 'Menu', close: 'Close', label: 'Main menu', linksLabel: 'Menu links', contactTitle: 'Contact' },
  lang: { label: 'Language', tr: 'TR', en: 'EN', trName: 'Türkçe', enName: 'English' },
  labels: {
    address: 'Address',
    phone: 'Telephone',
    email: 'E-mail',
    kep: 'KEP',
    hours: 'Working hours',
    whatsapp: 'WhatsApp',
    registeredName: 'Registered name',
    cityBaro: 'City / Bar',
    contact: 'Contact',
    partner: 'Partner {n}',
    photoPending: 'Photograph to be added',
    mapPending: 'Map image to be added',
    openMap: 'Open in maps',
    pendingNote: '',
  },
  breadcrumbs: { label: 'Breadcrumb', home: 'Home' },
  footer: {
    legalTitle: 'Legal',
    navTitle: 'Pages',
    contactTitle: 'Contact',
    legalLinks: [
      { key: 'privacy', label: 'Privacy Notice' },
      { key: 'cookies', label: 'Cookie Policy' },
      { key: 'disclaimer', label: 'Legal Notice' },
    ],
    disclaimer:
      'This website has been prepared solely for information under Attorneyship Law No. 1136 and the Turkish Bar Association Regulation on the Prohibition of Advertising; it is not advertising or promotion.',
    rights: '© {year} {legalName}',
  },
  notFound,
};
