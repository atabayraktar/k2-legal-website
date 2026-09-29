import AboutView, { aboutStaticProps } from '../views/AboutView';
import { getContent } from '../content/index.js';

export default function Page(props) {
  return <AboutView {...props} />;
}

export function getStaticProps() {
  return aboutStaticProps('tr', getContent);
}
