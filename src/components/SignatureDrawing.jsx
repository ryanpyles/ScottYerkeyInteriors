import React from 'react';
import { motion } from 'framer-motion';
import SignatureAnimation from './SignatureAnimation';

const SignatureDrawing = ({ onComplete }) => {
  return (
    <motion.div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#F4F2EE] pointer-events-none px-4 md:px-8"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className="w-full md:w-auto max-w-full md:max-w-3xl lg:max-w-4xl aspect-[3/1] flex items-center justify-center">
        <SignatureAnimation 
          onComplete={onComplete} 
          color="#1B1B1B" 
          strokeWidth={3}
          className="w-full h-full" 
        />
      </div>
    </motion.div>
  );
};

export default SignatureDrawing;