import React from 'react';
import { motion } from 'framer-motion';

const awards = [
  {
    year: "2010",
    organization: "ASID Illinois",
    title: "Design Excellence Award",
    description: "First Place Kitchen Award",
    details: "Recognized for outstanding achievement in kitchen design, blending functional excellence with aesthetic sophistication."
  },
  {
    year: "2010",
    organization: "ADEX Awards",
    title: "Awards for Design Excellence",
    description: "Design Journal Recognitions",
    details: "Platinum: Wilkins Fainting Bench\nGold: Perry Side Chair\nFeatured: Santorini Console Table"
  },
  {
    year: "2010",
    organization: "Designs for Dignity",
    title: "Founder's Award Honoree",
    description: "Philanthropic Recognition",
    details: "Honored for outstanding contributions and dedication to empowering lives through design."
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const AwardsSection = () => {
  return (
    <section id="awards" className="bg-white py-16 sm:py-24 lg:py-32 border-t border-[#1B1B1B]/10">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 sm:mb-24"
          >
            <h2 className="font-sans font-semibold text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-[#1B1B1B] mb-6 tracking-tight">
              Awards & Recognition
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-[#1B1B1B]/80 font-sans max-w-2xl mx-auto leading-relaxed">
              Celebrating excellence in interior design and unwavering commitment to exceptional craftsmanship.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-8 sm:space-y-12"
          >
            {awards.map((award, index) => (
              <motion.article
                key={index}
                variants={itemVariants}
                className="group relative bg-[#F4F2EE] p-8 sm:p-12 border border-[#1B1B1B]/5 hover:border-[#8C7A5A]/30 transition-colors duration-500 flex flex-col sm:flex-row gap-6 sm:gap-12 items-start"
              >
                <div className="sm:w-1/4 flex-shrink-0">
                  <div className="font-sans font-medium text-[#8C7A5A] text-lg sm:text-xl tracking-wider mb-2">
                    {award.year}
                  </div>
                  <div className="font-sans font-semibold text-[#1B1B1B] text-sm sm:text-base tracking-widest uppercase">
                    {award.organization}
                  </div>
                </div>
                
                <div className="sm:w-3/4">
                  <h3 className="font-sans font-medium text-2xl sm:text-3xl text-[#1B1B1B] mb-3 tracking-tight group-hover:text-[#8C7A5A] transition-colors duration-300">
                    {award.title}
                  </h3>
                  <h4 className="font-sans font-medium text-lg lg:text-xl text-[#1B1B1B]/90 mb-4">
                    {award.description}
                  </h4>
                  <p className="font-sans text-base sm:text-lg text-[#1B1B1B]/70 leading-relaxed whitespace-pre-line">
                    {award.details}
                  </p>
                </div>
                
                <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-[#8C7A5A]/0 group-hover:border-[#8C7A5A]/40 transition-colors duration-500 m-4" aria-hidden="true" />
              </motion.article>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AwardsSection;