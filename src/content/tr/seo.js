// A title of <= 24 chars gets " | {legalName}" appended by buildTitle (total stays <= 60); longer titles stand alone.
// Standalone pages: home, 3 flagship practice areas (seo.areas.<id>), 3 legal pages, 404.
export default {
  home: {
    title: 'Karaman Berat Avukatlık Ortaklığı',
    raw: true,
    description:
      'Karaman Berat Avukatlık Ortaklığı, dava ve danışmanlık faaliyeti yürüten tescilli bir avukatlık ortaklığıdır. Bilgilendirme amaçlı internet sitesi.',
  },
  areas: {
    criminal: {
      title: 'Ceza Hukuku',
      description:
        'Karaman Berat Avukatlık Ortaklığı’nın ceza hukuku alanındaki faaliyetleri: soruşturma ve kovuşturma süreçlerine ilişkin konu başlıkları ve süreç.',
    },
    commercial: {
      title: 'Ticaret ve Şirketler Hukuku',
      description:
        'Karaman Berat Avukatlık Ortaklığı’nın ticaret ve şirketler hukuku alanındaki faaliyetleri: şirket ve sözleşme ilişkileri, konu başlıkları ve süreç.',
    },
    employment: {
      title: 'İş ve Sosyal Güvenlik Hukuku',
      description:
        'Karaman Berat Avukatlık Ortaklığı’nın iş ve sosyal güvenlik hukuku alanındaki faaliyetleri: iş sözleşmeleri, fesih, sosyal sigorta ve süreç.',
    },
  },
  privacy: {
    title: 'Aydınlatma Metni',
    description:
      'İletişim formu ve iletişim kanalları üzerinden işlenen kişisel verilere ilişkin KVKK m.10 kapsamında aydınlatma metni.',
  },
  cookies: {
    title: 'Çerez Politikası',
    description: 'Bu internet sitesinde çerez ve izleme teknolojileri kullanılmaz; çerez politikasının ayrıntıları.',
  },
  disclaimer: {
    title: 'Yasal Uyarı',
    description:
      'İnternet sitesinin bilgilendirme amacı, avukat–müvekkil ilişkisi ve sorumluluk sınırlarına ilişkin yasal uyarı.',
  },
  notFound: { title: 'Sayfa bulunamadı', noindex: true, description: '' },
};
