import PracticeDetailView, { practiceDetailPaths, practiceDetailStaticProps } from '../../../views/PracticeDetailView';
import { getContent } from '../../../content/index.js';

export default function Page(props) {
  return <PracticeDetailView {...props} />;
}

export function getStaticPaths() {
  return practiceDetailPaths('en');
}

export function getStaticProps({ params }) {
  return practiceDetailStaticProps('en', params.slug, getContent);
}
