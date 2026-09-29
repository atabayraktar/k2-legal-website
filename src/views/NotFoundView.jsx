import Layout from '../components/Layout';
import Button from '../components/Button';
import TextLink from '../components/TextLink';
import Typed from '../components/Typed';
import { pagePath } from '../lib/routes-util.js';

export default function NotFoundView({ common }) {
  const nf = common.notFound;
  return (
    <Layout routeKey="notFound" common={common} seo={{ title: nf.title, noindex: true }} headerTheme="light">
      <section className="notfound" aria-labelledby="notfound-title">
        <div className="container">
          <h1 id="notfound-title" className="notfound__code">
            <span aria-hidden="true">{nf.code}</span>
            <span className="visually-hidden">
              {nf.code}: {nf.title}
            </span>
          </h1>
          <Typed now className="notfound__line">
            {nf.title}. {nf.text}
          </Typed>
          <div className="notfound__actions">
            <Button variant="primary" href={pagePath('home')}>
              {nf.cta}
            </Button>
            <TextLink href={pagePath('practice')}>{common.cta.allAreas}</TextLink>
          </div>
        </div>
      </section>
    </Layout>
  );
}
