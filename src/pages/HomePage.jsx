
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const HomePage = () => {
  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <div className="bg-background min-h-screen flex flex-col transition-colors duration-300">
      <Helmet>
        <title>Scott Arthur Yerkey Interiors</title>
        <meta name="description" content="Refined residential interiors balancing restraint, warmth, and architectural clarity." />
      </Helmet>

      <Header />

      <main className="flex-grow flex flex-col relative">
        {/* Editorial Hero Section */}
        <section className="min-h-[100vh] flex flex-col items-center justify-center text-center px-6 pt-24 pb-12 relative">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="max-w-5xl mx-auto flex flex-col items-center"
          >
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-foreground leading-[1.1] mb-8 md:mb-12 tracking-tight">
              Scott Arthur<br />Yerkey Interiors
            </h1>
            <p className="font-sans text-sm md:text-base lg:text-lg text-muted-foreground uppercase tracking-[0.25em] leading-relaxed max-w-2xl">
              Refined residential interiors balancing restraint, warmth, and architectural clarity.
            </p>
          </motion.div>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            onClick={scrollToNext}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-foreground transition-colors duration-500 flex flex-col items-center gap-4 group"
            aria-label="Scroll down"
          >
            <span className="font-sans text-[10px] uppercase tracking-[0.3em]">Explore</span>
            <ArrowDown className="w-4 h-4 group-hover:translate-y-2 transition-transform duration-500 ease-out" />
          </motion.button>
        </section>

        {/* Minimal Introduction Section */}
        <section className="min-h-[80vh] flex items-center justify-center px-6 md:px-12 lg:px-24 editorial-spacing bg-secondary/30 transition-colors duration-300">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-tight mb-8 text-foreground">
              We create spaces of enduring elegance, rooted in classical proportions and tailored for modern living.
            </h2>
            <div className="w-px h-16 bg-border mx-auto mb-8"></div>
            <a 
              href="/projects" 
              className="inline-block font-sans text-xs uppercase tracking-[0.2em] text-foreground hover:text-muted-foreground transition-colors border-b border-foreground pb-1 hover:border-muted-foreground"
            >
              View Selected Works
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
