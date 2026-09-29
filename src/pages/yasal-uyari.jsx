import LegalView from '../views/LegalView';
import { getContent } from '../content/index.js';

export default function Page(props) {
  return <LegalView {...props} routeKey="disclaimer" />;
}

export function getStaticProps() {
  const { locale, common, seo } = getContent('tr', 'disclaimer');
  const { page: legal } = getContent('tr', 'legal');
  return { props: { locale, common, seo, legal } };
}
