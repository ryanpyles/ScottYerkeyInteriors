import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ParallaxImageSection from './ParallaxImageSection';
import ImageGalleryModal from '@/components/ImageGalleryModal';

const ParallaxScrollGallery = ({ items }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!items || !items.length) {
    return (
      <div className="w-full min-h-screen bg-charcoal flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h3 className="font-serif text-3xl sm:text-4xl text-warm-off-white mb-4 tracking-tight">
            No Images Available
          </h3>
          <div className="h-px w-16 bg-gold mb-6 mx-auto" aria-hidden="true" />
          <p className="text-lg text-warm-off-white/70 font-sans leading-relaxed">
            This gallery is currently empty. Please check back later.
          </p>
        </motion.div>
      </div>
    );
  }

  const openModal = (index) => {
    setCurrentIndex(index);
    setModalOpen(true);
  };

  const handleNavigate = (direction) => {
    if (direction === 'prev') {
      setCurrentIndex((prev) => (prev > 0 ? prev - 1 : items.length - 1));
    } else {
      setCurrentIndex((prev) => (prev < items.length - 1 ? prev + 1 : 0));
    }
  };

  return (
    <>
      <div className="w-full bg-charcoal relative z-10" aria-label="Parallax Image Gallery">
        {items.map((item, index) => (
          <div 
            key={index} 
            className="w-full h-[100vh] h-[100dvh] relative overflow-hidden"
          >
            <ParallaxImageSection 
              {...item} 
              onClick={() => openModal(index)} 
            />
          </div>
        ))}
      </div>

      <ImageGalleryModal
        isOpen={modalOpen}
        images={items}
        currentIndex={currentIndex}
        onClose={() => setModalOpen(false)}
        onNavigate={handleNavigate}
      />
    </>
  );
};

export default ParallaxScrollGallery;