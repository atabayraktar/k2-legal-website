// Builds a mailto: URL from form values (used when no form endpoint is configured).
export function buildMailto({ to, subject, name, email, phone, message }) {
  const body = [`Ad Soyad: ${name}`, `E-posta: ${email}`, phone ? `Telefon: ${phone}` : null, '', message]
    .filter((l) => l !== null)
    .join('\r\n')
    .slice(0, 1800);
  return `mailto:${to}?subject=${encodeURIComponent(subject || 'İletişim formu')}&body=${encodeURIComponent(body)}`;
}
