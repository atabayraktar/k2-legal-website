// A title of <= 24 chars gets " | {legalName}" appended by buildTitle (total stays <= 60); longer titles stand alone.
// Standalone pages: home, 8 practice areas (seo.areas.<id>), 3 legal pages, 404.
export default {
  home: {
    title: 'Karaman & Berat Avukatlık Ortaklığı',
    raw: true,
    description:
      'Karaman & Berat Avukatlık Ortaklığı, dava ve danışmanlık faaliyeti yürüten tescilli bir avukatlık ortaklığıdır. Bilgilendirme amaçlı internet sitesi.',
  },
  areas: {
    enforcement: {
      title: 'İcra ve İflas Hukuku',
      description:
        'Karaman & Berat Avukatlık Ortaklığı’nın icra ve iflas hukuku alanındaki faaliyetleri: takip, itiraz, haciz ve iflas süreçleri, konu başlıkları.',
    },
    maritime: {
      title: 'Deniz Hukuku',
      description:
        'Karaman & Berat Avukatlık Ortaklığı’nın deniz hukuku alanındaki faaliyetleri: deniz ticareti, gemi alacakları, taşıma, deniz sigortası, konu başlıkları.',
    },
    criminal: {
      title: 'Ceza Hukuku',
      description:
        'Karaman & Berat Avukatlık Ortaklığı’nın ceza hukuku alanındaki faaliyetleri: soruşturma ve kovuşturma süreçlerine ilişkin konu başlıkları ve süreç.',
    },
    commercial: {
      title: 'Ticaret Hukuku',
      description:
        'Karaman & Berat Avukatlık Ortaklığı’nın ticaret hukuku alanındaki faaliyetleri: ticari sözleşmeler, ticari alacaklar, kıymetli evrak, konu başlıkları.',
    },
    corporate: {
      title: 'Şirketler Hukuku ve Danışmanlık',
      description:
        'Karaman & Berat Avukatlık Ortaklığı’nın şirketler hukuku ve danışmanlık alanındaki faaliyetleri: şirket kuruluşu, ortaklık ilişkileri, konu başlıkları.',
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
