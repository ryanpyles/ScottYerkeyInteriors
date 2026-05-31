
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSupabaseProjects } from '@/hooks/useSupabaseProjects';
import ProjectModal from './ProjectModal';
import { RefreshCw, Image as ImageIcon } from 'lucide-react';

const ResidencesGallery = () => {
  const { projects, isLoading, error, refetch } = useSupabaseProjects();
  const [modalOpen, setModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openModal = (index) => {
    setCurrentIndex(index);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleNavigate = (direction) => {
    if (direction === 'prev') {
      setCurrentIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
    } else {
      setCurrentIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
    }
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="aspect-[4/3] bg-[#e8e6e1] animate-pulse rounded-sm overflow-hidden flex flex-col">
            <div className="flex-1 bg-[#dfddd8]" />
            <div className="h-12 bg-[#e8e6e1] px-4 py-3 flex items-center">
              <div className="h-4 bg-[#dfddd8] rounded w-2/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-white/50 border border-[#1B1B1B]/10 rounded-sm">
        <p className="text-[#1B1B1B]/80 font-sans text-lg mb-4">
          Unable to load projects at this time.
        </p>
        <p className="text-[#1B1B1B]/50 font-sans text-sm mb-6">{error}</p>
        <button
          onClick={refetch}
          className="flex items-center gap-2 px-6 py-3 bg-[#1B1B1B] text-white hover:bg-[#c9a961] transition-colors duration-300 font-sans uppercase tracking-wider text-sm rounded-sm"
        >
          <RefreshCw size={16} />
          Retry
        </button>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 px-4 text-center border border-dashed border-[#1B1B1B]/20 rounded-sm">
        <ImageIcon size={48} className="text-[#1B1B1B]/20 mb-4" />
        <p className="text-[#1B1B1B]/60 font-serif text-xl">No projects found.</p>
        <p className="text-[#1B1B1B]/40 font-sans mt-2">Check the 'Projects' bucket in Supabase.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {projects.map((project, index) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            key={project.file_path}
            onClick={() => openModal(index)}
            className="group cursor-pointer relative overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-500 rounded-sm flex flex-col aspect-[4/3]"
          >
            <div className="flex-1 relative overflow-hidden bg-[#F4F2EE]">
              <img
                src={project.public_url}
                alt={project.name}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
            </div>
            
            <div className="bg-white px-5 py-4 border-t border-[#1B1B1B]/5">
              <h3 className="font-serif text-[#1B1B1B] text-lg truncate capitalize group-hover:text-[#c9a961] transition-colors">
                {project.name}
              </h3>
            </div>
          </motion.div>
        ))}
      </div>

      <ProjectModal
        isOpen={modalOpen}
        onClose={closeModal}
        projects={projects}
        currentIndex={currentIndex}
        onNavigate={handleNavigate}
      />
    </>
  );
};

export default ResidencesGallery;
