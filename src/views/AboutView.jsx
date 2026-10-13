import Layout from '../components/Layout';
import AboutSection from '../components/AboutSection';
import Process from '../components/Process';
import TeamCards from '../components/TeamCards';
import { site } from '../content/site.js';
import { abs, pagePath } from '../lib/routes-util.js';
import { orgSchema, websiteSchema, breadcrumbSchema, graph } from '../lib/schema.js';

// Hakkimizda: about text + partners (ink), then how a file is run (bone).
// Props come from aboutStaticProps (pages/hakkimizda.jsx).
export default function AboutView({ common, seo, home, about, team }) {
  const ld = graph(
    orgSchema(),
    websiteSchema(),
    breadcrumbSchema([
      { name: common.breadcrumbs.home, url: abs(pagePath('home')) },
      { name: about.breadcrumb, url: abs(pagePath('about')) },
    ]),
  );
  return (
    <Layout routeKey="about" common={common} seo={seo} headerTheme="dark" jsonLd={[ld]}>
      <AboutSection t={home.about} site={site} headingAs="h1">
        <div id="ekibimiz" className="ekibimiz" role="group" aria-labelledby="ekibimiz-title">
          <div className="container">
            <div className="grid ekibimiz__grid">
              <h2 id="ekibimiz-title" className="visually-hidden">
                {home.team.h2}
              </h2>
              <div className="ekibimiz__cards">
                <TeamCards partners={site.partners} t={team} common={common} variant="home" headingId="ekibimiz-title" />
              </div>
            </div>
          </div>
        </div>
      </AboutSection>
      <Process t={home.process} theme="light" id="calisma-bicimi" />
    </Layout>
  );
}

export function aboutStaticProps(getContent) {
  const { common, seo } = getContent('about');
  const about = getContent('aboutPage').page;
  const home = getContent('home').page;
  const team = getContent('team').page;
  return {
    props: {
      common,
      seo,
      about,
      home: { about: home.about, process: home.process, team: home.team },
      team: { labels: team.labels, factsTemplate: team.factsTemplate, card: team.card ?? null },
    },
  };
}
