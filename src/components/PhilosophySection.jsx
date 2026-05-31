import React from 'react';
import { motion } from 'framer-motion';

const PhilosophySection = () => {
  return (
    <section className="bg-[#F4F2EE] py-16 sm:py-24 lg:py-32 px-4 sm:px-6">
      <div className="max-w-[1400px] mx-auto">
        <div className="max-w-4xl mx-auto text-center space-y-8 sm:space-y-12">
          <motion.h2
            className="font-sans font-semibold text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-[#1B1B1B] tracking-tight leading-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Design begins with architecture.
          </motion.h2>

          <motion.p
            className="text-base sm:text-lg lg:text-xl text-[#1B1B1B]/80 leading-relaxed font-sans px-2 sm:px-0"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Every residence begins with the bones of the structure. Proportion, scale, and light 
            shape the foundation. Materials are chosen for longevity, not novelty. The result is 
            an interior that feels composed, enduring, and quietly expressive.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default PhilosophySection;