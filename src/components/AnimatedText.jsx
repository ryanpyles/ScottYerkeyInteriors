import React from 'react';
import { motion } from 'framer-motion';

const AnimatedText = ({
  text,
  el: Wrapper = 'p',
  className,
  once = true,
  type = 'word', // 'word' or 'char'
  variant = 'slide-up', // 'fade', 'slide-up', 'glow'
  delay = 0,
  duration = 0.5,
  staggerDelay = 0.05
}) => {
  const textArray = type === 'word' ? text.split(' ') : text.split('');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };

  const getChildVariants = () => {
    switch (variant) {
      case 'fade':
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration } },
        };
      case 'glow':
        return {
          hidden: { opacity: 0, textShadow: '0px 0px 0px rgba(255,255,255,0)' },
          visible: { 
            opacity: 1, 
            textShadow: '0px 0px 8px rgba(255,255,255,0.8)',
            transition: { duration } 
          },
        };
      case 'slide-up':
      default:
        return {
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { duration, ease: [0.2, 0.65, 0.3, 0.9] } },
        };
    }
  };

  return (
    <Wrapper className={className}>
      <motion.span
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once }}
        className="inline-block"
      >
        {textArray.map((item, index) => (
          <motion.span
            key={index}
            variants={getChildVariants()}
            className="inline-block"
            style={{ marginRight: type === 'word' ? '0.25em' : '0' }}
          >
            {item}
          </motion.span>
        ))}
      </motion.span>
    </Wrapper>
  );
};

export default AnimatedText;