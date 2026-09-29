import HomeView, { homeStaticProps } from '../views/HomeView';
import { getContent } from '../content/index.js';

export default function Home(props) {
  return <HomeView {...props} />;
}

export function getStaticProps() {
  return homeStaticProps(getContent);
}
