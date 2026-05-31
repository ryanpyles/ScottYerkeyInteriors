import React from 'react';
import { motion } from 'framer-motion';
import ParallaxScrollGallery from './ParallaxScrollGallery';

const PortfolioTabs = ({ residencesItems }) => {
  return (
    <div className="w-full relative min-h-screen">
      <div className="w-full relative">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full h-full"
        >
          <ParallaxScrollGallery items={residencesItems} />
        </motion.div>
      </div>
    </div>
  );
};

export default PortfolioTabs;