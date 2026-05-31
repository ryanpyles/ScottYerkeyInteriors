import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HERO_IMAGES } from '../../lib/supabase';

// Total SVG draw time: last delay (4.8s) + stroke duration (0.3s) = 5.1s
// We start revealing the hero at 5.4s (slight pause after pen lifts).
// Lifting begins at 7.0s, onComplete at 8.6s.

export default function IntroAnimation({ onComplete, navWordmarkRef }) {
  const [phase, setPhase] = useState('signing'); // signing → revealing → lifting
  const sigRef  = useRef(null);
  const [lift, setLift] = useState({ x: 0, y: 0, scale: 0.3 });

  useEffect(() => {
    // Skip intro entirely for users who prefer reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onComplete();
      return;
    }

    const timers = [
      setTimeout(() => setPhase('revealing'), 5400),

      setTimeout(() => {
        // Calculate the transform needed to glide to the nav signature
        if (sigRef.current) {
          const from = sigRef.current.getBoundingClientRect();
          const to   = navWordmarkRef?.current?.getBoundingClientRect() ?? {};

          // Fallback when nav button has no size (hidden at mobile breakpoint)
          const toCx = to.width  > 0 ? to.left + to.width  / 2 : window.innerWidth  / 2;
          const toCy = to.height > 0 ? to.top  + to.height / 2 : 32;
          const toW  = to.width  > 0 ? to.width                 : 100;

          setLift({
            x:     toCx - (from.left + from.width  / 2),
            y:     toCy - (from.top  + from.height / 2),
            scale: Math.min(toW / from.width, 0.35),
          });
        }
        setPhase('lifting');
      }, 7000),

      setTimeout(onComplete, 8600),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete, navWordmarkRef]);

  return (
    <motion.div
      className="fixed inset-0 z-[100]"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* ── 1. Dark backing — fades out as hero is revealed ── */}
      <motion.div
        className="absolute inset-0 bg-charcoal"
        animate={{ opacity: phase === 'signing' ? 1 : 0 }}
        transition={{ duration: 1.8, ease: 'easeInOut' }}
      />

      {/* ── 2. First hero image fades in behind signature ── */}
      <AnimatePresence>
        {phase !== 'signing' && (
          <motion.div
            key="hero-bg"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.6, ease: 'easeInOut' }}
          >
            <img
              src={HERO_IMAGES[0].src}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
            {/* Overlay to match the hero's own overlay */}
            <div className="absolute inset-0 bg-charcoal/30 pointer-events-none" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── 3. Signature — draws, then lifts to nav wordmark ── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.img
          ref={sigRef}
          src="/signature-white.svg"
          alt="Scott Arthur Yerkey"
          className="w-64 sm:w-72 md:w-80 relative z-10"
          animate={
            phase === 'lifting'
              ? { x: lift.x, y: lift.y, scale: lift.scale, opacity: 1 }
              : { x: 0, y: 0, scale: 1, opacity: 1 }
          }
          transition={{
            duration: 1.15,
            ease: [0.76, 0, 0.24, 1],
          }}
        />
      </div>
    </motion.div>
  );
}
