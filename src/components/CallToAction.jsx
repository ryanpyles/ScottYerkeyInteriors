import React from 'react';
import { motion } from 'framer-motion';

const CallToAction = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contact-section');
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-6 w-full py-8">
      <motion.h2
        className='text-xl sm:text-2xl font-bold text-white text-center leading-8 w-full font-sans tracking-wide'
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Let's turn your ideas into reality
      </motion.h2>
      <motion.button
        onClick={scrollToContact}
        className="px-8 py-3 bg-white text-[#1B1B1B] font-medium tracking-wide uppercase text-sm rounded-sm hover:bg-white/90 transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white outline-none"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Start a Conversation
      </motion.button>
    </div>
  );
};

export default CallToAction;