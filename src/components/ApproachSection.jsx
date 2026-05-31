import React from 'react';
import { motion } from 'framer-motion';
import ScrollRevealWrapper from './ScrollRevealWrapper';
import AnimatedText from './AnimatedText';

const approaches = [
  {
    title: 'Discovery',
    description: 'Understanding the client\'s architecture, lifestyle, and long-term vision.'
  },
  {
    title: 'Development',
    description: 'Detailed architectural drawings, refined materials, and disciplined curation.'
  },
  {
    title: 'Execution',
    description: 'Collaboration with trusted artisans and contractors to ensure precision.'
  }
];

const ApproachSection = () => {
  return (
    <section id="approach" className="bg-[#F4F2EE] py-16 sm:py-24 lg:py-32 border-t border-[#1B1B1B]/5 overflow-hidden" aria-labelledby="approach-heading">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 lg:mb-24">
          <AnimatedText
            id="approach-heading"
            text="Approach"
            el="h2"
            className="font-sans font-semibold text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-[#1B1B1B] tracking-tight"
            type="word"
            staggerDelay={0.1}
          />
          <motion.div 
            className="h-px bg-[#8C7A5A]/40 mx-auto mt-6"
            initial={{ width: 0 }}
            whileInView={{ width: "80px" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 md:gap-8 lg:gap-16">
          {approaches.map((approach, index) => (
            <ScrollRevealWrapper
              key={index}
              delay={index * 0.2}
              className="relative p-6 sm:p-0 bg-white/50 md:bg-transparent rounded-lg md:rounded-none group"
            >
              {index < 2 && (
                <motion.div 
                  className="hidden md:block absolute top-0 right-[-1.5rem] lg:right-[-2rem] w-px bg-[#8C7A5A]/30 origin-top"
                  initial={{ height: 0 }}
                  whileInView={{ height: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5 + (index * 0.2) }}
                  aria-hidden="true" 
                />
              )}
              
              <h3 className="font-sans font-semibold text-xl sm:text-2xl lg:text-3xl text-[#1B1B1B] mb-4 sm:mb-6 tracking-tight transition-colors duration-300 group-hover:text-[#8C7A5A]">
                {approach.title}
              </h3>
              
              <p className="text-base sm:text-lg text-[#1B1B1B]/80 leading-relaxed font-sans">
                {approach.description}
              </p>
            </ScrollRevealWrapper>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ApproachSection;