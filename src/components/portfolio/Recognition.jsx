import { motion } from 'framer-motion';
import { VP } from './utils';

const ENTRIES = [
  {
    year: '2007',
    title: 'ADEX Platinum Award',
    detail: 'Ringstad Zen Coffee Table — highest honor awarded by the Design Journal',
    org: 'Design Journal / ADEX',
  },
  {
    year: '2024',
    title: 'ADEX Award Nominee',
    detail: 'Santorini Console Table',
    org: 'Design Journal / ADEX',
  },
  {
    year: '2024',
    title: 'The Comfort Factor',
    detail: 'Featured residence — Rancho Mirage, California',
    org: 'Palm Springs Life',
  },
  {
    year: 'Ongoing',
    title: 'Featured Studio',
    detail: 'Award-winning interior architecture and design practice',
    org: 'StyleChicago.com',
  },
];

export default function Recognition() {
  return (
    <section className="py-20 lg:py-48 editorial-container">

      {/* ── Header ── */}
      <motion.div
        className="mb-12 lg:mb-36"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1.1, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="flex items-center gap-5 mb-8 lg:mb-12">
          <span className="w-7 h-px bg-bronze shrink-0" />
          <span className="label-caps text-bronze tracking-[0.36em]">Recognition</span>
        </div>
        <h2 className="font-serif font-light text-charcoal leading-[1.0]
                       text-4xl md:text-6xl lg:text-7xl xl:text-8xl max-w-xl">
          Independent<br />
          <em>recognition of the work.</em>
        </h2>
        <p className="mt-8 font-sans font-light text-[14px] lg:text-[15px] text-warm-gray leading-[1.85] max-w-md">
          The studio's projects have been recognized by the American Society of Interior Designers
          and published in regional and national design media.
        </p>
      </motion.div>

      {/* ── Vertical list ── */}
      <ul className="flex flex-col">
        {ENTRIES.map((entry, i) => (
          <motion.li
            key={entry.title}
            className="flex flex-col gap-3 py-10 lg:py-14 border-t border-limestone/60 last:border-b"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP()}
            transition={{ duration: 1.0, delay: i * 0.07, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <p className="label-caps text-[7px] tracking-[0.38em] text-warm-gray/40">
              {entry.org}
            </p>
            <h3 className="font-serif font-light italic text-charcoal
                           text-2xl md:text-3xl lg:text-4xl leading-tight">
              {entry.title}
            </h3>
            <div className="flex flex-wrap items-baseline gap-x-8 gap-y-1">
              <p className="font-sans font-light text-[12px] tracking-[0.04em] text-charcoal/45">
                {entry.detail}
              </p>
              <span className="label-caps text-[8px] tracking-[0.28em] text-warm-gray/35 shrink-0">
                {entry.year}
              </span>
            </div>
          </motion.li>
        ))}
      </ul>

    </section>
  );
}
