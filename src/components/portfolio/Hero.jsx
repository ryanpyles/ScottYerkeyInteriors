import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HERO_IMAGES as IMAGES } from '../../lib/supabase';

const INTERVAL_MS = 7500;

export default function Hero({ introComplete = true }) {
  const [current, setCurrent] = useState(0);

  const advance = useCallback(() => {
    setCurrent((p) => (p + 1) % IMAGES.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(advance, INTERVAL_MS);
    return () => clearInterval(timer);
  }, [advance]);

  return (
    <section className="relative h-screen overflow-hidden select-none">

      {/* ── Rotating background images with Ken-Burns ── */}
      <AnimatePresence initial={false}>
        <motion.div
          key={current}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2.0, ease: 'easeInOut' }}
        >
          <motion.img
            src={IMAGES[current].src}
            alt={IMAGES[current].alt}
            className="w-full h-full object-cover"
            initial={{ scale: 1.06 }}
            animate={{ scale: 1.0 }}
            transition={{ duration: 9, ease: [0.25, 0.1, 0.1, 1] }}
            onLoad={(e) => e.currentTarget.classList.add('loaded')}
          />
        </motion.div>
      </AnimatePresence>

      {/* ── Overlays ── */}
      <div className="absolute inset-0 bg-charcoal/25 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-2/5 bg-gradient-to-t from-charcoal/35 to-transparent pointer-events-none" />

      {/* ── Centre content — waits for intro to complete ── */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <motion.div
          className="flex flex-col items-center gap-7"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: introComplete ? 1 : 0, y: introComplete ? 0 : 24 }}
          transition={{ duration: 1.6, delay: introComplete ? 0.35 : 0, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="w-14 h-px bg-ivory/50" />

          <h1 className="font-sans font-bold text-ivory uppercase leading-[0.88] tracking-[0.18em]
                         text-[10vw] sm:text-[7.5vw] md:text-[6.5vw] lg:text-[5.8vw] xl:text-[5.2vw]">
            Scott Arthur<br />Yerkey
          </h1>

          <p className="label-caps text-[8px] tracking-[0.45em] text-ivory/65 mt-1">
            Interior Architecture &amp; Design
          </p>

          <div className="w-14 h-px bg-ivory/50 mt-1" />

          <p className="font-serif font-light text-ivory/80 text-[1rem] sm:text-[1.1rem] lg:text-[1.2rem] leading-[1.6] max-w-sm sm:max-w-md text-center mt-2 italic">
            For those who understand that the finest spaces are not decorated, but composed.
          </p>

          <p className="label-caps text-[7px] tracking-[0.32em] text-ivory/45 mt-1">
            Composed, enduring luxury residences in Chicago, New York, and select destinations
          </p>
        </motion.div>
      </div>

      {/* ── Slide indicators ── */}
      <motion.div
        className="absolute bottom-9 left-1/2 -translate-x-1/2 flex gap-4 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: introComplete ? 1 : 0 }}
        transition={{ duration: 1, delay: introComplete ? 0.7 : 0 }}
      >
        {IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Image ${i + 1}`}
            className={`min-h-[44px] flex items-center px-1 transition-all duration-700`}
          >
            <span className={`block h-px transition-all duration-700 ${
              i === current ? 'w-10 bg-ivory' : 'w-4 bg-ivory/35'
            }`} />
          </button>
        ))}
      </motion.div>

      {/* ── Scroll cue ── */}
      <motion.div
        className="hidden sm:flex absolute bottom-8 right-10 lg:right-14 z-10 flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: introComplete ? 1 : 0 }}
        transition={{ duration: 1, delay: introComplete ? 1.0 : 0 }}
      >
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2"
        >
          <p className="label-caps-sm text-ivory/45">Scroll</p>
          <div className="w-px h-7 bg-ivory/30" />
        </motion.div>
      </motion.div>

    </section>
  );
}
