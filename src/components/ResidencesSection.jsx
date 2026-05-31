
import React from 'react';
import ScrollRevealWrapper from './ScrollRevealWrapper';
import AnimatedText from './AnimatedText';
import ResidencesGallery from './ResidencesGallery';

const ResidencesSection = () => {
  return (
    <section id="residences" className="py-20 md:py-32 bg-[#F4F2EE] relative border-t border-[#1B1B1B]/5">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 md:mb-16">
          <ScrollRevealWrapper>
            <AnimatedText
              text="Residences"
              el="h2"
              className="font-serif font-medium text-4xl md:text-5xl lg:text-6xl text-[#1B1B1B] tracking-tight"
            />
          </ScrollRevealWrapper>
          <ScrollRevealWrapper delay={0.2}>
            <p className="mt-4 text-[#1B1B1B]/70 font-sans text-lg max-w-2xl">
              Explore our curated portfolio of distinctive residential spaces, thoughtfully designed to elevate everyday living.
            </p>
          </ScrollRevealWrapper>
        </div>
        
        <ResidencesGallery />
      </div>
    </section>
  );
};

export default ResidencesSection;
