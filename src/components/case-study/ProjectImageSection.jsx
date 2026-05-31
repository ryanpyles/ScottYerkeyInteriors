import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ProjectImageSection = ({ src, alt }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <section className="relative w-full h-[100vh] bg-[#1B1B1B] overflow-hidden flex items-center justify-center">
      {isLoading && (
        <div className="absolute inset-0 bg-[#2A2A2A] animate-pulse z-10" aria-hidden="true" />
      )}
      
      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        viewport={{ once: true, margin: "-10%" }}
        className="w-full h-full relative z-0"
      >
        <picture>
          <source srcSet={src} type="image/webp" />
          <img
            src={src}
            alt={alt || "Immersive architectural view"}
            loading="lazy"
            onLoad={() => setIsLoading(false)}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
              isLoading ? 'opacity-0' : 'opacity-100'
            }`}
          />
        </picture>
        <div className="absolute inset-0 bg-black/10 pointer-events-none" aria-hidden="true" />
      </motion.div>
    </section>
  );
};

export default ProjectImageSection;