import React from 'react';
import { motion } from 'framer-motion';

const ProjectDetailsReveal = ({ title, children }) => {
  return (
    <section className="w-full bg-transparent py-24 sm:py-32 px-4 sm:px-8 lg:px-16 flex items-center justify-center min-h-[50vh] relative z-10 pointer-events-none">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, margin: "-15%" }}
        className="max-w-4xl w-full text-center space-y-8 pointer-events-auto backdrop-blur-sm p-8 rounded-2xl"
      >
        {title && (
          <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">
            {title}
          </h2>
        )}
        
        <div className="text-base sm:text-lg lg:text-xl text-white leading-relaxed font-sans max-w-3xl mx-auto drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] font-medium">
          {children}
        </div>
      </motion.div>
    </section>
  );
};

export default ProjectDetailsReveal;