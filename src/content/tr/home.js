export default {
  hero: {
    eyebrow: 'Avukatlık Ortaklığı',
    // Neutral, descriptive statement (no self-praise, no comparison). One italic word, factual.
    lines: ['Dava ve', '*danışmanlık*'],
    entity:
      'Karaman Berat Avukatlık Ortaklığı, tescilli bir avukatlık ortaklığıdır. Ortaklık dava ve danışmanlık faaliyeti yürütür; faaliyet alanları Çalışma Alanları sayfasında yer alır.',
    ctaPrimary: 'Randevu Talep Et',
    ctaSecondary: 'Çalışma Alanları',
    cells: [
      { label: 'Tescilli unvan', value: '{legalName}' },
      { label: 'Şehir / Baro', value: '{city} · {baro}' },
      { label: 'İletişim', value: '{phone} · {email}' },
    ],
  },
  manifesto: {
    eyebrow: '01 — Hakkımızda',
    text: 'Karaman Berat Avukatlık Ortaklığı, tescilli bir avukatlık ortaklığıdır. Dava ve danışmanlık dosyaları ilgili mevzuata uygun olarak yürütülür; müvekkil, dosyanın durumu hakkında bilgilendirilir. Müvekkil bilgi ve belgelerinin gizliliği esastır.',
    cta: 'Hakkımızda',
  },
  practice: {
    eyebrow: '02 — Çalışma Alanları',
    title: 'Çalışma alanları',
    intro: 'Aşağıdaki alanlarda faaliyet gösteriyoruz. Her başlık, ilgili sayfada ayrıntılı olarak açıklanır.',
    viewAll: 'Tümünü Gör',
  },
  process: {
    eyebrow: '03 — Çalışma Biçimi',
    title: 'Bir dosya nasıl yürür',
    steps: [
      { n: '01', title: 'Dinleme & İnceleme', text: 'Talep, ilgili belge ve bilgilerle birlikte dinlenir; dosyanın hukuki ve usuli durumu incelenir.' },
      { n: '02', title: 'Değerlendirme', text: 'Uygulanacak mevzuat, süreler ve başvurulabilecek yollar yazılı olarak ortaya konur. Karar müvekkile aittir.' },
      { n: '03', title: 'Yürütme', text: 'Seçilen yol doğrultusunda dilekçe, sözleşme, başvuru ve duruşma işleri ilgili mevzuata uygun biçimde yürütülür.' },
      { n: '04', title: 'Bilgilendirme', text: 'Her önemli aşamadan sonra müvekkil yazılı veya sözlü olarak bilgilendirilir; belgeler dosyada saklanır.' },
    ],
  },
  team: {
    eyebrow: '04 — Ekibimiz',
    title: 'Ortaklar',
    intro: 'Ortaklarımızın baro ve sicil bilgileri.',
    cta: 'Ekibimiz',
  },
  contact: {
    eyebrow: '05 — İletişim',
    title: 'İletişim',
    intro: 'Randevu talebi ve genel sorular için aşağıdaki kanallar kullanılabilir.',
  },
};
