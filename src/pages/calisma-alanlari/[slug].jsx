import PracticeView, { practiceDetailPaths, practiceStaticProps } from '../../views/PracticeView';
import { getContent } from '../../content/index.js';

export default function Page(props) {
  return <PracticeView {...props} />;
}

// Flagship areas only (page: true); a static export cannot serve any other slug.
export function getStaticPaths() {
  return practiceDetailPaths();
}

export function getStaticProps({ params }) {
  return practiceStaticProps(params.slug, getContent);
}
