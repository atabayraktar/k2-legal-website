// Home page copy (redesign v2). No emphasis markers, no eyebrow strings. Display case is applied by CSS.
// {tokens} resolve via fmt(str, siteVars()); unresolved data renders as bracket placeholders.
export default {
  hero: {
    metaLeft: 'Karaman Berat Avukatlık Ortaklığı',
    metaRight: '{city} / {baro}',
    // Neutral, descriptive statement. Rendered inside one h1 as two spans (CSS uppercase).
    lines: ['Dava ve', 'Danışmanlık'],
    entity:
      'Karaman Berat Avukatlık Ortaklığı, tescilli bir avukatlık ortaklığıdır. Ortaklık dava ve danışmanlık faaliyeti yürütür; faaliyet alanları bu sayfada yer alır.',
    ctaPrimary: 'Randevu Talep Et',
    ctaSecondary: 'Çalışma Alanları',
    photoCaption: 'Beton, alt açı',
    stamp: 'Karaman Berat Avukatlık Ortaklığı',
    kunye: [
      { label: 'Tescilli unvan', value: '{legalName}' },
      { label: 'Şehir / Baro', value: '{city} · {baro}' },
      { label: 'Telefon', value: '{phone}' },
      { label: 'E-posta', value: '{email}' },
    ],
  },
  about: {
    docket: 'Hakkımızda',
    h2: 'Tescilli bir avukatlık ortaklığı',
    lede: 'Ortaklığın faaliyeti 1136 sayılı Avukatlık Kanunu ve Türkiye Barolar Birliği meslek kurallarına tabidir. Müvekkile ait bilgi ve belgeler, avukatın kanundan doğan sır saklama yükümlülüğü kapsamındadır.',
    photoCaption: 'Sarmal merdiven',
    kunye: {
      trigger: 'Ortaklık künyesi',
      close: 'Künyeyi daralt',
      rows: [
        { key: 'legalName', label: 'Tescilli unvan', value: '{legalName}' },
        { key: 'cityBaro', label: 'Şehir / Baro', value: '{city} · {baro}' },
        { key: 'baroRegistry', label: 'Baro sicil', value: '{baroRegistry}' },
        { key: 'foundedYear', label: 'Kuruluş', value: '{foundedYear}' },
        { key: 'activity', label: 'Faaliyet', value: 'Dava ve danışmanlık' },
      ],
    },
  },
  principles: {
    mark: 'İlkeler',
    h2: 'Çalışma ilkeleri',
    lede: 'Aşağıdaki başlıklar, avukatlık mevzuatından doğan genel yükümlülükleri özetler. Bir başlık seçin; açıklaması kâğıda işlenir.',
    rackLabel: 'Çalışma ilkeleri',
    sheetLabel: 'Dosya kâğıdı',
    photoCaption: 'Kâğıt ve damga',
    items: [
      {
        id: 'gizlilik',
        index: 'M.1',
        name: 'Gizlilik',
        statement: 'Sır saklama yükümlülüğü Avukatlık Kanunu’ndan doğar.',
        detail:
          'Avukat, mesleği sırasında öğrendiği bilgileri saklamakla yükümlüdür. Bu nedenle iletişim formu veya e-posta yoluyla gizli bilgi ve belge göndermemeniz rica olunur; bunlar yazılı vekâlet veya hizmet sözleşmesinden sonra paylaşılır.',
      },
      {
        id: 'mevzuat',
        index: 'M.2',
        name: 'Mevzuat çerçevesi',
        statement: 'Faaliyetin çerçevesini kanun ve meslek kuralları çizer.',
        detail:
          '1136 sayılı Avukatlık Kanunu, Türkiye Barolar Birliği Avukatlık Meslek Kuralları ve ilgili diğer mevzuat, dava ve danışmanlık faaliyetinin çerçevesini belirler.',
      },
      {
        id: 'bilgilendirme',
        index: 'M.3',
        name: 'Bilgilendirme',
        statement: 'Müvekkil ile dosyanın durumu hakkında bilgi paylaşılır.',
        detail:
          'Avukat ile müvekkil arasındaki bilgi akışı, dosyanın gelişimini aktarmaya yöneliktir; sonuç konusunda bir taahhüt içermez.',
      },
      {
        id: 'kayit',
        index: 'M.4',
        name: 'Yazılı kayıt',
        statement: 'Talepler ve işlemler yazılı olarak kayda geçer.',
        detail:
          'Karar müvekkile aittir. Seçenekler ve süreler yazılı olarak ortaya konur; yazışmalar ve belgeler dosyada yer alır.',
      },
    ],
  },
  practice: {
    tab: 'Çalışma alanları',
    h2: 'Faaliyet alanları',
    intro:
      'Ortaklık aşağıdaki alanlarda dava ve danışmanlık faaliyeti yürütür. Liste, bilgilendirme amaçlı bir dökümdür; ihtisas veya üstünlük beyanı içermez.',
    photoCaption: 'Mimari detay',
    indexPrefix: 'A.',
    topicsLabel: 'Konu başlıkları',
    approachLabel: 'Süreç',
    cta: 'İletişim',
    readSeparate: 'Ayrı sayfada oku',
  },
  process: {
    stamp: 'Evreler',
    h2: 'Bir dosya nasıl yürür',
    stageLabel: 'Evre',
    steps: [
      { n: '1', title: 'Dinleme ve İnceleme', text: 'Talep, ilgili belge ve bilgilerle birlikte dinlenir; dosyanın hukuki ve usuli durumu incelenir.' },
      { n: '2', title: 'Değerlendirme', text: 'Uygulanacak mevzuat, süreler ve başvurulabilecek yollar yazılı olarak ortaya konur. Karar müvekkile aittir.' },
      { n: '3', title: 'Yürütme', text: 'Seçilen yol doğrultusunda dilekçe, sözleşme, başvuru ve duruşma işleri ilgili mevzuata uygun biçimde yürütülür.' },
      { n: '4', title: 'Bilgilendirme', text: 'Her önemli aşamadan sonra müvekkil yazılı veya sözlü olarak bilgilendirilir; belgeler dosyada saklanır.' },
    ],
  },
  team: {
    docket: 'Ekibimiz',
    label: 'Sicil',
    h2: 'Ortaklar',
    intro: 'Ortakların baro ve sicil bilgileri.',
  },
  band: {
    caption: 'Koridor',
  },
  contact: {
    docket: 'İletişim',
    title: 'İletişim',
    intro: 'Randevu talebi ve genel sorular için aşağıdaki kanallar kullanılabilir.',
    formLabel: 'Talep formu',
    whatsappLink: 'WhatsApp',
  },
};
