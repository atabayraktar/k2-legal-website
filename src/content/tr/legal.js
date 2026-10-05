// Long-form legal copy (TR). Tokens {legalName} {address} {email} {kep} {phone} {city} {baro} are resolved in LegalView from site.js.
// Every unknown is a blank token […] (source markers: TODO(client) in comments, never rendered); nothing here is an invented fact. Counsel (KVKK + bar) must approve before launch.
const updated = '[…]'; // TODO(client) son güncelleme tarihi, yayın anında

export default {
  tocLabel: 'İçerik',
  updatedLabel: 'Son güncelleme',

  privacy: {
    h1: 'Aydınlatma Metni',
    lede: '6698 sayılı Kişisel Verilerin Korunması Kanunu’nun 10. maddesi uyarınca, bu internet sitesi ve iletişim kanalları üzerinden işlenen kişisel verilere ilişkin bilgilendirme.',
    updated,
    sections: [
      {
        id: 'sorumlu',
        h2: 'Veri sorumlusu',
        paragraphs: [
          'Kişisel verileriniz, 6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”) kapsamında veri sorumlusu sıfatıyla {legalName} (“Ortaklık”) tarafından işlenmektedir.',
        ],
        list: [
          'Unvan: {legalName}',
          'Adres: {address}',
          'KEP adresi: {kep}',
          'E-posta: {email}',
          'Telefon: {phone}',
        ],
      },
      {
        id: 'veriler',
        h2: 'İşlenen kişisel veriler',
        paragraphs: ['İletişim formunu veya diğer iletişim kanallarını kullandığınızda aşağıdaki veriler işlenebilir:'],
        list: [
          'Kimlik ve iletişim verisi: ad, soyad, e-posta adresi, telefon numarası.',
          'Talep verisi: konu başlığı ve mesaj içeriğinde kendiliğinden yazdığınız bilgiler.',
          'İşlem güvenliği verisi: internet sitesinin barındırıldığı hizmet sağlayıcının tuttuğu teknik erişim kayıtları (IP adresi, tarih ve saat, istenen sayfa).',
        ],
      },
      {
        id: 'amac',
        h2: 'İşleme amacı',
        paragraphs: [
          'Verileriniz; iletişim talebinizin alınması ve yanıtlanması, randevu talebinin planlanması ve internet sitesinin güvenliğinin sağlanması amaçlarıyla işlenir. Verileriniz pazarlama, reklam veya profilleme amacıyla kullanılmaz.',
        ],
      },
      {
        id: 'sebep',
        h2: 'Hukuki sebep',
        paragraphs: [
          'Verileriniz, KVKK m.5/2-f uyarınca ilgili kişinin temel hak ve özgürlüklerine zarar vermemek kaydıyla veri sorumlusunun meşru menfaati için veri işlenmesinin zorunlu olması ve KVKK m.5/2-c uyarınca talebinizle bağlantılı bir sözleşmenin kurulmasına yönelik ön işlemlerin yapılması hukuki sebeplerine dayanılarak işlenir.',
          'İletişim formunda açık rıza aranmaz; formu göndermeden önce bu metni okuduğunuzu onaylamanız istenir.',
        ],
      },
      {
        id: 'aktarim',
        h2: 'Kişisel verilerin aktarımı',
        paragraphs: [
          'Verileriniz, yukarıdaki amaçlarla sınırlı olarak ve KVKK m.8 ile m.9 hükümlerine uygun biçimde aşağıdaki alıcılara aktarılabilir:',
        ],
        list: [
          'İletişim formu: internet sitesinde bir sunucuya veri gönderilmez. Formu doldurup gönderdiğinizde yazdıklarınız WhatsApp’ta hazır bir mesaj olarak açılır ve mesajı WhatsApp üzerinden siz gönderirsiniz.',
          'İletişim formu dâhil olmak üzere WhatsApp üzerinden yazdığınız mesajlar, WhatsApp hizmetinin sağlayıcısı olan Meta Platforms grubunun yurt dışındaki altyapısında işlenir. WhatsApp ile iletişim kurmak tamamen tercihinize bağlıdır.',
          'İnternet sitesinin barındırma hizmeti (Google Firebase Hosting): sunucu erişim kayıtları yurt dışındaki sunucularda tutulabilir.',
          'Kanunen yetkili kamu kurum ve kuruluşları ile yargı mercileri: mevzuattan doğan zorunluluk hâlinde.',
        ],
      },
      {
        id: 'yontem',
        h2: 'Toplama yöntemi',
        paragraphs: [
          'Verileriniz; internet sitesindeki iletişim formu, e-posta, KEP, telefon ve WhatsApp yoluyla, elektronik ortamda ve sizin tarafınızdan iletilerek toplanır.',
        ],
      },
      {
        id: 'saklama',
        h2: 'Saklama süresi',
        paragraphs: [
          'Verileriniz, işleme amacının gerektirdiği süre boyunca ve ilgili mevzuatta öngörülen saklama sürelerine uygun olarak saklanır; sürenin sonunda silinir, yok edilir veya anonim hâle getirilir.',
          'Saklama süresi: İletişim talepleri ve yazışmalar, talebin sonuçlandırılmasından itibaren en fazla bir yıl süreyle saklanır. Yazılı vekâlet veya hizmet sözleşmesi kurulması hâlinde dosyaya ilişkin süreler ayrıca ilgili mevzuata göre belirlenir.',
        ],
      },
      {
        id: 'haklar',
        h2: 'İlgili kişi hakları',
        paragraphs: ['KVKK m.11 uyarınca veri sahibi olarak şu haklara sahipsiniz:'],
        list: [
          'Kişisel verilerinizin işlenip işlenmediğini öğrenme,',
          'İşlenmişse buna ilişkin bilgi talep etme,',
          'İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme,',
          'Yurt içinde veya yurt dışında verilerin aktarıldığı üçüncü kişileri bilme,',
          'Eksik veya yanlış işlenmiş olması hâlinde düzeltilmesini isteme,',
          'KVKK m.7 çerçevesinde silinmesini veya yok edilmesini isteme,',
          'Düzeltme, silme ve yok etme işlemlerinin verilerin aktarıldığı üçüncü kişilere bildirilmesini isteme,',
          'İşlenen verilerin münhasıran otomatik sistemler aracılığıyla analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme,',
          'Kanuna aykırı işleme nedeniyle zarara uğramanız hâlinde zararın giderilmesini talep etme.',
        ],
      },
      {
        id: 'basvuru',
        h2: 'Başvuru yöntemi',
        paragraphs: [
          'Yukarıdaki haklarınıza ilişkin başvurularınızı, Veri Sorumlusuna Başvuru Usul ve Esasları Hakkında Tebliğ’de öngörülen yöntemlerle yazılı olarak {address} adresine, {kep} KEP adresine veya {email} e-posta adresine iletebilirsiniz.',
          'Başvurunuzda kimliğinizi tespit edici bilgilerin ve talebinizin açık biçimde yer alması gerekir. Başvurular, talebin niteliğine göre en geç otuz gün içinde sonuçlandırılır. Başvurunuza verilen yanıttan memnun kalmamanız hâlinde Kişisel Verileri Koruma Kurulu’na şikâyette bulunma hakkınız saklıdır.',
        ],
      },
      {
        id: 'gizli',
        h2: 'Gizli bilgi göndermeme uyarısı',
        paragraphs: [
          'İletişim formu ve diğer ilk iletişim kanalları üzerinden gizli bilgi, belge, sağlık veya ceza soruşturmasına ilişkin ayrıntı ya da özel nitelikli kişisel veri göndermeyiniz. Bu kanallar üzerinden yapılan yazışma avukat–müvekkil ilişkisi kurmaz; ilişki yalnızca yazılı vekâlet veya hizmet sözleşmesiyle doğar.',
        ],
      },
    ],
  },

  cookies: {
    h1: 'Çerez Politikası',
    lede: 'Bu internet sitesinin çerez ve benzeri izleme teknolojileri kullanıp kullanmadığına ilişkin bilgilendirme.',
    updated,
    sections: [
      {
        id: 'genel',
        h2: 'Genel bilgi',
        paragraphs: [
          'Çerezler, bir internet sitesi ziyaret edildiğinde tarayıcıya kaydedilen küçük metin dosyalarıdır. {legalName} internet sitesi, ziyaretçilerin tarayıcısında çerez veya benzeri bir izleme teknolojisi ile kayıt oluşturmayacak şekilde hazırlanmıştır.',
        ],
      },
      {
        id: 'kullanilmayan',
        h2: 'Kullanılmayanlar',
        paragraphs: ['Bu internet sitesinde aşağıdakilerin hiçbiri kullanılmaz:'],
        list: [
          'Analitik ve ölçümleme araçları,',
          'Reklam, yeniden hedefleme veya profilleme çerezleri,',
          'Üçüncü taraf çerezleri,',
          'Sosyal medya eklentileri ve gömülü üçüncü taraf içerikleri.',
        ],
      },
      {
        id: 'zorunlu',
        h2: 'Zorunlu çerezler',
        paragraphs: [
          'Siteyi çalıştırmak için zorunlu olan çerez de bulunmamaktadır. Bu nedenle çerez onay penceresi gösterilmez.',
        ],
      },
      {
        id: 'yazi-harita',
        h2: 'Yazı tipleri ve harita',
        paragraphs: [
          'Yazı tipleri sitenin kendi sunucusundan yüklenir; üçüncü taraf yazı tipi hizmetlerine istek gönderilmez. Adres bilgisi için gömülü harita kullanılmaz; harita, yalnızca bir görsel ve dış bağlantı olarak sunulur. İletişim formu bir hizmet sağlayıcı üzerinden gönderilirse, yalnızca gönderim anında o sağlayıcıya istek yapılır; bu site tarafından çerez bırakılmaz.',
        ],
      },
      {
        id: 'dis',
        h2: 'Dış bağlantılar',
        paragraphs: [
          'Harita hizmetleri veya WhatsApp gibi dış bağlantılara tıkladığınızda ilgili hizmet sağlayıcının kendi çerez ve gizlilik politikaları geçerli olur. Bu politikalardan {legalName} sorumlu değildir.',
        ],
      },
      {
        id: 'kayit',
        h2: 'Teknik erişim kayıtları',
        paragraphs: [
          'İnternet sitesinin barındırma hizmet sağlayıcısı, sunucu güvenliği için teknik erişim kayıtları tutabilir. Bu kayıtlara ilişkin bilgi Aydınlatma Metni’nde yer almaktadır.',
        ],
      },
      {
        id: 'degisiklik',
        h2: 'Değişiklikler ve iletişim',
        paragraphs: [
          'Sitede çerez veya izleme teknolojisi kullanımına başlanması hâlinde bu politika güncellenir ve gerekli onay mekanizması kurulur. Sorularınız için {email} adresine yazabilirsiniz.',
        ],
      },
    ],
  },

  disclaimer: {
    h1: 'Yasal Uyarı',
    lede: 'Bu internet sitesinin kullanımına ilişkin koşullar, avukat–müvekkil ilişkisi ve sorumluluk sınırları.',
    updated,
    sections: [
      {
        id: 'amac',
        h2: 'Bilgilendirme amacı',
        paragraphs: [
          'Bu internet sitesinde yer alan bilgiler yalnızca genel bilgilendirme amacıyla hazırlanmıştır. Hiçbir içerik hukuki görüş, hukuki danışmanlık veya belirli bir olaya ilişkin değerlendirme niteliği taşımaz.',
        ],
      },
      {
        id: 'iliski',
        h2: 'Avukat–müvekkil ilişkisi',
        paragraphs: [
          'İnternet sitesini ziyaret etmek, iletişim formunu göndermek, e-posta yazmak veya telefonla arayıp mesaj bırakmak, {legalName} ile arasında avukat–müvekkil ilişkisi kurmaz. Bu ilişki yalnızca yazılı vekâlet veya hizmet sözleşmesinin imzalanmasıyla doğar.',
        ],
      },
      {
        id: 'gizli',
        h2: 'Gizli bilgi göndermeyin',
        paragraphs: [
          'İletişim formuna veya diğer ilk iletişim kanallarına gizli bilgi, belge ya da özel nitelikli kişisel veri yazmayınız. Avukat–müvekkil ilişkisi kurulmadan önce iletilen bilgilerin gizlilik kapsamı belirsiz olabilir; bu nedenle göndermeyiniz.',
        ],
      },
      {
        id: 'guncellik',
        h2: 'İçeriğin güncelliği ve dayanılmaması',
        paragraphs: [
          'Mevzuat ve yargı içtihatları değişebilir. İçeriğin güncelliği, doğruluğu veya eksiksizliği garanti edilmez. Sitedeki bilgilere dayanarak hukuki bir karar alınmamalı, işlem yapılmamalı veya işlemden kaçınılmamalıdır; bu bilgilerin kullanımından doğan sonuçlardan sorumluluk kabul edilmez.',
        ],
      },
      {
        id: 'reklam',
        h2: 'Reklam ve tanıtım niteliği taşımaz',
        paragraphs: [
          'Bu internet sitesi, 1136 sayılı Avukatlık Kanunu ve Türkiye Barolar Birliği Reklam Yasağı Yönetmeliği kapsamında yalnızca bilgilendirme amacıyla hazırlanmıştır; reklam ve tanıtım niteliği taşımaz.',
        ],
      },
      {
        id: 'fikri',
        h2: 'Fikri mülkiyet',
        paragraphs: [
          'Sitedeki metin, logo, tasarım ve diğer içerik {legalName} tarafından hazırlanmıştır ve fikri mülkiyet mevzuatı kapsamında korunur. İçerik, önceden yazılı izin alınmadan kopyalanamaz, çoğaltılamaz, dağıtılamaz veya değiştirilemez.',
        ],
      },
      {
        id: 'dis',
        h2: 'Dış bağlantılar',
        paragraphs: [
          'Sitede yer alan üçüncü taraf bağlantılarının içeriğinden, gizlilik uygulamalarından ve erişilebilirliğinden {legalName} sorumlu değildir. Bağlantı verilmesi, ilgili sitenin içeriğinin onaylandığı anlamına gelmez.',
        ],
      },
    ],
  },
};
