export default {
  eyebrow: 'Contact',
  h1: 'Contact',
  lede: 'Address, telephone and e-mail details are below. The form can be used for appointment requests and general questions.',
  infoTitle: 'Contact details',
  formTitle: 'Contact form',
  fields: {
    name: { label: 'Full name', error: 'Please enter your full name.' },
    email: { label: 'E-mail', error: 'Enter a valid e-mail address.' },
    phone: { label: 'Telephone (optional)' },
    subject: { label: 'Subject (optional)' },
    message: { label: 'Message', error: 'Please enter your message.' },
  },
  consent: {
    label: 'I have read the Privacy Notice.',
    linkText: 'Privacy Notice',
    error: 'Confirm that you have read the Privacy Notice to continue.',
  },
  warning: 'Do not send confidential information or documents through this form. Submitting it does not create a lawyer–client relationship.',
  submit: 'Send',
  sending: 'Sending…',
  status: {
    invalid: '{n} field(s) in the form need correcting.',
    success: 'Your message has been sent.',
    mailto: 'Your e-mail application has opened. You need to send the message from there.',
    error: 'The message could not be sent. Please write directly to {email}.',
    pending: 'Contact details have not been added yet; the form is not active.',
  },
  faq: {
    title: 'Frequently asked questions',
    items: [
      {
        q: 'How is an appointment requested?',
        a: 'An appointment request can be sent through the contact form on this page, by e-mail or by telephone.',
      },
      {
        q: 'Can confidential information be written in the contact form?',
        a: 'No. Confidential information or documents must not be written in or attached to the form. Submitting the form does not create a lawyer–client relationship; that relationship is formed by a written power of attorney or service agreement.',
      },
    ],
  },
  honeypotLabel: 'Leave this field empty',
};
