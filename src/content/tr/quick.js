// "Hızlı bilgi" panel: a scripted question flow (not a real chatbot). Choices are collected and sent as a pre-filled
// WhatsApp message; nothing is stored or sent by the site itself. Wording: neutral, no promises, no solicitation.
// Steps per area: topic -> up to two small questions (multi-select chips) -> optional free note -> summary + send.
export default {
  open: 'Hızlı bilgi',
  close: 'Hızlı bilgi penceresini kapat',
  title: 'Hızlı bilgi',
  tag: 'K² · Not defteri',
  restart: 'Baştan başla',
  back: 'Geri',
  multiHint: 'Birden fazla seçebilirsiniz.',
  next: 'Devam',
  skip: 'Geç',
  notePlaceholder: 'İsterseniz kısaca yazın…',
  noteLabel: 'Not (isteğe bağlı)',
  noteAsk: 'Adınızı ve soyadınızı yazın; isterseniz kısa bir not ekleyin.',
  ownAsk: 'Adınızı ve soyadınızı, ardından mesajınızı yazın.',
  nameLabel: 'Ad Soyad',
  namePlaceholder: 'Adınız ve soyadınız',
  nameLine: 'Ad Soyad',
  nameHint: 'Adınızı ve soyadınızı birlikte yazın.',
  required: 'Zorunlu',
  noteWarn: 'Kimlik, banka veya dosya numarası gibi gizli bilgileri yazmayın.',
  summaryAsk: 'Mesajınız hazır. WhatsApp’ta açılacak, göndermeden önce gözden geçirebilirsiniz.',
  summaryLabel: 'Mesaj önizlemesi',
  send: 'ile gönder',
  sendLabel: 'WhatsApp ile gönder',
  greeting: 'Merhaba, internet sitesindeki hızlı bilgi bölümünden yazıyorum.',
  topicLabel: 'Konu',
  noteLine: 'Not',
  topicAsk: 'Hangi konuda bilgi almak istersiniz?',
  own: { id: 'own', label: 'Kendim yazmak istiyorum' },
  other: { id: 'general', label: 'Genel bilgi' },
  areas: [
    {
      id: 'criminal',
      label: 'Ceza Hukuku',
      questions: [
        {
          id: 'role',
          ask: 'Dosyadaki konumunuz nedir?',
          label: 'Konum',
          options: ['Şüpheli / sanık', 'Mağdur / katılan', 'Yakınıyım', 'Henüz belirli değil'],
        },
        {
          id: 'stage',
          ask: 'Süreç hangi aşamada?',
          label: 'Aşama',
          options: ['Soruşturma', 'İddianame sonrası', 'Karar verildi, kanun yolu', 'Emin değilim'],
        },
      ],
    },
    {
      id: 'maritime',
      label: 'Deniz Hukuku',
      questions: [
        {
          id: 'topic',
          ask: 'Konu hangi başlığa daha yakın?',
          label: 'Başlık',
          options: ['Navlun / çarter', 'Konşimento, eşya taşıma', 'Gemi alacağı, haciz', 'Deniz kazası, sigorta', 'Gemi alım-satım'],
        },
        {
          id: 'stage',
          ask: 'Durum nedir?',
          label: 'Durum',
          options: ['Sözleşme öncesi', 'Sefer sürüyor', 'Teslim sonrası uyuşmazlık', 'Dava / başvuru aşamasında'],
        },
      ],
    },
    {
      id: 'enforcement',
      label: 'İcra ve İflas Hukuku',
      questions: [
        {
          id: 'side',
          ask: 'Takipte hangi taraftasınız?',
          label: 'Taraf',
          options: ['Alacaklı', 'Borçlu', 'Henüz belirli değil'],
        },
        {
          id: 'stage',
          ask: 'Takip hangi aşamada?',
          label: 'Aşama',
          options: ['Henüz başlamadı', 'Ödeme emri tebliğ edildi', 'İtiraz edildi', 'Haciz aşamasında'],
        },
      ],
    },
    {
      id: 'commercial',
      label: 'Ticaret Hukuku',
      questions: [
        {
          id: 'topic',
          ask: 'Konu hangi başlığa daha yakın?',
          label: 'Başlık',
          options: ['Ticari sözleşme', 'Ticari alacak', 'Çek / senet', 'Bayilik, acentelik, dağıtım', 'Haksız rekabet'],
        },
        {
          id: 'stage',
          ask: 'Durum nedir?',
          label: 'Durum',
          options: ['Sözleşme hazırlığı', 'Uyuşmazlık var', 'Arabuluculuk / dava aşamasında'],
        },
      ],
    },
    {
      id: 'corporate',
      label: 'Şirketler Hukuku ve Danışmanlık',
      questions: [
        {
          id: 'topic',
          ask: 'Konu hangi başlığa daha yakın?',
          label: 'Başlık',
          options: ['Şirket kuruluşu', 'Pay devri', 'Genel kurul / yönetim kurulu kararı', 'Birleşme, bölünme', 'Sürekli danışmanlık'],
        },
        {
          id: 'stage',
          ask: 'Durum nedir?',
          label: 'Durum',
          options: ['Planlama aşamasında', 'İşlem yapıldı, belgeler düzenlenecek', 'Ortaklar arasında uyuşmazlık var'],
        },
      ],
    },
  ],
};
