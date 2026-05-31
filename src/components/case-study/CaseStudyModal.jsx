import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProjectNavigation } from '@/contexts/CaseStudyContext';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import ParallaxScrollGallery from './ParallaxScrollGallery';

const CaseStudyModal = () => {
  const { selectedProjectId, closeModal, nextProject, previousProject, caseStudiesData } = useProjectNavigation();

  const project = selectedProjectId ? caseStudiesData.find(p => p.id === selectedProjectId) : null;

  const galleryItems = useMemo(() => {
    if (!project) return [];
    
    const rawImages = project.images || project.gallery || [];
    const imagesWithCover = [...rawImages];
    if (!imagesWithCover.length && project.coverImage) {
      imagesWithCover.push({ url: project.coverImage });
    }

    const items = [];
    
    if (imagesWithCover[0]) {
        const details = [];
        if (project.client) details.push({ label: 'Client', value: project.client });
        if (project.scope) details.push({ label: 'Scope', value: project.scope });
        if (project.style) details.push({ label: 'Style', value: project.style });
        if (project.materials) details.push({ label: 'Materials', value: project.materials });

        items.push({
            image: project.coverImage || imagesWithCover[0].url || imagesWithCover[0],
            title: project.title,
            description: project.overview || project.description,
            details: details
        });
    }

    if (imagesWithCover[1]) {
        items.push({
            image: imagesWithCover[1].url || imagesWithCover[1],
            title: project.designApproach ? "Design Approach" : null,
            description: project.designApproach || null,
        });
    }

    for (let i = 2; i < imagesWithCover.length; i++) {
         items.push({ image: imagesWithCover[i].url || imagesWithCover[i] });
    }

    return items;
  }, [project]);

  return (
    <AnimatePresence>
      {selectedProjectId && (
        <motion.div 
          initial={{ opacity: 0, y: "100%" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "100%" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[200] bg-[#1B1B1B] overflow-y-auto overflow-x-hidden w-full h-full"
          role="dialog"
          aria-modal="true"
        >
          {/* Floating UI Chrome */}
          <div className="fixed top-0 left-0 w-full z-[210] p-4 sm:p-6 flex justify-between items-start pointer-events-none mix-blend-difference text-white">
            <nav className="pointer-events-auto flex gap-2 sm:gap-3">
              <button 
                onClick={() => previousProject(selectedProjectId)} 
                className="p-3 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full outline-none focus-visible:ring-2 focus-visible:ring-white transition-all"
                aria-label="Previous Project"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button 
                onClick={() => nextProject(selectedProjectId)} 
                className="p-3 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full outline-none focus-visible:ring-2 focus-visible:ring-white transition-all"
                aria-label="Next Project"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </nav>

            <button 
              onClick={closeModal} 
              className="pointer-events-auto p-3 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full outline-none focus-visible:ring-2 focus-visible:ring-white transition-all"
              aria-label="Close Project Gallery"
            >
              <X className="w-7 h-7" />
            </button>
          </div>
          
          {/* Full-bleed Gallery */}
          <div className="w-full">
            <ParallaxScrollGallery items={galleryItems} />
          </div>
          
          {/* Next Project Teaser Footer */}
          <div className="bg-[#1B1B1B] h-[60vh] flex flex-col items-center justify-center text-center px-4 relative z-10 border-t border-white/5">
            <button 
              onClick={() => nextProject(project.id)}
              className="group flex flex-col items-center hover:opacity-70 transition-opacity focus-visible:ring-2 focus-visible:ring-offset-8 focus-visible:ring-white/50 rounded-sm outline-none p-8"
            >
              <span className="text-sm sm:text-base uppercase tracking-widest text-white/50 mb-6 font-medium">Next Project</span>
              <span className="text-4xl sm:text-5xl lg:text-7xl font-sans font-semibold text-white flex items-center gap-6">
                Continue Exploring
                <ChevronRight className="w-10 h-10 lg:w-14 lg:h-14 group-hover:translate-x-3 transition-transform" />
              </span>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CaseStudyModal;