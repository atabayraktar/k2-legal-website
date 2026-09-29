import PracticeIndexView, { practiceIndexStaticProps } from '../../../views/PracticeIndexView';
import { getContent } from '../../../content/index.js';

export default function Page(props) {
  return <PracticeIndexView {...props} />;
}

export function getStaticProps() {
  return practiceIndexStaticProps('en', getContent);
}
