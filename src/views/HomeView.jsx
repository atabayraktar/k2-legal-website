import Layout from '../components/Layout';
import Hero from '../components/Hero';
import Manifesto from '../components/Manifesto';
import PracticeList from '../components/PracticeList';
import Process from '../components/Process';
import TeamCards from '../components/TeamCards';
import ContactSection from '../components/ContactSection';
import Reveal from '../components/Reveal';
import TextLink from '../components/TextLink';
import { site } from '../content/site.js';
import { orgSchema, websiteSchema, graph } from '../lib/schema.js';
import { pagePath } from '../lib/routes-util.js';

// Shared by the TR and EN home pages. Props come from getStaticProps (see pages/index.jsx, pages/en/index.jsx).
export default function HomeView({ locale, common, seo, page, areas, team, contact }) {
  return (
    <Layout
      locale={locale}
      routeKey="home"
      common={common}
      seo={seo}
      headerTheme="dark"
      jsonLd={[graph(orgSchema(locale), websiteSchema(locale))]}
    >
      <Hero t={page.hero} site={site} locale={locale} />
      <Manifesto t={page.manifesto} locale={locale} site={site} />
      <PracticeList areas={areas} locale={locale} variant="home" t={page.practice} />
      <Process t={page.process} />

      <section id="team" className="team" data-theme="light" aria-labelledby="team-title">
        <div className="container">
          <div className="team__head">
            <Reveal as="p" className="eyebrow">
              {page.team.eyebrow}
            </Reveal>
            <Reveal as="h2" delay={1} id="team-title" className="team__title">
              {page.team.title}
            </Reveal>
            <Reveal as="p" delay={2} className="team__intro lede">
              {page.team.intro}
            </Reveal>
            <Reveal delay={2} className="team__more">
              <TextLink href={pagePath('team', locale)}>{page.team.cta}</TextLink>
            </Reveal>
          </div>
          <TeamCards partners={site.partners} t={team} common={common} locale={locale} variant="home" headingId="team-title" />
        </div>
      </section>

      <ContactSection
        t={contact}
        common={common}
        site={site}
        locale={locale}
        variant="home"
        headingId="contact-title"
        heading={{ eyebrow: page.contact.eyebrow, title: page.contact.title, intro: page.contact.intro, as: 'h2' }}
      />
    </Layout>
  );
}

export function homeStaticProps(locale, getContent) {
  const home = getContent(locale, 'home');
  const practice = getContent(locale, 'practice').page;
  const team = getContent(locale, 'team').page;
  const contact = getContent(locale, 'contact').page;
  return {
    props: {
      locale,
      common: home.common,
      seo: home.seo,
      page: home.page,
      areas: practice.areas.map(({ id, title, oneLine }) => ({ id, title, oneLine })),
      team: { labels: team.labels, factsTemplate: team.factsTemplate },
      contact,
    },
  };
}
