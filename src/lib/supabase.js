const SUPABASE_URL = 'https://ttqxhrxrkewmyyiqaafn.supabase.co';
const BUCKET       = 'Projects';
const HERO_BUCKET  = 'Hero';

// Raw URL — used only where the original file is needed (structured data, sitemaps)
export function storageUrl(path) {
  return `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${path}`;
}

// Optimised URL — WebP, resized, compressed via Supabase image transform
function imgUrl(bucket, path, width = 1400, quality = 78) {
  return `${SUPABASE_URL}/storage/v1/render/image/public/${bucket}/${path}?width=${width}&quality=${quality}&format=webp`;
}

// Cover images: full-screen on mobile, half-screen on desktop — 900px is plenty
function coverUrl(path) { return imgUrl(BUCKET, path, 900, 80); }

// Gallery / lightbox images: can fill a large viewport
function galleryUrl(path) { return imgUrl(BUCKET, path, 1400, 78); }

function heroUrl(path) {
  return imgUrl(HERO_BUCKET, path, 1400, 80);
}

// ─── Hero rotating backgrounds ────────────────────────────────────────────────
export const HERO_IMAGES = [
  { src: heroUrl('hero-images/LakeForest.png'),             alt: 'Lake Forest residence' },
  { src: heroUrl('hero-images/LakeForestFoyer.png'),        alt: 'Lake Forest foyer' },
  { src: heroUrl('hero-images/LakeForestMasterBedroom.png'),alt: 'Lake Forest master bedroom' },
  { src: heroUrl('hero-images/LakeSide0474.jpg'),           alt: 'Lakeside estate' },
  { src: heroUrl('hero-images/LakeSide0479.jpg'),           alt: 'Lakeside interior' },
  { src: heroUrl('hero-images/LakeSide0485.jpg'),           alt: 'Lakeside living' },
];

// ─── Residences section — all 8 projects ─────────────────────────────────────
export const PROJECTS = [
  {
    id: '01',
    slug: 'the-four-seasons-residences',
    title: 'The Four Seasons Residences',
    location: 'Chicago, Illinois',
    year: '2024',
    category: 'Luxury High-Rise',
    scope: 'Full-floor residence — complete interior commission',
    description:
      "A full-floor residence within one of Chicago's most celebrated buildings. The interiors negotiate the extraordinary with the intimate — Venetian plaster, aged brass, and stone drawn from a single quarry compose rooms of unhurried authority.",
    cover: coverUrl('the-four-seasons-residences/four-seasons-01.jpg'),
    gallery: [
      galleryUrl('the-four-seasons-residences/four-seasons-02.jpg'),
      galleryUrl('the-four-seasons-residences/four-seasons-03.jpg'),
      galleryUrl('the-four-seasons-residences/four-seasons-04.jpg'),
      galleryUrl('the-four-seasons-residences/four-seasons-05.jpg'),
      galleryUrl('the-four-seasons-residences/four-seasons-06.jpg'),
      galleryUrl('the-four-seasons-residences/four-seasons-07.jpg'),
    ],
  },
  {
    id: '02',
    slug: 'sunset-lane',
    title: 'Sunset Lane',
    location: 'Lake Forest, Illinois',
    year: '2024',
    category: 'Private Residence',
    scope: 'Estate residence — complete interior commission',
    description:
      'A classical North Shore estate of considerable scale, resolved with the kind of discipline that large architecture demands. A sweeping entry rotunda, hand-detailed millwork, and a palette drawn from stone and aged gilt compose rooms of genuine ceremony — each one proportioned to the life lived within it.',
    cover: coverUrl('sunset-lane/sunset-lane-hero.webp'),
    gallery: [
      galleryUrl('sunset-lane/sunset-lane-1.webp'),
      galleryUrl('sunset-lane/sunset-lane-2.webp'),
      galleryUrl('sunset-lane/sunset-lane-3.webp'),
      galleryUrl('sunset-lane/sunset-lane-4.webp'),
      galleryUrl('sunset-lane/sunset-lane-5.webp'),
      galleryUrl('sunset-lane/sunset-lane-6.webp'),
      galleryUrl('sunset-lane/sunset-lane-7.webp'),
      galleryUrl('sunset-lane/sunset-lane-8.webp'),
      galleryUrl('sunset-lane/sunset-lane-9.webp'),
      galleryUrl('sunset-lane/sunset-lane-10.webp'),
      galleryUrl('sunset-lane/sunset-lane-11.webp'),
      galleryUrl('sunset-lane/sunset-lane-12.webp'),
      galleryUrl('sunset-lane/sunset-lane-13.webp'),
    ],
  },
  {
    id: '03',
    slug: 'lakeside',
    title: 'Lakeside',
    location: 'Lake Michigan, Michigan',
    year: '2023',
    category: 'Lakeside Estate',
    scope: 'Lakeside residence — complete interior commission',
    description:
      'A summer residence on the eastern shore of Lake Michigan, designed to dissolve the boundary between interior and landscape. Bleached oak, raw concrete, and palette borrowed entirely from dune grass, water, and sky.',
    cover: coverUrl('lakeside/LakeSide0472.jpg'),
    gallery: [
      galleryUrl('lakeside/LakeSide0474.jpg'),
      galleryUrl('lakeside/LakeSide0475.jpg'),
      galleryUrl('lakeside/LakeSide0476.jpg'),
      galleryUrl('lakeside/LakeSide0477.jpg'),
      galleryUrl('lakeside/LakeSide0478.jpg'),
      galleryUrl('lakeside/LakeSide0479.jpg'),
      galleryUrl('lakeside/LakeSide0480.jpg'),
      galleryUrl('lakeside/LakeSide0481.jpg'),
      galleryUrl('lakeside/LakeSide0482.jpg'),
      galleryUrl('lakeside/LakeSide0483.jpg'),
      galleryUrl('lakeside/LakeSide0484.jpg'),
      galleryUrl('lakeside/LakeSide0485.jpg'),
      galleryUrl('lakeside/LakeSide0486.jpg'),
      galleryUrl('lakeside/LakeSide0487.jpg'),
      galleryUrl('lakeside/LakeSide0488.jpg'),
      galleryUrl('lakeside/LakeSide0489.jpg'),
      galleryUrl('lakeside/LakeSide0490.jpg'),
      galleryUrl('lakeside/LakeSide0491.jpg'),
      galleryUrl('lakeside/LakeSide0492.jpg'),
      galleryUrl('lakeside/LakeSide0493.jpg'),
      galleryUrl('lakeside/LakeSide0494.jpg'),
      galleryUrl('lakeside/LakeSide0495.jpg'),
      galleryUrl('lakeside/LakeSide0496.jpg'),
      galleryUrl('lakeside/LakeSide0497.jpg'),
      galleryUrl('lakeside/LakeSide0498.jpg'),
      galleryUrl('lakeside/LakeSide0499.jpg'),
      galleryUrl('lakeside/LakeSide0500.jpg'),
      galleryUrl('lakeside/LakeSide0501.jpg'),
      galleryUrl('lakeside/LakeSide0503.jpg'),
      galleryUrl('lakeside/LakesideMI.jpg'),
    ],
  },
  {
    id: '04',
    slug: 'highland-park',
    title: 'Highland Park',
    location: 'Highland Park, Illinois',
    year: '2023',
    category: 'Suburban Residence',
    scope: 'Historic district residence — complete interior commission',
    description:
      "A complete interior commission in Highland Park's historic district. Every room considered as part of a coherent whole — proportions studied, materials selected for their relationship to light, and each detail resolved against the architecture.",
    cover: coverUrl('highland-park/HighlandPark2.jpg'),
    gallery: [
      galleryUrl('highland-park/HighlandPark1.png'),
      galleryUrl('highland-park/HighlandPark2.jpg'),
      galleryUrl('highland-park/HighlandPark3.jpg'),
      galleryUrl('highland-park/HighlandPark4.jpg'),
      galleryUrl('highland-park/HighlandPark6.jpg'),
      galleryUrl('highland-park/HighlandPark12.jpg'),
      galleryUrl('highland-park/HighlandPark13.jpg'),
      galleryUrl('highland-park/HighlandPark14.jpg'),
      galleryUrl('highland-park/HighlandPark15.jpg'),
      galleryUrl('highland-park/HighlandPark18.jpg'),
      galleryUrl('highland-park/HighlandPark19.jpg'),
      galleryUrl('highland-park/HighlandPark20.jpg'),
      galleryUrl('highland-park/HighlandPark21.jpg'),
    ],
  },
  {
    id: '05',
    slug: 'rancho-mirage',
    title: 'Rancho Mirage',
    location: 'Rancho Mirage, California',
    year: '2022',
    category: 'Desert Estate',
    scope: 'Desert estate — complete interior commission',
    description:
      'A Californian desert estate at the Villaggio Place development. The palette is drawn from the Sonoran landscape — terracotta, sage, and raw steel — while the scale remains quietly domestic, resisting the temptation of spectacle.',
    cover: coverUrl('rancho-mirage/RanchoMirage-Hero.png'),
    gallery: [
      galleryUrl('rancho-mirage/RanchoMirage-02.png'),
      galleryUrl('rancho-mirage/RanchoMirage-03.png'),
      galleryUrl('rancho-mirage/RanchoMirage-04.png'),
      galleryUrl('rancho-mirage/RanchoMirage-05.png'),
      galleryUrl('rancho-mirage/RanchoMirage-06.png'),
      galleryUrl('rancho-mirage/RanchoMirage-07.png'),
      galleryUrl('rancho-mirage/RanchoMirage-08.png'),
      galleryUrl('rancho-mirage/RanchoMirage-09.png'),
    ],
  },
  {
    id: '06',
    slug: 'halco-dunes',
    title: 'Halco Dunes',
    location: 'Michigan City, Indiana',
    year: '2022',
    category: 'Dunes Residence',
    scope: 'Dunes retreat — complete interior commission',
    description:
      'A dunes retreat on the southern shore of Lake Michigan. Sand, cedar, and weathered steel form a home that reads as inevitable against its landscape — as though it arrived not by design but by geological time.',
    cover: coverUrl('halco-dunes/HalcoDunes.jpeg'),
    gallery: [
      galleryUrl('halco-dunes/HalcoDunes2.jpeg'),
      galleryUrl('halco-dunes/HalcoDunes3.jpeg'),
      galleryUrl('halco-dunes/HalcoDunes4.jpeg'),
      galleryUrl('halco-dunes/HalcoDunes5.jpeg'),
      galleryUrl('halco-dunes/HalcoDunes6.jpeg'),
    ],
  },
  {
    id: '07',
    slug: 'browning-court',
    title: 'Browning Court',
    location: 'Highland Park, Illinois',
    year: '2023',
    category: 'Private Residence',
    scope: 'Private residence — complete interior commission',
    description:
      'A private residence on Browning Court composed from the architecture inward. Each room resolved as part of a continuous whole — materials, light, and proportion held in deliberate balance throughout.',
    cover: coverUrl('browningcourt-highlandpark/browningcourt-highlandpark02.jpg'),
    gallery: [
      galleryUrl('browningcourt-highlandpark/browningcourt-highlandpark02.jpg'),
      galleryUrl('browningcourt-highlandpark/browningcourt-highlandpark03.jpg'),
      galleryUrl('browningcourt-highlandpark/browningcourt-highlandpark04.jpg'),
      galleryUrl('browningcourt-highlandpark/browningcourt-highlandpark05.jpg'),
      galleryUrl('browningcourt-highlandpark/browningcourt-highlandpark06.jpg'),
      galleryUrl('browningcourt-highlandpark/browningcourt-highlandpark07.jpg'),
      galleryUrl('browningcourt-highlandpark/browningcourt-highlandpark08.jpg'),
      galleryUrl('browningcourt-highlandpark/browningcourt-highlandpark09.jpg'),
      galleryUrl('browningcourt-highlandpark/browningcourt-highlandpark10.jpg'),
    ],
  },
  {
    id: '08',
    slug: 'w-winona',
    title: 'W. Winona',
    location: 'Chicago, Illinois',
    year: '2022',
    category: 'Urban Residence',
    scope: 'Chicago greystone — complete interior commission',
    description:
      'A Chicago greystone reimagined from structure outward. The original architecture demanded restraint — no element added that the building did not already suggest. The result is a city home of genuine character and uncommon quiet.',
    cover: coverUrl('w-winona/Winona.png'),
    gallery: [
      galleryUrl('w-winona/Winona1.png'),
      galleryUrl('w-winona/Winona2.png'),
      galleryUrl('w-winona/Winona3.png'),
      galleryUrl('w-winona/Winona4.png'),
      galleryUrl('w-winona/Winona5.png'),
      galleryUrl('w-winona/Winona6.png'),
      galleryUrl('w-winona/Winona7.png'),
      galleryUrl('w-winona/Winona8.png'),
      galleryUrl('w-winona/Winona9.png'),
      galleryUrl('w-winona/Winona10.png'),
      galleryUrl('w-winona/Winona11.png'),
      galleryUrl('w-winona/Winona12.png'),
    ],
  },
];

// ─── Philosophy section image ─────────────────────────────────────────────────
export const PHILOSOPHY_IMAGE = imgUrl(BUCKET, 'lakeside/LakeSide0477.jpg', 1200, 80);
