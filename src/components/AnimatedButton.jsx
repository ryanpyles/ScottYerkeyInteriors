import React from 'react';
import { motion } from 'framer-motion';

const AnimatedButton = ({
  children,
  onClick,
  type = "button",
  className = "",
  disabled = false,
  variant = "primary" // primary, outline, ghost
}) => {
  const baseClasses = "relative overflow-hidden font-sans font-medium tracking-wider transition-colors duration-300 rounded-sm focus-visible:ring-4 focus-visible:ring-offset-2 outline-none shadow-md flex items-center justify-center";
  
  const variants = {
    primary: "bg-[#8C7A5A] text-white hover:bg-[#7A6A4E] focus-visible:ring-[#8C7A5A]",
    outline: "border-2 border-[#8C7A5A] text-[#8C7A5A] hover:bg-[#8C7A5A] hover:text-white focus-visible:ring-[#8C7A5A]",
    ghost: "bg-transparent text-[#1B1B1B] hover:bg-[#1B1B1B]/5 focus-visible:ring-[#1B1B1B]/20 shadow-none"
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      transition={{ duration: 0.2 }}
    >
      {/* Ripple/Glow effect wrapper */}
      <motion.span 
        className="absolute inset-0 bg-white/20 opacity-0 rounded-sm pointer-events-none"
        whileTap={!disabled ? { opacity: [0, 1, 0], scale: [0.8, 1.2] } : {}}
        transition={{ duration: 0.4 }}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};

export default AnimatedButton;