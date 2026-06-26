const CLOUD  = 'dmkt5zcoz';
const PREFIX = 'scott-yerkey';
const BASE   = `https://res.cloudinary.com/${CLOUD}/image/upload`;

// Raw URL for structured data / sitemap (no transforms)
export function storageUrl(publicId) {
  return `${BASE}/${PREFIX}/${publicId}`;
}

// Optimised URL — WebP, resized, compressed via Cloudinary transforms
function imgUrl(publicId, width = 1400, quality = 78) {
  return `${BASE}/w_${width},q_${quality},f_webp/${PREFIX}/${publicId}`;
}

function coverUrl(id)   { return imgUrl(id, 900, 80); }
function galleryUrl(id) { return imgUrl(id, 1400, 78); }
function heroUrl(id)    { return imgUrl(`hero/${id}`, 1400, 80); }

// ─── Hero rotating backgrounds ────────────────────────────────────────────────
export const HERO_IMAGES = [
  { src: heroUrl('LakeForest'),             alt: 'Lake Forest residence' },
  { src: heroUrl('LakeForestFoyer'),        alt: 'Lake Forest foyer' },
  { src: heroUrl('LakeForestMasterBedroom'),alt: 'Lake Forest master bedroom' },
  { src: heroUrl('LakeSide0474'),           alt: 'Lakeside estate' },
  { src: heroUrl('LakeSide0479'),           alt: 'Lakeside interior' },
  { src: heroUrl('LakeSide0485'),           alt: 'Lakeside living' },
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
    cover: coverUrl('projects/four-seasons/four-seasons-01'),
    gallery: [
      galleryUrl('projects/four-seasons/four-seasons-02'),
      galleryUrl('projects/four-seasons/four-seasons-03'),
      galleryUrl('projects/four-seasons/four-seasons-04'),
      galleryUrl('projects/four-seasons/four-seasons-05'),
      galleryUrl('projects/four-seasons/four-seasons-06'),
      galleryUrl('projects/four-seasons/four-seasons-07'),
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
    cover: coverUrl('projects/sunset-lane/sunset-lane-hero'),
    gallery: [
      galleryUrl('projects/sunset-lane/sunset-lane-1'),
      galleryUrl('projects/sunset-lane/sunset-lane-2'),
      galleryUrl('projects/sunset-lane/sunset-lane-3'),
      galleryUrl('projects/sunset-lane/sunset-lane-4'),
      galleryUrl('projects/sunset-lane/sunset-lane-5'),
      galleryUrl('projects/sunset-lane/sunset-lane-6'),
      galleryUrl('projects/sunset-lane/sunset-lane-7'),
      galleryUrl('projects/sunset-lane/sunset-lane-8'),
      galleryUrl('projects/sunset-lane/sunset-lane-9'),
      galleryUrl('projects/sunset-lane/sunset-lane-10'),
      galleryUrl('projects/sunset-lane/sunset-lane-11'),
      galleryUrl('projects/sunset-lane/sunset-lane-12'),
      galleryUrl('projects/sunset-lane/sunset-lane-13'),
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
    cover: coverUrl('projects/lakeside/cover'),
    gallery: [
      galleryUrl('projects/lakeside/LakeSide0474'),
      galleryUrl('projects/lakeside/LakeSide0475'),
      galleryUrl('projects/lakeside/LakeSide0476'),
      galleryUrl('projects/lakeside/LakeSide0477'),
      galleryUrl('projects/lakeside/LakeSide0478'),
      galleryUrl('projects/lakeside/LakeSide0479'),
      galleryUrl('projects/lakeside/LakeSide0480'),
      galleryUrl('projects/lakeside/LakeSide0481'),
      galleryUrl('projects/lakeside/LakeSide0482'),
      galleryUrl('projects/lakeside/LakeSide0483'),
      galleryUrl('projects/lakeside/LakeSide0484'),
      galleryUrl('projects/lakeside/LakeSide0485'),
      galleryUrl('projects/lakeside/LakeSide0486'),
      galleryUrl('projects/lakeside/LakeSide0487'),
      galleryUrl('projects/lakeside/LakeSide0488'),
      galleryUrl('projects/lakeside/LakeSide0489'),
      galleryUrl('projects/lakeside/LakeSide0490'),
      galleryUrl('projects/lakeside/LakeSide0491'),
      galleryUrl('projects/lakeside/LakeSide0492'),
      galleryUrl('projects/lakeside/LakeSide0493'),
      galleryUrl('projects/lakeside/LakeSide0494'),
      galleryUrl('projects/lakeside/LakeSide0495'),
      galleryUrl('projects/lakeside/LakeSide0496'),
      galleryUrl('projects/lakeside/LakeSide0497'),
      galleryUrl('projects/lakeside/LakeSide0498'),
      galleryUrl('projects/lakeside/LakeSide0499'),
      galleryUrl('projects/lakeside/LakeSide0500'),
      galleryUrl('projects/lakeside/LakeSide0501'),
      galleryUrl('projects/lakeside/LakeSide0503'),
      galleryUrl('projects/lakeside/LakesideMI'),
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
    cover: coverUrl('projects/highland-park/HighlandPark2'),
    gallery: [
      galleryUrl('projects/highland-park/HighlandPark1'),
      galleryUrl('projects/highland-park/HighlandPark2'),
      galleryUrl('projects/highland-park/HighlandPark3'),
      galleryUrl('projects/highland-park/HighlandPark4'),
      galleryUrl('projects/highland-park/HighlandPark6'),
      galleryUrl('projects/highland-park/HighlandPark12'),
      galleryUrl('projects/highland-park/HighlandPark13'),
      galleryUrl('projects/highland-park/HighlandPark14'),
      galleryUrl('projects/highland-park/HighlandPark15'),
      galleryUrl('projects/highland-park/HighlandPark18'),
      galleryUrl('projects/highland-park/HighlandPark19'),
      galleryUrl('projects/highland-park/HighlandPark20'),
      galleryUrl('projects/highland-park/HighlandPark21'),
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
    cover: coverUrl('projects/rancho-mirage/RanchoMirage-Hero'),
    gallery: [
      galleryUrl('projects/rancho-mirage/RanchoMirage-02'),
      galleryUrl('projects/rancho-mirage/RanchoMirage-03'),
      galleryUrl('projects/rancho-mirage/RanchoMirage-04'),
      galleryUrl('projects/rancho-mirage/RanchoMirage-05'),
      galleryUrl('projects/rancho-mirage/RanchoMirage-06'),
      galleryUrl('projects/rancho-mirage/RanchoMirage-07'),
      galleryUrl('projects/rancho-mirage/RanchoMirage-08'),
      galleryUrl('projects/rancho-mirage/RanchoMirage-09'),
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
    cover: coverUrl('projects/halco-dunes/HalcoDunes'),
    gallery: [
      galleryUrl('projects/halco-dunes/HalcoDunes2'),
      galleryUrl('projects/halco-dunes/HalcoDunes3'),
      galleryUrl('projects/halco-dunes/HalcoDunes4'),
      galleryUrl('projects/halco-dunes/HalcoDunes5'),
      galleryUrl('projects/halco-dunes/HalcoDunes6'),
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
    cover: coverUrl('projects/browning-court/browningcourt-highlandpark02'),
    gallery: [
      galleryUrl('projects/browning-court/browningcourt-highlandpark02'),
      galleryUrl('projects/browning-court/browningcourt-highlandpark03'),
      galleryUrl('projects/browning-court/browningcourt-highlandpark04'),
      galleryUrl('projects/browning-court/browningcourt-highlandpark05'),
      galleryUrl('projects/browning-court/browningcourt-highlandpark06'),
      galleryUrl('projects/browning-court/browningcourt-highlandpark07'),
      galleryUrl('projects/browning-court/browningcourt-highlandpark08'),
      galleryUrl('projects/browning-court/browningcourt-highlandpark09'),
      galleryUrl('projects/browning-court/browningcourt-highlandpark10'),
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
    cover: coverUrl('projects/w-winona/01_939WWinonaSt_2006_HiRes'),
    gallery: [
      galleryUrl('projects/w-winona/01_939WWinonaSt_2006_HiRes'),
      galleryUrl('projects/w-winona/02_939WWinonaSt_2008_HiRes'),
      galleryUrl('projects/w-winona/03_939WWinonaSt_2010_HiRes'),
      galleryUrl('projects/w-winona/04_939WWinonaSt_2012_HiRes'),
      galleryUrl('projects/w-winona/06_939WWinonaSt_2015_HiRes'),
      galleryUrl('projects/w-winona/07_939WWinonaSt_2018_HiRes'),
      galleryUrl('projects/w-winona/08_939WWinonaSt_2020_HiRes'),
      galleryUrl('projects/w-winona/10_939WWinonaSt_2022_HiRes'),
      galleryUrl('projects/w-winona/12_939WWinonaSt_2025_HiRes'),
      galleryUrl('projects/w-winona/13_939WWinonaSt_2029_HiRes'),
      galleryUrl('projects/w-winona/14_939WWinonaSt_2031_HiRes'),
      galleryUrl('projects/w-winona/15_939WWinonaSt_2033_HiRes'),
      galleryUrl('projects/w-winona/16_939WWinonaSt_2034_HiRes'),
      galleryUrl('projects/w-winona/17_939WWinonaSt_2037_HiRes'),
    ],
  },
];

// ─── Studio section image ─────────────────────────────────────────────────────
export const PHILOSOPHY_IMAGE = imgUrl('philosophy', 1200, 80);
