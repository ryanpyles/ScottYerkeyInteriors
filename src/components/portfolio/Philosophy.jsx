import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { VP } from './utils';
import { PHILOSOPHY_IMAGE } from '../../lib/supabase';

const STATS = [
  { number: '24+', label: 'Years' },
  { number: '140',  label: 'Commissions' },
  { number: '11',   label: 'States' },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: VP(),
  transition: { duration: 1.1, delay, ease: [0.25, 0.1, 0.25, 1] },
});

export default function Philosophy() {
  const ref = useRef(null);

  return (
    <section ref={ref} className="py-20 lg:py-52 editorial-container">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-28 xl:gap-40 items-start">

        {/* ── Left: Image ── */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={VP()}
          transition={{ duration: 1.3, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="aspect-[3/4] overflow-hidden">
            <motion.img
              src={PHILOSOPHY_IMAGE}
              alt="Architectural interior detail"
              className="w-full h-full object-cover"
              loading="lazy"
              onLoad={(e) => e.currentTarget.classList.add('loaded')}
              initial={{ scale: 1.04 }}
              whileInView={{ scale: 1 }}
              viewport={VP()}
              transition={{ duration: 1.6, ease: [0.25, 0.1, 0.25, 1] }}
            />
          </div>

          {/* Location caption */}
          <p className="hidden sm:block absolute -bottom-5 right-0 label-caps-sm text-warm-gray/60 tracking-[0.28em]">
            Chicago &mdash; New York &mdash; London
          </p>
        </motion.div>

        {/* ── Right: Editorial text ── */}
        <div className="flex flex-col justify-center pt-2 lg:pt-20">

          {/* Section label */}
          <motion.div className="flex items-center gap-5 mb-8 lg:mb-14" {...fadeUp(0.1)}>
            <span className="w-7 h-px bg-bronze shrink-0" />
            <span className="label-caps text-bronze tracking-[0.36em]">Philosophy</span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            className="font-serif font-light text-charcoal leading-[1.05] mb-8 lg:mb-14
                       text-3xl md:text-5xl lg:text-[3.4rem] xl:text-[3.8rem]"
            {...fadeUp(0.2)}
          >
            Architecture begins<br />
            <em>with attention.</em>
          </motion.h2>

          {/* Body */}
          <motion.div
            className="space-y-7 text-warm-gray font-sans font-light text-[14px] lg:text-[15px] leading-[1.85]"
            {...fadeUp(0.3)}
          >
            <p>
              Scott Arthur Yerkey approaches each commission as a conversation between space, light, and
              material — a negotiation between what a room is and what it might become. His work emerges
              from a belief that truly considered interiors do not announce themselves, but reveal themselves
              slowly, through the accumulated weight of deliberate decisions.
            </p>
            <p>
              Trained in architecture before turning to interior design, Yerkey brings a structural
              sensibility to every project. Rooms are not decorated; they are composed. Proportions are
              studied, materials are selected for their relationship to both light and time, and every
              detail is considered against the whole.
            </p>
            <p>
              The result is a body of work that prizes permanence over trend, and character over novelty.
              Spaces that feel as though they have always existed exactly as they are — and always will.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="mt-10 lg:mt-16 pt-8 lg:pt-10 border-t border-limestone"
            {...fadeUp(0.4)}
          >
            <div className="grid grid-cols-3 gap-8">
              {STATS.map((s) => (
                <div key={s.label} className="flex flex-col gap-1.5">
                  <span className="font-serif font-light text-charcoal text-3xl lg:text-5xl">{s.number}</span>
                  <span className="label-caps-sm text-warm-gray/70 tracking-[0.3em]">{s.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
