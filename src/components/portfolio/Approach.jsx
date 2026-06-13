import { motion } from 'framer-motion';
import { VP } from './utils';

const PHASES = [
  {
    number: 'I',
    phase: 'Understanding the Residence',
    subtitle: 'Listening before designing',
    description:
      'We begin by reading the building: its proportions, its light, its relationship to how you move through it. We study what the architecture demands and what your life requires. The work of this phase is observation — not proposal. We do not present schemes until we understand the residence completely.',
  },
  {
    number: 'II',
    phase: 'Composing the Interior Architecture',
    subtitle: 'One drawing set. Every decision resolved.',
    description:
      'Interior plans, millwork elevations, ceiling conditions, finish specifications, and furniture layouts are developed simultaneously, as parts of a single composition. Nothing is left to be figured out on-site. This integrated documentation is what allows a contractor, a craftsman, and a fabricator to build the same room.',
  },
  {
    number: 'III',
    phase: 'Realization and Continuity',
    subtitle: 'Fidelity through completion',
    description:
      'We remain present through construction, installation, and the close of the project. Our involvement is not supervisory in the administrative sense — it is creative continuity. We are there to ensure that the room built is the room designed, and that every decision made in the field reflects the original composition.',
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
        <p className="mt-6 font-sans font-light text-[14px] lg:text-[15px] text-warm-gray leading-[1.85] max-w-md">
          Three phases. One continuous thought.
        </p>
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

              <span className="font-serif font-light text-limestone text-[3.5rem] lg:text-[5rem] leading-none select-none">
                {phase.number}
              </span>

              <div className="flex flex-col gap-2">
                <h3 className="font-serif font-light text-charcoal text-2xl lg:text-3xl">
                  {phase.phase}
                </h3>
                <p className="label-caps-sm text-warm-gray/70 tracking-[0.3em]">{phase.subtitle}</p>
              </div>

              <div className="w-7 h-px bg-bronze" />

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
