import LegalView from '../../views/LegalView';
import { getContent } from '../../content/index.js';

export default function Page(props) {
  return <LegalView {...props} routeKey="cookies" />;
}

export function getStaticProps() {
  const { locale, common, seo } = getContent('en', 'cookies');
  const { page: legal } = getContent('en', 'legal');
  return { props: { locale, common, seo, legal } };
}
