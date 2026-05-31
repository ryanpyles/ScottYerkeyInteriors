import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const ImageGalleryModal = ({ isOpen, images, currentIndex, onClose, onNavigate }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onNavigate('prev');
      if (e.key === 'ArrowRight') onNavigate('next');
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, onNavigate]);

  if (!isOpen || !images || images.length === 0) return null;

  const currentImage = images[currentIndex];
  const imgSrc = currentImage.url || currentImage.image;
  const imgAlt = currentImage.title || currentImage.description || 'Gallery image';

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4"
          aria-modal="true"
          role="dialog"
          aria-label="Image Gallery"
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-white/70 hover:text-gold transition-colors z-[210] p-2 focus-visible:ring-2 focus-visible:ring-gold rounded-full outline-none"
            aria-label="Close gallery"
          >
            <X className="w-8 h-8" />
          </button>

          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); onNavigate('prev'); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-gold transition-colors z-[210] p-4 hidden sm:block focus-visible:ring-2 focus-visible:ring-gold rounded-full outline-none"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-10 h-10" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); onNavigate('next'); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-gold transition-colors z-[210] p-4 hidden sm:block focus-visible:ring-2 focus-visible:ring-gold rounded-full outline-none"
                aria-label="Next image"
              >
                <ChevronRight className="w-10 h-10" />
              </button>
            </>
          )}

          <div 
            className="relative max-w-7xl max-h-[85vh] w-full flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.img
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              src={imgSrc}
              alt={imgAlt}
              className="max-w-full max-h-[80vh] object-contain shadow-2xl rounded-sm select-none"
            />
            
            <div className="mt-6 text-center text-white space-y-2">
              {currentImage.title && (
                <h4 className="font-serif text-xl tracking-wide text-gold">{currentImage.title}</h4>
              )}
              {currentImage.description && (
                <p className="text-sm font-sans text-white/70 max-w-2xl mx-auto">{currentImage.description}</p>
              )}
              {images.length > 1 && (
                <p className="text-xs font-sans tracking-widest text-white/40 uppercase mt-4">
                  {currentIndex + 1} of {images.length}
                </p>
              )}
            </div>
          </div>
          
          {/* Mobile swipe areas */}
          <div className="absolute inset-y-0 left-0 w-1/3 z-[205] sm:hidden" onClick={() => onNavigate('prev')} />
          <div className="absolute inset-y-0 right-0 w-1/3 z-[205] sm:hidden" onClick={() => onNavigate('next')} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ImageGalleryModal;