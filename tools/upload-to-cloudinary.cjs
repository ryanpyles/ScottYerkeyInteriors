#!/usr/bin/env node
/**
 * Bulk upload all Scott Arthur Yerkey images to Cloudinary.
 * Sources: local public/images/ + Supabase public URLs for missing projects.
 * Run from project root: node tools/upload-to-cloudinary.js
 */

const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

cloudinary.config({
  cloud_name: 'dmkt5zcoz',
  api_key:    '161795369423823',
  api_secret: 'Jg4_ujJkQEksVHaw94kO49l38Lc',
});

const SUPABASE = 'https://ttqxhrxrkewmyyiqaafn.supabase.co/storage/v1/object/public';
const PREFIX   = 'scott-yerkey';

// Strip file extension for Cloudinary public_id
function noExt(file) {
  return file.replace(/\.[^.]+$/, '');
}

// Upload a single file (local path or remote URL) with a given public_id
async function upload(source, publicId) {
  try {
    const result = await cloudinary.uploader.upload(source, {
      public_id:    publicId,
      overwrite:    true,
      resource_type: 'image',
      folder:       '',   // folder embedded in public_id
    });
    console.log(`✅ ${publicId}`);
    return result;
  } catch (err) {
    console.error(`❌ ${publicId}: ${err.message}`);
    return null;
  }
}

// Upload all files in a local directory
async function uploadDir(localDir, cloudFolder) {
  const abs = path.resolve(localDir);
  if (!fs.existsSync(abs)) { console.log(`⚠️  Skipping missing dir: ${localDir}`); return; }
  const files = fs.readdirSync(abs).filter(f => /\.(jpg|jpeg|png|webp|gif|svg)$/i.test(f));
  for (const file of files) {
    const localPath = path.join(abs, file);
    const publicId  = `${PREFIX}/${cloudFolder}/${noExt(file)}`;
    await upload(localPath, publicId);
  }
}

// Upload a list of { url, id } objects from Supabase
async function uploadFromSupabase(bucket, files, cloudFolder) {
  for (const file of files) {
    const url      = `${SUPABASE}/${bucket}/${file}`;
    const publicId = `${PREFIX}/${cloudFolder}/${noExt(path.basename(file))}`;
    await upload(url, publicId);
  }
}

async function main() {
  console.log('\n🚀 Starting Cloudinary upload for Scott Arthur Yerkey...\n');

  // ── LOCAL: images already in public/images ────────────────────────────────

  // Hero images
  console.log('\n── Hero images ──');
  await uploadDir('public/images/LakeSide', 'hero');

  // Sunset Lane (webp — already optimized)
  console.log('\n── Sunset Lane ──');
  await uploadDir('public/images/SunsetLane', 'projects/sunset-lane');

  // Browning Court
  console.log('\n── Browning Court ──');
  await uploadDir('public/images/BrowningCourt-HighlandPark', 'projects/browning-court');

  // Rancho Mirage (new photos)
  console.log('\n── Rancho Mirage ──');
  await uploadDir('public/images/RanchoMirage', 'projects/rancho-mirage');

  // W. Winona
  console.log('\n── W. Winona ──');
  await uploadDir('public/images/939WWinonaSt', 'projects/w-winona');

  // ── FROM SUPABASE: projects not yet local ────────────────────────────────

  // The Four Seasons Residences
  console.log('\n── The Four Seasons Residences (from Supabase) ──');
  await uploadFromSupabase('Projects', [
    'the-four-seasons-residences/four-seasons-01.jpg',
    'the-four-seasons-residences/four-seasons-02.jpg',
    'the-four-seasons-residences/four-seasons-03.jpg',
    'the-four-seasons-residences/four-seasons-04.jpg',
    'the-four-seasons-residences/four-seasons-05.jpg',
    'the-four-seasons-residences/four-seasons-06.jpg',
    'the-four-seasons-residences/four-seasons-07.jpg',
  ], 'projects/four-seasons');

  // Highland Park
  console.log('\n── Highland Park (from Supabase) ──');
  await uploadFromSupabase('Projects', [
    'highland-park/HighlandPark1.png',
    'highland-park/HighlandPark2.jpg',
    'highland-park/HighlandPark3.jpg',
    'highland-park/HighlandPark4.jpg',
    'highland-park/HighlandPark6.jpg',
    'highland-park/HighlandPark12.jpg',
    'highland-park/HighlandPark13.jpg',
    'highland-park/HighlandPark14.jpg',
    'highland-park/HighlandPark15.jpg',
    'highland-park/HighlandPark18.jpg',
    'highland-park/HighlandPark19.jpg',
    'highland-park/HighlandPark20.jpg',
    'highland-park/HighlandPark21.jpg',
  ], 'projects/highland-park');

  // Halco Dunes
  console.log('\n── Halco Dunes (from Supabase) ──');
  await uploadFromSupabase('Projects', [
    'halco-dunes/HalcoDunes.jpeg',
    'halco-dunes/HalcoDunes2.jpeg',
    'halco-dunes/HalcoDunes3.jpeg',
    'halco-dunes/HalcoDunes4.jpeg',
    'halco-dunes/HalcoDunes5.jpeg',
    'halco-dunes/HalcoDunes6.jpeg',
  ], 'projects/halco-dunes');

  // Lakeside (full gallery from Supabase)
  console.log('\n── Lakeside full gallery (from Supabase) ──');
  await uploadFromSupabase('Projects', [
    'lakeside/LakeSide0472.jpg',
    'lakeside/LakeSide0474.jpg',
    'lakeside/LakeSide0475.jpg',
    'lakeside/LakeSide0476.jpg',
    'lakeside/LakeSide0477.jpg',
    'lakeside/LakeSide0478.jpg',
    'lakeside/LakeSide0479.jpg',
    'lakeside/LakeSide0480.jpg',
    'lakeside/LakeSide0481.jpg',
    'lakeside/LakeSide0482.jpg',
    'lakeside/LakeSide0483.jpg',
    'lakeside/LakeSide0484.jpg',
    'lakeside/LakeSide0485.jpg',
    'lakeside/LakeSide0486.jpg',
    'lakeside/LakeSide0487.jpg',
    'lakeside/LakeSide0488.jpg',
    'lakeside/LakeSide0489.jpg',
    'lakeside/LakeSide0490.jpg',
    'lakeside/LakeSide0491.jpg',
    'lakeside/LakeSide0492.jpg',
    'lakeside/LakeSide0493.jpg',
    'lakeside/LakeSide0494.jpg',
    'lakeside/LakeSide0495.jpg',
    'lakeside/LakeSide0496.jpg',
    'lakeside/LakeSide0497.jpg',
    'lakeside/LakeSide0498.jpg',
    'lakeside/LakeSide0499.jpg',
    'lakeside/LakeSide0500.jpg',
    'lakeside/LakeSide0501.jpg',
    'lakeside/LakeSide0503.jpg',
    'lakeside/LakesideMI.jpg',
  ], 'projects/lakeside');

  // Hero images from Supabase (the ones not in local LakeSide folder)
  console.log('\n── Hero images (from Supabase) ──');
  await uploadFromSupabase('Hero', [
    'hero-images/LakeForest.png',
    'hero-images/LakeForestFoyer.png',
    'hero-images/LakeForestMasterBedroom.png',
    'hero-images/LakeSide0474.jpg',
    'hero-images/LakeSide0479.jpg',
    'hero-images/LakeSide0485.jpg',
  ], 'hero');

  console.log('\n✨ Upload complete!\n');
}

main().catch(console.error);
