import PracticeDetailView, { practiceDetailPaths, practiceDetailStaticProps } from '../../views/PracticeDetailView';
import { getContent } from '../../content/index.js';

export default function Page(props) {
  return <PracticeDetailView {...props} />;
}

export function getStaticPaths() {
  return practiceDetailPaths('tr');
}

export function getStaticProps({ params }) {
  return practiceDetailStaticProps('tr', params.slug, getContent);
}
