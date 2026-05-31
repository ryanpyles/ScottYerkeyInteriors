import React from 'react';
import { motion } from 'framer-motion';

const ScrollRevealWrapper = ({
  children,
  className,
  delay = 0,
  duration = 0.6,
  yOffset = 30,
  once = true,
  variant = 'slide-up'
}) => {
  const variants = {
    hidden: { 
      opacity: 0, 
      y: variant === 'slide-up' ? yOffset : 0,
      scale: variant === 'scale' ? 0.95 : 1
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        duration, 
        delay, 
        ease: [0.25, 0.1, 0.25, 1] 
      } 
    }
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-50px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollRevealWrapper;