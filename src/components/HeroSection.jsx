
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import AnimatedButton from './AnimatedButton';

const images = [
  {
    url: "https://horizons-cdn.hostinger.com/a0575405-a443-478e-a839-048cc548b670/3700d5fd1658e9c98bb3ed9edcd4a689.png",
    alt: "Luxurious residential living room featuring sophisticated cream upholstered seating, vibrant turquoise abstract artwork on the wall, rustic wooden ceiling beams adding warmth, and expansive floor-to-ceiling windows."
  },
  {
    url: "https://horizons-cdn.hostinger.com/a0575405-a443-478e-a839-048cc548b670/4735910f826f298143b0a106820f88cb.png",
    alt: "Elegant winding interior staircase with a sweeping curve, caramel leather sofa, and striking gold-framed contemporary artwork."
  },
  {
    url: "https://horizons-cdn.hostinger.com/a0575405-a443-478e-a839-048cc548b670/3a6d5124c06f6a0c5cccc4820c1183c7.png",
    alt: "Refined architectural sitting area boasting classic arched ceilings, featuring black upholstered lounge chairs with sleek gold legs."
  }
];

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [contentReady, setContentReady] = useState(false);

  useEffect(() => {
    const hasAnimated = sessionStorage.getItem('welcome_animation_played');
    if (hasAnimated === 'true') {
      setContentReady(true);
    } else {
      const timer = setInterval(() => {
        if (sessionStorage.getItem('welcome_animation_played')) {
          setTimeout(() => setContentReady(true), 1500);
          clearInterval(timer);
        }
      }, 100);
      return () => clearInterval(timer);
    }
  }, []);

  useEffect(() => {
    if (isHovered) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [isHovered]);

  const goToNext = () => setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  const goToPrevious = () => setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  const goToImage = (index) => setCurrentIndex(index);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <section 
      className="relative h-[100dvh] md:h-[100vh] w-full flex items-center justify-center overflow-hidden bg-[#0a0a0a]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Welcome and Featured Designs Carousel"
    >
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full"
        >
          {imageLoading && (
            <div className="absolute inset-0 bg-[#0a0a0a]" aria-hidden="true" />
          )}
          <img
            src={images[currentIndex].url}
            alt={images[currentIndex].alt}
            loading={currentIndex === 0 ? "eager" : "lazy"}
            onLoad={() => setImageLoading(false)}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${imageLoading ? 'opacity-0' : 'opacity-100'}`}
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true" />

      {/* Repositioned text up by adding margin-bottom and applying cinematic radial overlay */}
      <div className="relative z-10 text-center px-4 w-full h-full flex flex-col items-center justify-center mb-16 md:mb-32">
        
        {/* Cinematic overlay specifically tailored to the typography zone */}
        <div className="absolute inset-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[600px] overlay-cinematic z-0" aria-hidden="true"></div>

        <div className="relative z-10 flex flex-col items-center">
          <h1 className="sr-only">Scott Arthur Yerkey - Luxury Interior Design & Architecture</h1>
          
          <AnimatePresence>
            {contentReady && (
              <>
                <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                  className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white mb-6 sm:mb-8 tracking-[-0.02em] leading-[1.1] uppercase max-w-[320px] md:max-w-md mx-auto drop-shadow-xl"
                >
                  TIMELESS <br /> ELEGANCE
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="font-sans font-light text-xs sm:text-sm lg:text-base text-white/80 mb-10 sm:mb-12 tracking-[0.2em] uppercase max-w-[320px] mx-auto drop-shadow-md"
                >
                  Luxury Interior Design Excellence
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="flex flex-col sm:flex-row gap-4 sm:gap-5 w-full sm:w-auto"
                >
                  <AnimatedButton
                    onClick={() => scrollToSection('residences')}
                    className="w-full sm:w-auto px-6 py-2.5 min-h-[44px] text-xs sm:text-sm tracking-widest uppercase bg-transparent border border-white/30 hover:border-white/60 text-white transition-all duration-500 font-normal"
                    aria-label="View Portfolio of Selected Architectural Projects"
                  >
                    View Portfolio
                  </AnimatedButton>
                  
                  <AnimatedButton
                    onClick={() => scrollToSection('contact-section')}
                    className="w-full sm:w-auto px-6 py-2.5 min-h-[44px] text-xs sm:text-sm tracking-widest uppercase bg-white/90 backdrop-blur-sm text-charcoal border border-transparent hover:bg-white hover:border-white transition-all duration-500 font-normal"
                    aria-label="Schedule Consultation"
                  >
                    Schedule Consultation
                  </AnimatedButton>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>

      <motion.button 
        onClick={goToPrevious}
        initial={{ opacity: 0 }}
        animate={{ opacity: contentReady ? 1 : 0 }}
        transition={{ duration: 0.5, delay: contentReady ? 1 : 0 }}
        whileHover={{ scale: 1.1, backgroundColor: "rgba(0,0,0,0.6)" }}
        className="absolute left-4 sm:left-6 md:left-10 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 rounded-full bg-black/10 text-white/80 transition-colors backdrop-blur-sm focus-visible:ring-2 focus-visible:ring-white outline-none hidden sm:flex"
        aria-label="Previous background image"
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" aria-hidden="true" />
      </motion.button>

      <motion.button 
        onClick={goToNext}
        initial={{ opacity: 0 }}
        animate={{ opacity: contentReady ? 1 : 0 }}
        transition={{ duration: 0.5, delay: contentReady ? 1 : 0 }}
        whileHover={{ scale: 1.1, backgroundColor: "rgba(0,0,0,0.6)" }}
        className="absolute right-4 sm:right-6 md:right-10 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 rounded-full bg-black/10 text-white/80 transition-colors backdrop-blur-sm focus-visible:ring-2 focus-visible:ring-white outline-none hidden sm:flex"
        aria-label="Next background image"
      >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6" aria-hidden="true" />
      </motion.button>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: contentReady ? 1 : 0 }}
        transition={{ duration: 0.5, delay: contentReady ? 1 : 0 }}
        className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 z-20 flex items-center space-x-3 sm:space-x-4" 
        role="tablist" 
        aria-label="Image Carousel Selection"
      >
        {images.map((_, index) => (
          <motion.button
            key={index}
            role="tab"
            aria-selected={currentIndex === index}
            aria-label={`Show image ${index + 1} of ${images.length}`}
            onClick={() => goToImage(index)}
            className={`transition-all duration-700 rounded-full outline-none ${
              currentIndex === index 
                ? 'w-10 h-[2px] bg-white' 
                : 'w-2 h-[2px] bg-white/40 hover:bg-white/80'
            }`}
          />
        ))}
      </motion.div>
    </section>
  );
};

export default HeroSection;
