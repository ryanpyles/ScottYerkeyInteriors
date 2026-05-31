
import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-background border-t border-border/30 py-8 md:py-12 px-6 md:px-12 lg:px-24">
      <div className="max-w-[1800px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-sans text-[12px] md:text-sm text-muted-foreground tracking-widest uppercase">
          © {currentYear} Scott Arthur Yerkey Interiors. All rights reserved.
        </p>
        <p className="font-sans text-[12px] md:text-sm text-muted-foreground tracking-widest uppercase">
          Site by{' '}
          <a 
            href="https://www.formaetrix.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-foreground hover:text-muted-foreground transition-colors duration-300"
          >
            FORMÆTRIX
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
