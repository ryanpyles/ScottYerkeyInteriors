import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ParallaxImageSection = ({ image, title, description, onClick }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ 
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <div 
      ref={ref} 
      className="w-full h-full relative overflow-hidden group cursor-pointer"
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`View ${title || 'gallery image'} in full screen`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <motion.div 
        style={{ y, willChange: "transform" }} 
        className="absolute inset-0 w-full h-[130%] -top-[15%]"
      >
        <img 
          src={image} 
          alt={title || "Portfolio project showcase"}
          className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-105"
        />
      </motion.div>
      
      <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/20 transition-colors duration-500" aria-hidden="true" />
      
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <span className="bg-charcoal/80 text-white backdrop-blur-md px-6 py-3 rounded-full font-sans text-sm tracking-widest uppercase border border-white/10">
          View Image
        </span>
      </div>

      {(title || description) && (
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 lg:p-16 bg-gradient-to-t from-charcoal/80 to-transparent z-10 pointer-events-none">
          {title && (
            <h3 className="text-white font-serif text-2xl md:text-3xl lg:text-4xl mb-2 tracking-wide text-shadow-sm">
              {title}
            </h3>
          )}
          {description && (
            <p className="text-white/80 font-sans text-sm md:text-base max-w-2xl leading-relaxed">
              {description}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default ParallaxImageSection;