#!/usr/bin/env node
const cloudinary = require('cloudinary').v2;
const path = require('path');

cloudinary.config({
  cloud_name: 'dmkt5zcoz',
  api_key:    '161795369423823',
  api_secret: 'Jg4_ujJkQEksVHaw94kO49l38Lc',
});

const PREFIX = 'scott-yerkey';
const DL     = '/Users/ryanpyles/Downloads';
const PROJ   = `${DL}/ScottYerkeyInterirors/public/images`;

async function upload(source, publicId) {
  try {
    const result = await cloudinary.uploader.upload(source, {
      public_id: publicId, overwrite: true, resource_type: 'image',
    });
    console.log(`✅ ${publicId}`);
    return result;
  } catch (err) {
    console.error(`❌ ${publicId}: ${err.message}`);
    return null;
  }
}

async function main() {
  console.log('\n🚀 Uploading remaining projects...\n');

  // ── Halco Dunes ──────────────────────────────────────────────────────────
  console.log('── Halco Dunes ──');
  // Cover + image 2 from public/images/HalcoDunes (clean copies)
  await upload(`${PROJ}/HalcoDunes/HalcoDunes.jpeg`,  `${PREFIX}/projects/halco-dunes/HalcoDunes`);
  await upload(`${PROJ}/HalcoDunes/HalcoDunes2.jpeg`, `${PREFIX}/projects/halco-dunes/HalcoDunes2`);
  // Images 3–6 from root Downloads (originals without " 2" suffix)
  await upload(`${DL}/HalcoDunes3.jpeg`, `${PREFIX}/projects/halco-dunes/HalcoDunes3`);
  await upload(`${DL}/HalcoDunes4.jpeg`, `${PREFIX}/projects/halco-dunes/HalcoDunes4`);
  await upload(`${DL}/HalcoDunes5.jpeg`, `${PREFIX}/projects/halco-dunes/HalcoDunes5`);
  await upload(`${DL}/HalcoDunes6.jpeg`, `${PREFIX}/projects/halco-dunes/HalcoDunes6`);

  // ── Lakeside gallery (full 31 images from two local sources) ─────────────
  console.log('\n── Lakeside gallery ──');
  // Batch 1: from root Downloads (the ones NOT in public/images/LakeSide)
  const dlLakeside = [
    'LakeSide0472','LakeSide0475','LakeSide0476','LakeSide0477','LakeSide0478',
    'LakeSide0480','LakeSide0481','LakeSide0483','LakeSide0484','LakeSide0486',
    'LakeSide0487','LakeSide0488','LakeSide0490','LakeSide0493','LakeSide0496',
    'LakeSide0498','LakeSide0499','LakeSide0500','LakeSide0501','LakeSide0503',
    'LakesideMI',
  ];
  for (const name of dlLakeside) {
    await upload(`${DL}/${name}.jpg`, `${PREFIX}/projects/lakeside/${name}`);
  }

  // Batch 2: from public/images/LakeSide (these were already in hero/ but also needed here)
  const localLakeside = [
    'LakeSide0474','LakeSide0479','LakeSide0482','LakeSide0485',
    'LakeSide0489','LakeSide0491','LakeSide0492','LakeSide0494',
    'LakeSide0495','LakeSide0497',
  ];
  for (const name of localLakeside) {
    const ext = 'jpg';
    await upload(`${PROJ}/LakeSide/${name}.${ext}`, `${PREFIX}/projects/lakeside/${name}`);
  }

  // ── Lakeside cover (0472 — separate from hero uploads) ───────────────────
  console.log('\n── Lakeside cover ──');
  await upload(`${DL}/LakeSide0472.jpg`, `${PREFIX}/projects/lakeside/cover`);

  // ── Philosophy image (used in Studio section) ─────────────────────────────
  console.log('\n── Philosophy / Studio image ──');
  await upload(`${PROJ}/LakeSide/LakeSide0477.jpg`, `${PREFIX}/philosophy`);

  console.log('\n✨ Done!\n');
}

main().catch(console.error);
