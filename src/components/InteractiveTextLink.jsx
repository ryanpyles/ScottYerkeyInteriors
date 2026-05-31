import React from 'react';
import { motion } from 'framer-motion';

const InteractiveTextLink = ({
  children,
  href,
  onClick,
  className = '',
  glow = false
}) => {
  const content = (
    <motion.span
      className={`relative inline-block cursor-pointer group ${className}`}
      whileHover={glow ? { textShadow: '0px 0px 8px rgba(140,122,90,0.6)' } : {}}
      transition={{ duration: 0.3 }}
    >
      {children}
      <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-current transition-all duration-300 ease-out group-hover:w-full" />
    </motion.span>
  );

  if (href) {
    return (
      <a href={href} onClick={onClick} className="outline-none">
        {content}
      </a>
    );
  }

  return (
    <button onClick={onClick} className="outline-none focus-visible:ring-2 focus-visible:ring-[#8C7A5A] rounded-sm">
      {content}
    </button>
  );
};

export default InteractiveTextLink;