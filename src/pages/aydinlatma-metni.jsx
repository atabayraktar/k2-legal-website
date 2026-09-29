import LegalView from '../views/LegalView';
import { getContent } from '../content/index.js';

export default function Page(props) {
  return <LegalView {...props} routeKey="privacy" />;
}

export function getStaticProps() {
  const { common, seo } = getContent('privacy');
  const { page: legal } = getContent('legal');
  return { props: { common, seo, legal } };
}
