import NotFoundView from '../views/NotFoundView';
import { getContent } from '../content/index.js';

export default function NotFoundPage(props) {
  return <NotFoundView {...props} />;
}

export function getStaticProps() {
  const { locale, common } = getContent('tr', 'notFound');
  return { props: { locale, common } };
}
