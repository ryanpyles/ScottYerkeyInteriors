import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import DesertOasisGallery from './DesertOasisGallery';
import FourSeasonsGallery from './FourSeasonsGallery';
import NorthshoreGrandeurGallery from './NorthshoreGrandeurGallery';
import HighlandParkGallery from './HighlandParkGallery';
import WinonaGallery from './WinonaGallery';

const galleryComponents = {
  'desert-oasis': DesertOasisGallery,
  'four-seasons-residence': FourSeasonsGallery,
  'northshore-grandeur': NorthshoreGrandeurGallery,
  'highland-park-highlife': HighlandParkGallery,
  'winona': WinonaGallery,
};

const CaseStudyGallery = ({ project }) => {
  const GalleryComponent = useMemo(() => {
    if (!project?.id) return null;
    return galleryComponents[project.id] || null;
  }, [project?.id]);

  if (!GalleryComponent) {
    return (
      <div className="w-full min-h-screen bg-charcoal flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h3 className="font-serif text-3xl sm:text-4xl text-warm-off-white mb-4 tracking-tight">
            Gallery Not Available
          </h3>
          <div className="h-px w-16 bg-gold mb-6 mx-auto" aria-hidden="true" />
          <p className="text-lg text-warm-off-white/70 font-sans leading-relaxed">
            This project gallery is currently unavailable.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-full h-[100vh] relative z-10">
      <GalleryComponent />
    </div>
  );
};

export default CaseStudyGallery;