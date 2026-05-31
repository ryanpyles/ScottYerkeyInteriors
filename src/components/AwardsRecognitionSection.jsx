import React from 'react';
import { motion } from 'framer-motion';

const pressLogos = [
  { name: 'ASID Illinois', url: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&q=80&w=200&h=100' }, // placeholder logos
  { name: 'Palm Springs Life', url: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&q=80&w=200&h=100' },
  { name: 'LUXE Interiors + Design', url: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&q=80&w=200&h=100' },
  { name: 'NeoCon', url: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&q=80&w=200&h=100' },
  { name: 'Designs for Dignity', url: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&q=80&w=200&h=100' }
];

const awardsList = [
  { year: '2010', title: 'Design Excellence Award', org: 'ASID Illinois', desc: 'First Place Kitchen Award' },
  { year: '2010', title: 'Awards for Design Excellence', org: 'ADEX Awards', desc: 'Design Journal Recognitions: Platinum, Gold & Featured' },
  { year: '2010', title: "Founder's Award Honoree", org: 'Designs for Dignity', desc: 'Philanthropic Recognition' }
];

const AwardsRecognitionSection = () => {
  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl font-light tracking-wide text-gray-900 mb-4">Selected Recognition</h2>
          <div className="w-12 h-px bg-gray-300 mx-auto"></div>
        </motion.div>

        {/* Press Bar */}
        <div className="mb-32">
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-80">
            {pressLogos.map((logo, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <h3 className="text-lg font-medium tracking-widest text-gray-400 group-hover:text-gray-900 transition-colors duration-300 uppercase m-0">
                  {logo.name}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Awards List */}
        <div className="max-w-4xl mx-auto">
          <motion.h3 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-2xl font-light tracking-wider text-gray-900 mb-12 uppercase text-center"
          >
            Awards
          </motion.h3>
          
          <div className="border-t border-gray-200">
            {awardsList.map((award, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="py-8 border-b border-gray-200 flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12 group"
              >
                <div className="md:w-32 flex-shrink-0 text-sm font-light text-gray-500 tracking-widest">
                  {award.year}
                </div>
                <div className="flex-grow">
                  <h4 className="text-xl font-normal text-gray-900 mb-1 group-hover:text-gray-600 transition-colors duration-300">
                    {award.title}
                  </h4>
                  <div className="text-base text-gray-600 font-light">
                    <span className="font-medium mr-2">{award.org}</span>
                    <span className="text-gray-400">|</span>
                    <span className="ml-2">{award.desc}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AwardsRecognitionSection;