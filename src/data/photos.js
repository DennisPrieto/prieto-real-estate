// Licensed photography. Unsplash images are free for commercial use under the
// Unsplash License (attribution appreciated, not required) and are served from
// Unsplash's CDN as Unsplash asks. Wikimedia Commons images carry their own
// license and REQUIRE the credit line shown with them. Every photo shows a
// public place, not a listing; none is presented as a property we represent.

const unsplash = (base, id, by) => ({
  kind: 'unsplash',
  src: (w, h) => `https://images.unsplash.com/${base}?auto=format&fit=crop&w=${w}${h ? `&h=${h}` : ''}&q=72`,
  credit: `Photo: ${by} / Unsplash`,
  creditUrl: `https://unsplash.com/photos/${id}`,
});

const commons = (file, by, license, licenseUrl) => ({
  kind: 'commons',
  src: (w) => `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=${w}`,
  credit: `Photo: ${by}, ${license}, via Wikimedia Commons`,
  creditUrl: `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(file)}`,
  licenseUrl,
});

// Dennis Prieto's own photographs (retouched), used with his permission.
const own = (slug, max) => {
  const widths = [640, 960, 1280, max];
  return {
    kind: 'own',
    widths,
    src: (w) => `/img/own/${slug}-${widths.find((x) => x >= w) || max}.webp`,
    credit: 'Photo: Dennis Prieto',
  };
};

export const PHOTOS = {
  hero: { ...unsplash('photo-1695776333029-d47e3f0f4e63', '5lTaDDeG9WU', 'Valeriia Neganova'), alt: 'Aerial view over Brickell Key and the Brickell skyline on Biscayne Bay, Miami', caption: 'Brickell Key and Brickell from above Biscayne Bay' },
  'coral-gables': { ...unsplash('photo-1704236600122-56a1401023d3', '2_zGhTtzQII', 'Alexander Wark Feeney'), alt: 'Aerial view of Coral Gables looking toward the Biltmore Hotel tower', caption: 'Coral Gables, looking toward the Biltmore' },
  'coral-gables-2': { ...unsplash('photo-1560453206-259f358d64b6', '7neck4QUlT4', 'Armando Ching San'), alt: 'Coral rock entrance arch in Coral Gables', caption: 'A coral-rock entrance, Coral Gables' },
  biltmore: { ...unsplash('photo-1779650829639-f6a34d2d34a6', 'BVT-ZnecBNk', 'Hector Falcon'), alt: 'The Biltmore Hotel in Coral Gables, its tower and arches among tropical landscaping', caption: 'The Biltmore, Coral Gables' },
  'coconut-grove': { ...unsplash('photo-1719294606218-152c3760d23f', 'Ze1TthBGSPk', 'Zoshua Colah'), alt: 'Vizcaya Museum and Gardens in Coconut Grove, seen across its formal garden', caption: 'Vizcaya Museum and Gardens, Coconut Grove' },
  brickell: { ...unsplash('photo-1535498730771-e735b998cd64', 'KTdzeb28jyo', 'Muzammil Soorma'), alt: 'The Brickell skyline across Biscayne Bay at sunset', caption: 'The Brickell skyline at sunset' },
  'brickell-day': { ...unsplash('photo-1670861643063-0892c6fab1ce', '1T4xUbhjmmk', 'Rolando Yera'), alt: 'Brickell towers seen across the water in daylight', caption: 'Brickell from the water' },
  edgewater: { ...commons('Edgewater Miami Florida southern.jpg', 'Averette', 'CC BY 3.0', 'https://creativecommons.org/licenses/by/3.0/'), alt: 'Edgewater condominium towers rising behind palms against a blue sky', caption: 'The Edgewater towers along Biscayne Boulevard' },
  pinecrest: { ...commons('Pinecrest Gardens FL park entr04.jpg', 'Ebyabe', 'CC BY-SA 3.0', 'https://creativecommons.org/licenses/by-sa/3.0/'), alt: 'Coral-rock archway at the entrance to Pinecrest Gardens', caption: 'Pinecrest Gardens, Village of Pinecrest' },
  'sunny-isles': { ...unsplash('photo-1630612905242-8f1e6933cf3b', 'l1cORHsLqZ0', 'Avi Werde'), alt: 'Aerial view of Sunny Isles Beach towers along the shoreline', caption: 'Sunny Isles Beach from above' },
  'bal-harbour': { ...own('bal-harbour', 1536), alt: 'A glass oceanfront condominium tower above the beach', caption: 'Oceanfront living, Bal Harbour' },
  surfside: { ...unsplash('photo-1748457440298-24f291aa9e24', 'RBQlvEWtQ7w', 'Austin Hervias'), alt: 'A dune path leading to the beach in Surfside', caption: 'A beach path in Surfside' },
  'key-biscayne': { ...unsplash('photo-1578318099733-19b4c9f575ca', 'AyupIb9O3Nc', 'Quick PS'), alt: 'The Cape Florida Lighthouse on Key Biscayne among palms', caption: 'Cape Florida Lighthouse, Key Biscayne' },
  'miami-beach': { ...unsplash('photo-1692403435670-c1894e770ecd', 'mw-n_aUlDtw', 'Nils Huenerfuerst'), alt: 'Art Deco buildings and palms on Ocean Drive, Miami Beach', caption: 'Ocean Drive, Miami Beach' },
  aventura: { ...commons('Aventura Florida along 183rd Street.jpg', 'Fredlyfish4', 'CC BY 4.0', 'https://creativecommons.org/licenses/by/4.0/'), alt: 'Aventura condominium towers across the water at dusk', caption: 'Aventura from the water' },
  'golden-beach': { ...own('golden-beach', 1536), alt: 'A Mediterranean-style beachfront estate on a wide beach, towers in the distance', caption: 'Beachfront estates, Golden Beach' },
  'bay-harbor': { ...own('bay-harbor', 1535), alt: 'Modern waterfront homes with docks and pools along a bay, towers beyond', caption: 'Waterfront living, Bay Harbor Islands' },
  'gables-by-the-sea': { ...own('gables-by-the-sea', 1449), alt: 'Waterfront homes along canals ending at a point on the bay', caption: 'Canal-front living, Gables by the Sea' },
  'indian-creek': { ...own('indian-creek', 1457), alt: 'A palm-lined reflecting pool leading to the entrance of a classical estate', caption: 'An Indian Creek estate (not a listing)' },
  'fisher-island': { ...commons('Fisher Island - panoramio (1).jpg', 'qwesy qwesy', 'CC BY 3.0', 'https://creativecommons.org/licenses/by/3.0/'), alt: 'Fisher Island seen across the water from Government Cut', caption: 'Fisher Island from Government Cut' },
  'miami-shores': { ...own('miami-shores', 1535), alt: 'A modern white house with a pool and lawn', caption: 'Modern living, Miami Shores' },
  estate: { ...unsplash('photo-1779903726785-7cf25bed78f7', 'W3MckxPY6Mo', 'Caroline Badran'), alt: 'A glass-walled living and dining room opening onto the beach and ocean', caption: 'Floor-to-ceiling glass on the water (not a listing)' },
  downtown: { ...unsplash('photo-1586474714711-59ad5a5798bb', 'TxME_LN0o0c', 'Brian Lundquist'), alt: 'Aerial view of downtown Miami along Biscayne Boulevard and the bay', caption: 'Downtown Miami along the bay' },
};

export const ALL_PHOTOS = Object.entries(PHOTOS).map(([key, p]) => ({ key, ...p }));
