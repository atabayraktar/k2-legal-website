import TeamView, { teamStaticProps } from '../../views/TeamView';
import { getContent } from '../../content/index.js';

export default function Page(props) {
  return <TeamView {...props} />;
}

export function getStaticProps() {
  return teamStaticProps('en', getContent);
}
