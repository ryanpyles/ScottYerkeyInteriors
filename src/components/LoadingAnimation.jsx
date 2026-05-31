
import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

const LoadingAnimation = ({ className = "w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48" }) => {
  const { actualTheme } = useTheme();

  const lightLogoUrl = "https://ttqxhrxrkewmyyiqaafn.supabase.co/storage/v1/object/public/logo/Write.cv.svg";
  const darkLogoUrl = "https://ttqxhrxrkewmyyiqaafn.supabase.co/storage/v1/object/public/logo/Write.cv-3.svg";
  
  const logoUrl = actualTheme === 'dark' ? darkLogoUrl : lightLogoUrl;

  return (
    <div className={`flex items-center justify-center min-h-screen bg-background transition-colors duration-300 ${className}`}>
      <motion.img
        src={logoUrl}
        alt="Loading..."
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ 
          opacity: 1, 
          scale: 1,
          rotate: [0, 2, -2, 0]
        }}
        transition={{ 
          opacity: { duration: 1.5, ease: "easeInOut" },
          scale: { duration: 1.5, ease: "easeOut" },
          rotate: { 
            duration: 7.5, // Completes right before the 8 second mark
            ease: "easeInOut",
          }
        }}
        className="w-full h-full object-contain drop-shadow-md"
      />
    </div>
  );
};

export default LoadingAnimation;
