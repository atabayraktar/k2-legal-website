import Layout from '../components/Layout';
import Hero from '../components/Hero';
import AboutSection from '../components/AboutSection';
import Principles from '../components/Principles';
import PracticePanels from '../components/PracticePanels';
import Process from '../components/Process';
import TeamCards from '../components/TeamCards';
import Faq from '../components/Faq';
import ContactSection from '../components/ContactSection';
import { site } from '../content/site.js';
import { orgSchema, websiteSchema, faqSchema, graph } from '../lib/schema.js';

// Props come from getStaticProps (see pages/index.jsx). Section order follows redesign-v2 section 3.6.
export default function HomeView({ common, seo, page, faq, areas, team, contact }) {
  return (
    <Layout
      routeKey="home"
      common={common}
      seo={seo}
      headerTheme="light"
      jsonLd={[graph(orgSchema(), websiteSchema(), faqSchema(faq.items))]}
    >
      <Hero t={page.hero} />
      <AboutSection t={page.about} site={site}>
        <div id="ekibimiz" className="ekibimiz" role="group" aria-labelledby="ekibimiz-title">
          <div className="container">
            <div className="grid ekibimiz__grid">
              <h2 id="ekibimiz-title" className="visually-hidden">
                {page.team.h2}
              </h2>
              <div className="ekibimiz__cards">
                <TeamCards partners={site.partners} t={team} common={common} variant="home" headingId="ekibimiz-title" />
              </div>
            </div>
          </div>
        </div>
      </AboutSection>
      <Principles t={page.principles} />
      <PracticePanels areas={areas} t={page.practice} />
      <Process t={page.process} />

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
  const team = getContent('team').page;
  const contact = getContent('contact').page;
  const faq = getContent('faq').page;
  return {
    props: {
      common: home.common,
      seo: home.seo,
      page: home.page,
      faq,
      areas: practice.areas,
      team: { labels: team.labels, factsTemplate: team.factsTemplate, card: team.card ?? null },
      contact,
    },
  };
}
