
import React, { useEffect, useState, useRef } from 'react';
import { getProjectImageUrl } from '@/lib/imageUtils';

const SelectedWorksHero = () => {
  const [offsetY, setOffsetY] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleMediaChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleMediaChange);

    let animationFrameId;
    
    const handleScroll = () => {
      if (mediaQuery.matches) return;
      
      animationFrameId = requestAnimationFrame(() => {
        // Calculate offset as scrollY * 0.3 
        // We use positive translateY to push the element down relative to its scrolling container,
        // which makes it move upward slower than the page scroll on the screen.
        setOffsetY(window.scrollY * 0.3);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial call to set correct position
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      mediaQuery.removeEventListener('change', handleMediaChange);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  // Using Highland Park as the featured hero image
  const heroImageUrl = getProjectImageUrl('highland-park', 'HighlandPark1.jpg');

  return (
    <section 
      ref={sectionRef}
      className="relative w-full h-[100vh] flex flex-col md:flex-row overflow-hidden bg-background border-t border-border/40 cinematic-split"
      aria-label="Selected Works Highlight"
    >
      {/* LEFT SIDE: Image */}
      <div className="relative w-full h-[50vh] md:h-full md:w-[60%] lg:w-1/2 overflow-hidden m-0 p-0">
        <img 
          src={heroImageUrl} 
          alt="Highland Park Residence Hero View" 
          className="w-full h-full object-cover object-center absolute inset-0"
          loading="eager"
          fetchPriority="high"
        />
      </div>

      {/* RIGHT SIDE: Title */}
      <div className="relative w-full h-[50vh] md:h-full md:w-[40%] lg:w-1/2 flex items-center justify-center bg-background z-10 p-8">
        <div 
          className="text-center will-change-transform flex flex-col items-center justify-center"
          style={{ 
            transform: prefersReducedMotion ? 'none' : `translateY(${offsetY}px)`,
            transition: prefersReducedMotion ? 'none' : 'transform 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
          }}
        >
          <span className="font-sans text-xs md:text-sm text-muted-foreground uppercase tracking-[0.2em] mb-4 md:mb-6 block cinematic-subtitle">
            Selected Work
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-foreground font-normal tracking-tight leading-tight cinematic-title">
            Highland Park
          </h2>
        </div>
      </div>
    </section>
  );
};

export default SelectedWorksHero;
