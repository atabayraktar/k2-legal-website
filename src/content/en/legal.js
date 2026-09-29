// Concise EN versions. The Turkish text is the authoritative version. Tokens are resolved in LegalView from site.js.
const updated = '[…]'; // TODO(client) date of last update, set on publication

export default {
  tocLabel: 'On this page',
  updatedLabel: 'Last updated',

  privacy: {
    h1: 'Privacy Notice',
    lede: 'Information under Article 10 of Law No. 6698 on the Protection of Personal Data (KVKK) on personal data processed through this website and our contact channels. The Turkish version is authoritative.',
    updated,
    sections: [
      {
        id: 'controller',
        h2: 'Data controller',
        paragraphs: ['Your personal data is processed by {legalName} (the “Partnership”) as data controller under KVKK.'],
        list: ['Name: {legalName}', 'Address: {address}', 'KEP: {kep}', 'E-mail: {email}', 'Telephone: {phone}'],
      },
      {
        id: 'data',
        h2: 'Personal data processed',
        paragraphs: ['When you use the contact form or other contact channels, the following data may be processed:'],
        list: [
          'Identity and contact data: name, surname, e-mail address, telephone number.',
          'Request data: the subject and any information you choose to write in your message.',
          'Security data: technical access logs kept by the hosting provider (IP address, date and time, requested page).',
        ],
      },
      {
        id: 'purpose',
        h2: 'Purpose of processing',
        paragraphs: [
          'Your data is processed to receive and answer your request, to plan an appointment and to keep the website secure. It is not used for marketing, advertising or profiling.',
        ],
      },
      {
        id: 'basis',
        h2: 'Legal basis',
        paragraphs: [
          'Processing relies on KVKK Article 5/2-f (legitimate interests of the controller, provided fundamental rights are not harmed) and Article 5/2-c (steps preliminary to a contract requested by you). Explicit consent is not requested; before sending the form you confirm that you have read this notice. […]',
        ],
      },
      {
        id: 'transfer',
        h2: 'Transfers',
        paragraphs: ['Data may be transferred, limited to the purposes above and in line with KVKK Articles 8 and 9, to:'],
        list: [
          'The contact-form processor: […]. If the form is sent through such a service, data may be processed on servers abroad. Until one is chosen, the form opens in your own e-mail application.',
          'WhatsApp, if you choose to write there: messages are processed on the infrastructure of Meta Platforms abroad.',
          'The hosting provider (Google Firebase Hosting): server access logs may be kept on servers abroad.',
          'Authorised public bodies and courts, where required by law.',
        ],
      },
      {
        id: 'method',
        h2: 'Method of collection',
        paragraphs: ['Data is collected electronically from you through the contact form, e-mail, KEP, telephone and WhatsApp.'],
      },
      {
        id: 'retention',
        h2: 'Retention period',
        paragraphs: [
          'Data is kept for as long as the purpose requires and as provided by law, then deleted, destroyed or anonymised. Retention periods: […]',
        ],
      },
      {
        id: 'rights',
        h2: 'Rights of data subjects',
        paragraphs: ['Under KVKK Article 11 you may:'],
        list: [
          'Learn whether your data is processed and request information about it,',
          'Learn the purpose of processing and whether it is used accordingly,',
          'Know the third parties to whom data is transferred in Türkiye or abroad,',
          'Request correction of incomplete or inaccurate data,',
          'Request deletion or destruction under Article 7, and notification of these steps to recipients,',
          'Object to a result against you produced by exclusively automated analysis,',
          'Claim compensation for damage caused by unlawful processing.',
        ],
      },
      {
        id: 'apply',
        h2: 'How to apply',
        paragraphs: [
          'Send your written application, as provided by the Communiqué on Procedures and Principles of Applications to the Data Controller, to {address}, to the KEP address {kep} or to {email}. Applications are concluded within thirty days at most. You may also complain to the Personal Data Protection Board.',
        ],
      },
      {
        id: 'confidential',
        h2: 'Do not send confidential information',
        paragraphs: [
          'Do not send confidential information, documents or special categories of personal data through the contact form or first-contact channels. Writing to us does not create a lawyer–client relationship; that arises only through a written power of attorney or service agreement.',
        ],
      },
    ],
  },

  cookies: {
    h1: 'Cookie Policy',
    lede: 'Whether this website uses cookies or similar tracking technologies.',
    updated,
    sections: [
      {
        id: 'general',
        h2: 'General',
        paragraphs: [
          'Cookies are small text files saved in the browser when a website is visited. The website of {legalName} is built so that it does not store cookies or similar tracking identifiers in your browser.',
        ],
      },
      {
        id: 'not-used',
        h2: 'What is not used',
        paragraphs: ['None of the following is used on this website:'],
        list: [
          'Analytics or measurement tools,',
          'Advertising, retargeting or profiling cookies,',
          'Third-party cookies,',
          'Social media plug-ins and embedded third-party content.',
        ],
      },
      {
        id: 'necessary',
        h2: 'Strictly necessary cookies',
        paragraphs: ['No cookie is needed to run the site, so no cookie banner is shown.'],
      },
      {
        id: 'fonts-map',
        h2: 'Fonts and map',
        paragraphs: [
          'Fonts are served from the site’s own server; no request is sent to third-party font services. No map is embedded; the map appears only as an image with an outbound link. If the contact form is sent through a service provider, a request is made to that provider only at the moment of sending; no cookie is set.',
        ],
      },
      {
        id: 'external',
        h2: 'External links',
        paragraphs: [
          'If you follow links to map services or WhatsApp, the cookie and privacy policies of those providers apply. {legalName} is not responsible for them.',
        ],
      },
      {
        id: 'logs',
        h2: 'Technical access logs',
        paragraphs: [
          'The hosting provider may keep technical access logs for server security. See the Privacy Notice for details.',
        ],
      },
      {
        id: 'changes',
        h2: 'Changes and contact',
        paragraphs: [
          'If cookies or tracking are ever introduced, this policy will be updated and a consent mechanism added. Questions: {email}.',
        ],
      },
    ],
  },

  disclaimer: {
    h1: 'Legal Notice',
    lede: 'Terms of use of this website, the lawyer–client relationship and the limits of liability.',
    updated,
    sections: [
      {
        id: 'purpose',
        h2: 'Informational purpose',
        paragraphs: [
          'The information on this website is general and for information only. Nothing here is legal opinion, legal advice or an assessment of a specific matter.',
        ],
      },
      {
        id: 'relationship',
        h2: 'No lawyer–client relationship',
        paragraphs: [
          'Visiting this website, sending the contact form, writing an e-mail or leaving a telephone message does not create a lawyer–client relationship with {legalName}. That relationship arises only through a signed written power of attorney or service agreement.',
        ],
      },
      {
        id: 'confidential',
        h2: 'Do not send confidential information',
        paragraphs: [
          'Do not write confidential information, documents or special categories of personal data in the contact form or other first-contact channels. Before a lawyer–client relationship exists, such information may not be protected by professional secrecy.',
        ],
      },
      {
        id: 'reliance',
        h2: 'Currency of content and no reliance',
        paragraphs: [
          'Legislation and case law change. The currency, accuracy and completeness of the content is not guaranteed. Do not rely on this website to make, take or avoid any legal step; no liability is accepted for its use.',
        ],
      },
      {
        id: 'advertising',
        h2: 'Not advertising or promotion',
        paragraphs: [
          'This website has been prepared solely for information under Attorneyship Law No. 1136 and the Turkish Bar Association Regulation on the Prohibition of Advertising; it is not advertising or promotion.',
        ],
      },
      {
        id: 'ip',
        h2: 'Intellectual property',
        paragraphs: [
          'The text, logo, design and other content were prepared by {legalName} and are protected by intellectual property law. They may not be copied, reproduced, distributed or altered without prior written permission.',
        ],
      },
      {
        id: 'links',
        h2: 'External links',
        paragraphs: [
          '{legalName} is not responsible for the content, privacy practices or availability of third-party sites linked from this website. A link does not mean endorsement.',
        ],
      },
    ],
  },
};
