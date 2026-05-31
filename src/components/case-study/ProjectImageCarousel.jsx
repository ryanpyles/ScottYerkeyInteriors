import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ImageOptimization from '@/components/ImageOptimization';

const ProjectImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageLoading, setImageLoading] = useState(true);

  const nextSlide = useCallback(() => {
    setImageLoading(true);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevSlide = useCallback(() => {
    setImageLoading(true);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  if (!images || images.length === 0) return null;

  return (
    <section 
      className="relative w-full h-[100vh] h-[100svh] bg-[#1B1B1B] overflow-hidden flex flex-col focus:outline-none"
      tabIndex={0}
      aria-label="Project image carousel"
    >
      <div className="relative flex-grow overflow-hidden bg-black">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full flex items-center justify-center p-0 sm:p-12 lg:p-24"
          >
            {imageLoading && <div className="absolute inset-0 bg-[#1A1A1A] animate-pulse" aria-hidden="true" />}
            <div className="w-full h-full max-h-[85vh] sm:max-h-full">
              <ImageOptimization
                src={images[currentIndex].url || images[currentIndex]}
                alt={images[currentIndex].alt || `Project architectural view ${currentIndex + 1} showcasing interior design details`}
                className={`w-full h-full object-contain image-carousel transition-opacity duration-500 ${imageLoading ? 'opacity-0' : 'opacity-100'}`}
              />
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="absolute top-24 right-6 text-white/90 font-sans text-sm tracking-widest z-10 bg-black/40 px-4 py-1.5 rounded-full backdrop-blur-md" aria-live="polite">
          {currentIndex + 1} / {images.length}
        </div>

        <button 
          onClick={prevSlide}
          className="absolute left-2 sm:left-8 top-1/2 -translate-y-1/2 p-2 sm:p-4 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all backdrop-blur-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white z-10"
          aria-label="Previous gallery image"
        >
          <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" aria-hidden="true" />
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-2 sm:right-8 top-1/2 -translate-y-1/2 p-2 sm:p-4 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all backdrop-blur-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white z-10"
          aria-label="Next gallery image"
        >
          <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" aria-hidden="true" />
        </button>
      </div>

      <div className="h-20 lg:h-32 bg-[#0a0a0a] p-2 flex gap-2 overflow-x-auto" role="tablist" aria-label="Gallery thumbnails">
        {images.map((img, idx) => (
          <button
            key={idx}
            role="tab"
            aria-selected={currentIndex === idx}
            onClick={() => {
              if(currentIndex !== idx) setImageLoading(true);
              setCurrentIndex(idx);
            }}
            className={`relative flex-shrink-0 h-full w-24 lg:w-48 overflow-hidden transition-all duration-300 focus-visible:ring-2 focus-visible:ring-white outline-none rounded-sm ${
              currentIndex === idx ? 'ring-2 ring-white opacity-100' : 'opacity-30 hover:opacity-70'
            }`}
            aria-label={`Select thumbnail ${idx + 1} to view full size`}
          >
            <ImageOptimization 
              src={img.url || img} 
              alt={img.alt ? `Thumbnail of ${img.alt}` : `Project thumbnail ${idx + 1} for interior gallery`} 
              loading="lazy" 
              className="w-full h-full object-cover" 
            />
          </button>
        ))}
      </div>
    </section>
  );
};

export default ProjectImageCarousel;