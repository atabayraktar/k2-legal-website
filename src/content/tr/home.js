// Home page copy (redesign v2). No emphasis markers, no eyebrow strings, no photo captions. Display case is applied by CSS.
// {tokens} resolve via fmt(str, siteVars()); unresolved data renders as bracket placeholders.
export default {
  hero: {
    // Neutral, descriptive statement. Rendered inside one h1 as two spans (CSS uppercase).
    lines: ['Dava ve', 'Danışmanlık'],
    // Short general-information line: how files are handled, no promise, no solicitation. The entity statement
    // (tescilli unvan, what the partnership is) lives in the Hakkımızda section and the footer.
    slogan: 'Hukukta söz uçar, yazı kalır.',
    entity:
      'Dava ve danışmanlık dosyaları; mevzuat, süre ve yazılı kayıt esasıyla yürütülür. Her dosya kendi gerekçesiyle, kendi takvimiyle ve düzenli bir dosya diliyle ele alınır. Beş faaliyet alanında, bir ortaklık olarak çalışırız.',
    ctaPrimary: 'Randevu Talep Et',
    ctaSecondary: 'Çalışma Alanları',
  },
  about: {
    h2: 'Hakkımızda',
    // Generic, fact-safe text. Specifics (year, names, place) are TODO(client) in site.js (foundedYear, founding.note).
    foundingTitle: 'Nasıl kuruldu',
    founding: [
      'Karaman Berat Avukatlık Ortaklığı, avukatların ortak bir çatı altında çalışmak üzere bir araya gelmesiyle kurulmuş, baroya kayıtlı bir avukatlık ortaklığıdır.',
      'Ortaklar, dava ve danışmanlık işlerini ortak bir dosya düzeni içinde yürütmek amacıyla birlikte çalışır.',
    ],
    foundedSentence: 'Ortaklık {foundedYear} yılında kurulmuştur.',
    activityTitle: 'Ne yapıyoruz',
    activity: [
      'Ortaklığın faaliyeti; dosyanın incelenmesini, dilekçe ve sözleşme hazırlanmasını, dava ve takip işlemlerinin yürütülmesini ve müvekkilin bilgilendirilmesini kapsar. Faaliyet alanları bu sayfada ayrıca listelenmiştir.',
      'Faaliyet, 1136 sayılı Avukatlık Kanunu ve Türkiye Barolar Birliği meslek kurallarına tabidir; müvekkile ait bilgi ve belgeler sır saklama yükümlülüğü kapsamındadır.',
    ],
    kunye: {
      rows: [
        { key: 'legalName', label: 'Tescilli unvan', value: '{legalName}' },
        { key: 'cityBaro', label: 'Şehir', value: '{city}' },
        { key: 'foundedYear', label: 'Kuruluş', value: '{foundedYear}' },
        { key: 'activity', label: 'Faaliyet', value: 'Dava ve danışmanlık' },
      ],
    },
  },
  principles: {
    h2: 'Çalışma ilkeleri',
    lede: 'Aşağıdaki başlıklar, avukatlık mevzuatından doğan genel yükümlülükleri özetler. Bir başlık seçin; açıklaması kâğıda işlenir.',
    rackLabel: 'Çalışma ilkeleri',
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
    h2: 'Çalışma alanları',
    intro:
      'Ortaklık aşağıdaki alanlarda dava ve danışmanlık faaliyeti yürütür. Liste, bilgilendirme amaçlı bir dökümdür; ihtisas veya üstünlük beyanı içermez.',
    topicsLabel: 'Konu başlıkları',
    approachLabel: 'Süreç',
    cta: 'İletişim',
    readSeparate: 'Detaylı bilgi için',
  },
  process: {
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
    h2: 'Ortaklar',
  },
  contact: {
    title: 'İletişim',
    intro: 'Randevu talebi ve genel sorular için aşağıdaki kanallar kullanılabilir.',
    whatsappLink: 'WhatsApp',
  },
};
