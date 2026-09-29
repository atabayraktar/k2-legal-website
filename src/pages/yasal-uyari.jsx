import LegalView from '../views/LegalView';
import { getContent } from '../content/index.js';

export default function Page(props) {
  return <LegalView {...props} routeKey="disclaimer" />;
}

export function getStaticProps() {
  const { common, seo } = getContent('disclaimer');
  const { page: legal } = getContent('legal');
  return { props: { common, seo, legal } };
}
