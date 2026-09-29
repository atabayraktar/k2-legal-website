import ContactView, { contactStaticProps } from '../../views/ContactView';
import { getContent } from '../../content/index.js';

export default function Page(props) {
  return <ContactView {...props} />;
}

export function getStaticProps() {
  return contactStaticProps('en', getContent);
}
