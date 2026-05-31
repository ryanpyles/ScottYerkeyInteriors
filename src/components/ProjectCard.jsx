
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getProjectImageUrl } from '@/lib/imageUtils';
import { useImageLoading } from '@/hooks/useImageLoading';

const ProjectCard = ({ project }) => {
  const { isLoaded, hasError, handleLoad, handleError } = useImageLoading();
  const imageUrl = getProjectImageUrl(project.folder, project.heroImage);

  const onImageError = () => {
    console.error(`[ProjectCard] Failed to load image: ${imageUrl}`);
    handleError();
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="group flex flex-col gap-4"
    >
      <Link to={`/projects/${project.slug}`} className="block overflow-hidden relative aspect-video bg-muted/30 rounded-sm">
        {!isLoaded && !hasError && (
          <div className="absolute inset-0 bg-muted/50 animate-pulse" />
        )}
        {hasError ? (
          <div className="absolute inset-0 flex items-center justify-center bg-[#E5E5E5] dark:bg-[#1A1A1A]">
            <span className="text-muted-foreground/40 font-sans text-xs uppercase tracking-widest px-4 text-center">
              Image Unavailable
            </span>
          </div>
        ) : (
          <img
            src={imageUrl}
            alt={`${project.title} located in ${project.location}`}
            loading="lazy"
            onLoad={handleLoad}
            onError={onImageError}
            className={`w-full h-full object-cover transition-all duration-700 ease-in-out group-hover:scale-[1.02] ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500 pointer-events-none" />
      </Link>
      
      <div className="flex flex-col">
        <h3 className="font-serif text-xl sm:text-2xl text-foreground mb-1 group-hover:text-primary transition-colors duration-300">
          <Link to={`/projects/${project.slug}`}>{project.title}</Link>
        </h3>
        <p className="font-sans text-sm text-muted-foreground uppercase tracking-wider">
          {project.location}
        </p>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
