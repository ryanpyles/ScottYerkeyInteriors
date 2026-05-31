import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ImageOptimization from '@/components/ImageOptimization';

const images = [
  "https://images.unsplash.com/photo-1691410296927-7c65421c46d2",
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0",
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c"
];

const imageAlts = [
  "Minimalist architectural exterior showcasing structural design and natural light reflection",
  "Modern luxury residential living space with high-end furnishings and expansive views",
  "Elegant contemporary interior design featuring natural materials, stone, and rich textiles",
  "Sophisticated open-plan living and dining area designed for seamless flow and entertaining"
];

const HeroImage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); 

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-[100svh] md:h-[100vh] min-h-[100vh] overflow-hidden bg-[#1B1B1B]" aria-hidden="true">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full"
        >
          <ImageOptimization
            src={images[currentIndex]}
            alt={imageAlts[currentIndex] || "Architectural interior design showcase"}
            loading={currentIndex === 0 ? "eager" : "lazy"}
            className="w-full h-full object-cover image-responsive"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default HeroImage;