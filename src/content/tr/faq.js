// FAQ: 6 items (client ruling: 5-6 max). Descriptive only: no fee, success, specialisation or comparison claims.
// Rendered as visible HTML and as FAQPage JSON-LD from this same array (lib/schema.js faqSchema) so they cannot drift.
// {tokens} resolve via fmt(str, siteVars()); an item that still contains a pending value is left out of JSON-LD.
// gate: 'practice' -> left out of JSON-LD until FEATURES.practiceConfirmed (TODO(client) confirm the areas).
export default {
  h2: 'Sıkça sorulan sorular',
  intro: 'Altı kısa soru ve cevap. Cevaplar bilgilendirme amaçlıdır; hukuki görüş yerine geçmez.',
  items: [
    {
      id: 's-01',
      q: 'Randevu nasıl talep edilir?',
      a: 'Randevu talebi bu sayfadaki iletişim formu, telefon ({phone}) veya e-posta ({email}) yoluyla iletilebilir. Talebinizde adınız, ulaşabileceğimiz bir iletişim bilgisi ve konunun kısa bir başlığı yeterlidir. Randevu tarihi ve saati, ortaklığın takvimine göre karşılıklı belirlenir.',
    },
    {
      id: 's-02',
      q: 'İletişim formuna gizli bilgi veya belge yazılabilir mi?',
      a: 'Hayır. Form, e-posta veya mesaj yoluyla gizli bilgi, belge, kimlik ya da sağlık verisi göndermemenizi rica ederiz. Bu internet sitesi üzerinden yapılan yazışma avukat–müvekkil ilişkisi kurmaz; ilişki, yazılı vekâlet veya hizmet sözleşmesi ile başlar.',
    },
    {
      id: 's-03',
      q: 'Bu internet sitesindeki bilgiler hukuki görüş yerine geçer mi?',
      a: 'Hayır. Sitedeki içerikler yalnızca genel bilgilendirme amacıyla hazırlanmıştır; belirli bir dosya için hukuki görüş veya tavsiye niteliği taşımaz. Her uyuşmazlık, kendi olguları ve ilgili mevzuata göre ayrıca değerlendirilir.',
    },
    {
      id: 's-04',
      gate: 'practice',
      q: 'Ortaklık hangi alanlarda faaliyet gösterir?',
      a: 'Ortaklık; icra ve iflas, deniz hukuku, ceza, ticaret ile şirketler hukuku ve danışmanlık alanlarında dava ve danışmanlık faaliyeti yürütür. Bu liste bilgilendirme amaçlı bir dökümdür; ihtisas veya üstünlük beyanı içermez.',
    },
    {
      id: 's-05',
      q: 'Bir dosya nasıl yürütülür?',
      a: 'Talep ve belgeler dinlenir, dosyanın hukuki ve usuli durumu incelenir; uygulanacak mevzuat, süreler ve başvurulabilecek yollar yazılı olarak ortaya konur. Karar müvekkile aittir. Seçilen yol doğrultusunda işlemler ilgili mevzuata uygun biçimde yürütülür ve önemli aşamalardan sonra müvekkil bilgilendirilir. Sonuç konusunda bir taahhütte bulunulmaz.',
    },
    {
      id: 's-06',
      q: 'Ortaklığın adresi ve çalışma saatleri nedir?',
      a: 'Ortaklığın adresi {address}; çalışma saatleri {hours}. Telefon: {phone}, e-posta: {email}. Randevu talebi için iletişim formu da kullanılabilir.',
    },
  ],
};
