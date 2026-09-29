import LegalView from '../views/LegalView';
import { getContent } from '../content/index.js';

export default function Page(props) {
  return <LegalView {...props} routeKey="cookies" />;
}

export function getStaticProps() {
  const { common, seo } = getContent('cookies');
  const { page: legal } = getContent('legal');
  return { props: { common, seo, legal } };
}
