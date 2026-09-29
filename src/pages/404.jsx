import NotFoundView from '../views/NotFoundView';
import { getContent } from '../content/index.js';

export default function NotFoundPage(props) {
  return <NotFoundView {...props} />;
}

export function getStaticProps() {
  const { common } = getContent('notFound');
  return { props: { common } };
}
