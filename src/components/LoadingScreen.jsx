
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

const LoadingScreen = ({ isLoading }) => {
  const { actualTheme } = useTheme();
  const [isVisible, setIsVisible] = useState(isLoading);
  
  const lightLogoUrl = "https://ttqxhrxrkewmyyiqaafn.supabase.co/storage/v1/object/public/logo/Write.cv.svg";
  const darkLogoUrl = "https://ttqxhrxrkewmyyiqaafn.supabase.co/storage/v1/object/public/logo/Write.cv-3.svg";
  
  const logoUrl = actualTheme === 'dark' ? darkLogoUrl : lightLogoUrl;

  useEffect(() => {
    if (isLoading) {
      setIsVisible(true);
      // Ensure the component stays visible for exactly 8000ms before triggering fade out
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 8000);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [isLoading]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="loading-overlay"
          aria-hidden="true"
        >
          <motion.img
            src={logoUrl}
            alt="Loading..."
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              scale: [0.98, 1.02, 0.98] 
            }}
            transition={{ 
              opacity: { duration: 1.5, ease: "easeOut" },
              scale: { 
                duration: 7.5, 
                ease: "easeInOut",
              }
            }}
            className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 object-contain drop-shadow-sm"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
