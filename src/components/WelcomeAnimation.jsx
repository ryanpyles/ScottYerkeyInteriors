
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import SignatureAnimation from "./SignatureAnimation";

const WelcomeAnimation = ({ phase, onDrawingComplete }) => {
  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#000000] pointer-events-none overflow-hidden"
          initial={{ opacity: 1 }}
          animate={{ opacity: phase === 'moving' ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {phase === 'drawing' && (
            <div className="w-full max-w-[90%] md:max-w-3xl lg:max-w-4xl aspect-[4/1] flex items-center justify-center px-4">
              <SignatureAnimation 
                layoutId="seamless-signature"
                onComplete={onDrawingComplete} 
                color="#FFFFFF" 
                strokeWidth={3.5}
                showGlow={true}
                className="w-full h-full"
              />
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeAnimation;
