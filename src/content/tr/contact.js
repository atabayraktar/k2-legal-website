// Contact form copy. Neutral wording: no promises of a reply time, no solicitation, no "ücretsiz".
// {email} / {n} tokens are filled by ContactForm. Field order = groups below.
export default {
  title: 'İletişim',
  intro: 'Randevu talebi ve genel sorular için aşağıdaki kanallar kullanılabilir.',
  infoTitle: 'İletişim bilgileri',
  formTitle: 'Randevu talep formu',
  formLead:
    'Formu üç bölümde doldurun. Talep göndermek için WhatsApp açılır; mesajı orada kendiniz gönderirsiniz. Gönderdiğiniz bilgiler yalnızca talebinizi değerlendirmek için kullanılır.',
  groups: [
    { id: 'who', title: 'Kimliğiniz', fields: ['name'] },
    { id: 'reach', title: 'Size nasıl ulaşılır', fields: ['email', 'phone'] },
    { id: 'ask', title: 'Talebiniz', fields: ['subject', 'message'] },
  ],
  groupDone: 'tamamlandı',
  required: 'Zorunlu',
  optional: 'İsteğe bağlı',
  errorPrefix: 'Hata',
  fields: {
    name: {
      label: 'Ad Soyad',
      hint: 'Adınızı ve soyadınızı yazın.',
      error: 'Lütfen adınızı ve soyadınızı yazın.',
    },
    email: {
      label: 'E-posta',
      hint: 'İsteğe bağlı; yazışma için kullanılacak adres.',
      error: 'Geçerli bir e-posta adresi yazın (örnek: ad@alanadi.com).',
    },
    phone: {
      label: 'Telefon',
      hint: 'Görüşme ayarlamak gerekirse kullanılır. Mesaj WhatsApp numaranızdan gelir.',
    },
    subject: {
      label: 'Konu',
      hint: 'Talebin kısa başlığı; örneğin bir faaliyet alanının adı.',
    },
    message: {
      label: 'Mesaj',
      hint: 'Talebinizin genel çerçevesini yazın. Gizli bilgi ve belge eklemeyin.',
      error: 'Lütfen mesajınızı yazın (en az birkaç kelime).',
    },
  },
  consentTitle: 'Onay',
  consent: {
    label: 'Aydınlatma Metni’ni okudum.',
    linkText: 'Aydınlatma Metni',
    error: 'Devam etmek için Aydınlatma Metni’ni okuduğunuzu onaylayın.',
  },
  warning: {
    title: 'Gizli bilgi ve belge göndermeyin',
    text: 'Bu forma kimlik, sağlık, mali durum gibi gizli bilgiler yazmayın; dava belgesi veya başka bir belge eklemeyin. Form üzerinden yapılan yazışma avukat–müvekkil ilişkisi kurmaz; ilişki yazılı vekâlet veya hizmet sözleşmesi ile başlar.',
  },
  submit: 'WhatsApp ile Gönder',
  result: {
    invalid: { title: 'Formda eksik alan var', text: '{n} alan tamamlanmalı:' },
    whatsapp: {
      title: 'WhatsApp açıldı',
      text: 'Mesajınız WhatsApp’ta hazırlandı. Talebin ortaklığa ulaşması için mesajı WhatsApp’tan göndermeniz gerekir. Bu mesaj avukat–müvekkil ilişkisi kurmaz.',
      again: 'Yeni talep yaz',
    },
  },
  honeypotLabel: 'Bu alanı boş bırakın',
};
