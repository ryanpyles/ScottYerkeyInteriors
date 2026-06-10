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
    description:
      'A gracious North Shore estate conceived as a study in natural materials and composed restraint. Linen, limestone, and hand-hewn oak respond to the quality of Midwestern light — warm in winter, abundant in summer.',
    cover: coverUrl('sunset-lane/sunsetlane01.jpg'),
    gallery: [
      galleryUrl('sunset-lane/SunsetLane-02.jpg'),
      galleryUrl('sunset-lane/SunsetLane-03.jpg'),
      galleryUrl('sunset-lane/SunsetLane-04.jpg'),
      galleryUrl('sunset-lane/SunsetLane-06.jpg'),
      galleryUrl('sunset-lane/SunsetLane-08.jpg'),
      galleryUrl('sunset-lane/SunsetLane-09.jpg'),
      galleryUrl('sunset-lane/SunsetLane-10.jpg'),
      galleryUrl('sunset-lane/SunsetLane-11.jpg'),
      galleryUrl('sunset-lane/SunsetLane-12.jpg'),
      galleryUrl('sunset-lane/SunsetLane-13.jpg'),
      galleryUrl('sunset-lane/SunsetLane-14.jpg'),
      galleryUrl('sunset-lane/SunsetLane-16.jpg'),
      galleryUrl('sunset-lane/SunsetLane-18.jpg'),
      galleryUrl('sunset-lane/SunsetLane-19.jpg'),
      galleryUrl('sunset-lane/SunsetLane-20.jpg'),
      galleryUrl('sunset-lane/SunsetLane-21.jpg'),
      galleryUrl('sunset-lane/SunsetLane-22.jpg'),
      galleryUrl('sunset-lane/SunsetLane-23.jpg'),
      galleryUrl('sunset-lane/sunsetlane05.jpg'),
      galleryUrl('sunset-lane/sunsetlane07.jpg'),
    ],
  },
  {
    id: '03',
    slug: 'lakeside',
    title: 'Lakeside',
    location: 'Lake Michigan, Michigan',
    year: '2023',
    category: 'Lakeside Estate',
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
    description:
      "A complete interior commission in Highland Park's historic district. Every room considered as part of a coherent whole — proportions studied, materials selected for their relationship to light, and each detail resolved against the architecture.",
    cover: coverUrl('highland-park/HighlandPark7.jpg'),
    gallery: [
      // HighlandPark4 removed — exact duplicate of HighlandPark2 (same bytes)
      // HighlandPark9–20 removed — thumbnail quality (21–56 KB vs 130–411 KB)
      galleryUrl('highland-park/HighlandPark1.jpg'),
      galleryUrl('highland-park/HighlandPark2.jpg'),
      galleryUrl('highland-park/HighlandPark3.jpg'),
      galleryUrl('highland-park/HighlandPark5.jpg'),
      galleryUrl('highland-park/HighlandPark6.jpg'),
      galleryUrl('highland-park/HighlandPark8.jpg'),
    ],
  },
  {
    id: '05',
    slug: 'rancho-mirage',
    title: 'Rancho Mirage',
    location: 'Rancho Mirage, California',
    year: '2022',
    category: 'Desert Estate',
    description:
      'A Californian desert estate at the Villaggio Place development. The palette is drawn from the Sonoran landscape — terracotta, sage, and raw steel — while the scale remains quietly domestic, resisting the temptation of spectacle.',
    cover: coverUrl('rancho-mirage/RanchoMirage-VillagioPlace-32.png'),
    gallery: [
      galleryUrl('rancho-mirage/RanchoMirage-VillagioPlace-33.png'),
      galleryUrl('rancho-mirage/RanchoMirage-VillagioPlace-34.png'),
      galleryUrl('rancho-mirage/RanchoMirage-VillagioPlace-35.png'),
      galleryUrl('rancho-mirage/RanchoMirage-VillagioPlace-36.png'),
      galleryUrl('rancho-mirage/RanchoMirage-VillagioPlace-37.png'),
      galleryUrl('rancho-mirage/RanchoMirage-VillagioPlace-38.png'),
      galleryUrl('rancho-mirage/RanchoMirage-VillagioPlace-39.png'),
      galleryUrl('rancho-mirage/RanchoMirage-VillagioPlace-40.png'),
      galleryUrl('rancho-mirage/RanchoMirage-VillagioPlace-41.png'),
      galleryUrl('rancho-mirage/RanchoMirage-VillagioPlace-42.png'),
      galleryUrl('rancho-mirage/RanchoMirage-VillagioPlace-43.png'),
      galleryUrl('rancho-mirage/RanchoMirage-VillagioPlace-44.png'),
      galleryUrl('rancho-mirage/RanchoMirage-VillagioPlace-45.png'),
      galleryUrl('rancho-mirage/RanchoMirage-VillagioPlace-46.png'),
      galleryUrl('rancho-mirage/RanchoMirage-VillagioPlace-49.png'),
      galleryUrl('rancho-mirage/RanchoMirage-VillagioPlace-50.png'),
      galleryUrl('rancho-mirage/RanchoMirage-VillagioPlace-51.png'),
      galleryUrl('rancho-mirage/RanchoMirage-VillagioPlace-52.png'),
      galleryUrl('rancho-mirage/RanchoMirage-VillagioPlace-53.png'),
      galleryUrl('rancho-mirage/RanchoMirage-VillagioPlace-55.png'),
      galleryUrl('rancho-mirage/RanchoMirage-VillagioPlace-56.png'),
      galleryUrl('rancho-mirage/RanchoMirage-VillagioPlace-57.png'),
      galleryUrl('rancho-mirage/RanchoMirage-VillagioPlace-58.png'),
      galleryUrl('rancho-mirage/RanchoMirage-VillagioPlace-59.png'),
      galleryUrl('rancho-mirage/RanchoMirage-VillagioPlace-60.png'),
      galleryUrl('rancho-mirage/RanchoMirage-VillagioPlace-61.png'),
      galleryUrl('rancho-mirage/RanchoMirage-VillagioPlace-63.png'),
      galleryUrl('rancho-mirage/RanchoMirage-VillagioPlace-66.png'),
      galleryUrl('rancho-mirage/RanchoMirage-VillagioPlace-67.png'),
      galleryUrl('rancho-mirage/RanchoMirage-VillagioPlace-68.png'),
      galleryUrl('rancho-mirage/RanchoMirage-VillagioPlace-69.png'),
      galleryUrl('rancho-mirage/ranchomirage.png'),
      galleryUrl('rancho-mirage/ranchomirage2.png'),
      galleryUrl('rancho-mirage/ranchomirage3.png'),
    ],
  },
  {
    id: '06',
    slug: 'halco-dunes',
    title: 'Halco Dunes',
    location: 'Michigan City, Indiana',
    year: '2022',
    category: 'Dunes Residence',
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
    slug: 'w-winona',
    title: 'W. Winona',
    location: 'Chicago, Illinois',
    year: '2022',
    category: 'Urban Residence',
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
