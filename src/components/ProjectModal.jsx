
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const ProjectModal = ({ isOpen, onClose, projects, currentIndex, onNavigate }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onNavigate('prev');
      if (e.key === 'ArrowRight') onNavigate('next');
    };

    window.addEventListener('keydown', handleKeyDown);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, onNavigate]);

  if (!isOpen || projects.length === 0) return null;

  const currentProject = projects[currentIndex];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 md:p-8"
        onClick={onClose}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 md:top-8 md:right-8 text-white/70 hover:text-white transition-colors p-2"
          aria-label="Close modal"
        >
          <X size={32} strokeWidth={1.5} />
        </button>

        <div 
          className="relative w-full max-w-6xl max-h-[85vh] flex flex-col items-center justify-center"
          onClick={e => e.stopPropagation()}
        >
          {projects.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); onNavigate('prev'); }}
                className="absolute left-2 md:-left-12 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors p-2 z-10 bg-black/20 hover:bg-black/40 rounded-full md:bg-transparent"
                aria-label="Previous project"
              >
                <ChevronLeft size={40} strokeWidth={1.5} />
              </button>
              
              <button
                onClick={(e) => { e.stopPropagation(); onNavigate('next'); }}
                className="absolute right-2 md:-right-12 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors p-2 z-10 bg-black/20 hover:bg-black/40 rounded-full md:bg-transparent"
                aria-label="Next project"
              >
                <ChevronRight size={40} strokeWidth={1.5} />
              </button>
            </>
          )}

          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="w-full flex justify-center h-full"
          >
            <img
              src={currentProject.public_url}
              alt={currentProject.name}
              className="max-w-full max-h-[80vh] object-contain shadow-2xl"
            />
          </motion.div>
          
          <div className="absolute -bottom-12 left-0 right-0 text-center">
            <h3 className="text-white text-lg md:text-xl font-serif tracking-wide capitalize">
              {currentProject.name}
            </h3>
            <p className="text-white/60 text-sm mt-1 font-sans">
              {currentIndex + 1} of {projects.length}
            </p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProjectModal;
