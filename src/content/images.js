import generated from './images.generated.js';
import auto from './images.auto.js';

// One lookup for all photography. images.generated.js = graded-source images (scripts/build-images.mjs);
// images.auto.js = every "<name>-<w>.webp" in public/images (scripts/wire-images.mjs, run by `npm run images`
// and by prebuild). auto wins on equal names.
export const images = { ...generated, ...auto };

// Named roles -> manifest keys. Swapping a photo = change one string here (or drop new files + run wire-images).
export const ROLE = {
  hero: 'hero-justice', // hero photograph, 1008/1440 wide, 4:5
  practiceHub: 'practice-books', // Faaliyet Alanlari section image
  process: 'process-documents', // Bir dosya nasil yurur image
  principles: 'about-stamp', // Ilkeler desk photograph
  faq: 'faq-typewriter',
};

// Topic-specific full-width banner of a practice-area page (practice-<slug>-800 / -1600).
export const practiceBannerName = (slug) => `practice-${slug}`;

export default images;
