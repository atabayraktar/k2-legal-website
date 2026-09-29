import Layout from '../components/Layout';
import Hero from '../components/Hero';
import AboutSection from '../components/AboutSection';
import Principles from '../components/Principles';
import PracticePanels from '../components/PracticePanels';
import Process from '../components/Process';
import TeamCards from '../components/TeamCards';
import PhotoBand from '../components/PhotoBand';
import Faq from '../components/Faq';
import ContactSection from '../components/ContactSection';
import Docket from '../components/Docket';
import Reveal from '../components/Reveal';
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
      <AboutSection t={page.about} site={site} />
      <Principles t={page.principles} />
      <PracticePanels areas={areas} t={page.practice} />
      <Process t={page.process} />

      <section id="ekibimiz" className="ekibimiz" data-theme="dark" aria-labelledby="ekibimiz-title">
        <div className="container">
          <div className="grid ekibimiz__grid">
            <div className="ekibimiz__head">
              <Docket prefix="" label={page.team.docket} />
              <h2 id="ekibimiz-title" className="ekibimiz__title">
                <Reveal as="span" variant="line">
                  {page.team.h2}
                </Reveal>
              </h2>
              <Reveal as="p" delay={1} className="ekibimiz__intro">
                {page.team.intro}
              </Reveal>
            </div>
            <div className="ekibimiz__cards">
              <TeamCards partners={site.partners} t={team} common={common} variant="home" headingId="ekibimiz-title" />
            </div>
          </div>
        </div>
      </section>

      <PhotoBand t={page.band} />
      <Faq t={faq} />
      <ContactSection
        t={contact}
        common={common}
        site={site}
        variant="home"
        headingId="contact-title"
        heading={{ title: page.contact.title, intro: page.contact.intro, docket: page.contact.docket, as: 'h2' }}
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
