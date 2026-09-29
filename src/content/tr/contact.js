export default {
  eyebrow: 'İletişim',
  h1: 'İletişim',
  lede: 'Adres, telefon ve e-posta bilgileri aşağıdadır. Randevu talebi ve genel sorular için form kullanılabilir.',
  infoTitle: 'İletişim bilgileri',
  formTitle: 'İletişim formu',
  fields: {
    name: { label: 'Ad Soyad', error: 'Lütfen adınızı ve soyadınızı yazın.' },
    email: { label: 'E-posta', error: 'Geçerli bir e-posta adresi yazın.' },
    phone: { label: 'Telefon (isteğe bağlı)' },
    subject: { label: 'Konu (isteğe bağlı)' },
    message: { label: 'Mesaj', error: 'Lütfen mesajınızı yazın.' },
  },
  consent: {
    label: 'Aydınlatma Metni’ni okudum.',
    linkText: 'Aydınlatma Metni',
    error: 'Devam etmek için Aydınlatma Metni’ni okuduğunuzu onaylayın.',
  },
  warning: 'Bu formla gizli bilgi veya belge göndermeyin. Formun gönderilmesi avukat–müvekkil ilişkisi kurmaz.',
  submit: 'Gönder',
  sending: 'Gönderiliyor…',
  status: {
    invalid: 'Formda düzeltilmesi gereken {n} alan var.',
    success: 'Mesajınız iletildi.',
    mailto: 'E-posta uygulamanız açıldı. Mesajı oradan göndermeniz gerekir.',
    error: 'Mesaj gönderilemedi. Lütfen doğrudan {email} adresine yazın.',
    pending: 'İletişim bilgileri henüz eklenmedi; form etkin değildir.',
  },
  faq: {
    title: 'Sık sorulan sorular',
    items: [
      {
        q: 'Randevu nasıl talep edilir?',
        a: 'Randevu talebi bu sayfadaki iletişim formu, e-posta veya telefon aracılığıyla iletilebilir.',
      },
      {
        q: 'İletişim formuna gizli bilgi yazılabilir mi?',
        a: 'Hayır. Forma gizli bilgi veya belge yazılmamalı, eklenmemelidir. Formun gönderilmesi avukat–müvekkil ilişkisi kurmaz; bu ilişki yazılı bir vekâlet veya hizmet sözleşmesiyle kurulur.',
      },
    ],
  },
  honeypotLabel: 'Bu alanı boş bırakın',
};
