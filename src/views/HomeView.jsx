import Layout from '../components/Layout';
import Hero from '../components/Hero';
import Principles from '../components/Principles';
import PracticePanels from '../components/PracticePanels';
import Faq from '../components/Faq';
import ContactSection from '../components/ContactSection';
import { site } from '../content/site.js';
import { orgSchema, websiteSchema, faqSchema, graph } from '../lib/schema.js';

// Props come from getStaticProps (see pages/index.jsx). Section order (and theme): Hero (bone), Çalışma alanları (ink),
// İlkeler (bone), SSS (ink), İletişim (bone), footer (ink). About / team / process live on /hakkimizda/.
export default function HomeView({ common, seo, page, faq, areas, contact }) {
  return (
    <Layout
      routeKey="home"
      common={common}
      seo={seo}
      headerTheme="light"
      jsonLd={[graph(orgSchema(), websiteSchema(), faqSchema(faq.items))]}
    >
      <Hero t={page.hero} />
      <PracticePanels areas={areas} t={page.practice} />
      <Principles t={page.principles} />
      <Faq t={faq} />
      <ContactSection
        t={contact}
        common={common}
        site={site}
        variant="home"
        headingId="contact-title"
        heading={{ title: page.contact.title, intro: page.contact.intro }}
      />
    </Layout>
  );
}

export function homeStaticProps(getContent) {
  const home = getContent('home');
  const practice = getContent('practice').page;
  const contact = getContent('contact').page;
  const faq = getContent('faq').page;
  return {
    props: {
      common: home.common,
      seo: home.seo,
      page: home.page,
      faq,
      areas: practice.areas,
      contact,
    },
  };
}
