import { motion } from 'framer-motion';
import { VP } from './utils';

const PHASES = [
  {
    number: 'I',
    phase: 'Discovery',
    subtitle: 'Listening architecture',
    description:
      'Every engagement begins with sustained observation. We study how light moves through a space across seasons, how a family inhabits their rooms, what silences they keep. Priorities emerge not through what a client says they want, but through what we observe them living.',
  },
  {
    number: 'II',
    phase: 'Development',
    subtitle: 'The language of materials',
    description:
      'Material selection is not decoration — it is the construction of a sensory language unique to each project. We work with a considered palette of natural materials, each chosen for its relationship to light, to touch, and to the passage of time. Drawings are refined until every proportion resolves.',
  },
  {
    number: 'III',
    phase: 'Execution',
    subtitle: 'Precision without compromise',
    description:
      'The distance between concept and completion is where craft lives. We maintain close collaboration with master craftspeople and specialist artisans throughout every phase of construction, ensuring that the intelligence of the design is preserved in every detail, however small.',
  },
];

export default function Approach() {
  return (
    <section className="py-20 lg:py-52 editorial-container">

      {/* ── Header ── */}
      <motion.div
        className="mb-12 lg:mb-32"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1.1, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="flex items-center gap-5 mb-8 lg:mb-12">
          <span className="w-7 h-px bg-bronze shrink-0" />
          <span className="label-caps text-bronze tracking-[0.36em]">Process</span>
        </div>
        <h2 className="font-serif font-light text-charcoal leading-[1.0]
                       text-4xl md:text-6xl lg:text-7xl xl:text-8xl">
          How we<br /><em>work.</em>
        </h2>
      </motion.div>

      {/* ── Phase columns ── */}
      <div className="grid lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-limestone">
        {PHASES.map((phase, i) => (
          <motion.div
            key={phase.phase}
            className="py-10 lg:py-0 lg:px-14 first:lg:pl-0 last:lg:pr-0"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP()}
            transition={{ duration: 1.0, delay: i * 0.18, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="flex flex-col gap-8">

              {/* Roman numeral */}
              <span className="font-serif font-light text-limestone text-[3.5rem] lg:text-[5rem] leading-none select-none">
                {phase.number}
              </span>

              {/* Phase name */}
              <div className="flex flex-col gap-2">
                <h3 className="font-serif font-light text-charcoal text-2xl lg:text-3xl">
                  {phase.phase}
                </h3>
                <p className="label-caps-sm text-warm-gray/70 tracking-[0.3em]">{phase.subtitle}</p>
              </div>

              <div className="w-7 h-px bg-bronze" />

              {/* Body */}
              <p className="font-sans font-light text-[13px] lg:text-[14px] text-warm-gray leading-[1.9]">
                {phase.description}
              </p>

            </div>
          </motion.div>
        ))}
      </div>

    </section>
  );
}
