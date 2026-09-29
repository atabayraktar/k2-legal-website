import Layout from '../components/Layout';
import Button from '../components/Button';
import TextLink from '../components/TextLink';
import Monogram from '../components/Monogram';
import { pagePath } from '../lib/routes-util.js';

export default function NotFoundView({ locale, common }) {
  const nf = common.notFound;
  return (
    <Layout locale={locale} routeKey="notFound" common={common} seo={{ title: nf.title, noindex: true }} headerTheme="light">
      <section className="notfound" data-theme="light" aria-labelledby="notfound-title">
        <Monogram className="notfound__mark" />
        <div className="container notfound__inner">
          <p className="eyebrow">404</p>
          <h1 id="notfound-title" className="notfound__title">
            {nf.title}
          </h1>
          <p className="notfound__text">{nf.text}</p>
          <div className="notfound__actions">
            <Button variant="primary" href={pagePath('home', locale)}>
              {nf.cta}
            </Button>
            <TextLink href={pagePath('practice', locale)}>{common.cta.practice}</TextLink>
          </div>
        </div>
      </section>
    </Layout>
  );
}
