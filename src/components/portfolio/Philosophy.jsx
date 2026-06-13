import { useRef } from 'react';
import { motion } from 'framer-motion';
import { VP } from './utils';
import { PHILOSOPHY_IMAGE } from '../../lib/supabase';

const STATS = [
  { number: '24+',  label: 'Years in Practice' },
  { number: '140+', label: 'Residential Commissions' },
  { number: '11',   label: 'U.S. States & Beyond' },
];

const SERVICES = [
  {
    title: 'Interior Architecture',
    body: 'Space planning, interior architectural documentation, section drawings, reflected ceiling plans, and consultant coordination — the work that precedes and governs every other decision.',
  },
  {
    title: 'Interior Design',
    body: 'Complete resolution of the interior: furniture layout, finish selection, lighting design, material specification, and art placement — developed as part of the same drawing set as the architectural work.',
  },
  {
    title: 'Custom Millwork & Cabinetry',
    body: 'Design and documentation of built-in cabinetry, paneling, architectural woodwork, and kitchen and bath millwork, fabricated by selected craft partners.',
  },
  {
    title: 'Finish & Material Development',
    body: 'Stone, tile, plaster, wood, textile, and hardware specification. Sources drawn from European and American artisan suppliers; every material selected for its relationship to the architecture.',
  },
  {
    title: 'Construction Continuity',
    body: 'Active design presence through construction and installation, ensuring the built result reflects the documented design with fidelity to the original composition.',
  },
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
    <section ref={ref} className="py-20 lg:py-52">

      {/* ── Part 1: Positioning + Image ── */}
      <div className="editorial-container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-28 xl:gap-40 items-start">

          {/* Left: Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={VP()}
            transition={{ duration: 1.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="aspect-[3/4] overflow-hidden bg-limestone/20">
              <motion.img
                src={PHILOSOPHY_IMAGE}
                alt="Composed interior architecture detail"
                className="w-full h-full object-cover"
                loading="lazy"
                onLoad={(e) => e.currentTarget.classList.add('loaded')}
                initial={{ scale: 1.04 }}
                whileInView={{ scale: 1 }}
                viewport={VP()}
                transition={{ duration: 1.6, ease: [0.25, 0.1, 0.25, 1] }}
              />
            </div>
            <p className="hidden sm:block absolute -bottom-5 right-0 label-caps-sm text-warm-gray/60 tracking-[0.28em]">
              Chicago &mdash; New York &mdash; Beyond
            </p>
          </motion.div>

          {/* Right: Studio positioning text */}
          <div className="flex flex-col justify-center pt-2 lg:pt-20">

            <motion.div className="flex items-center gap-5 mb-8 lg:mb-14" {...fadeUp(0.1)}>
              <span className="w-7 h-px bg-bronze shrink-0" />
              <span className="label-caps text-bronze tracking-[0.36em]">Studio</span>
            </motion.div>

            <motion.h2
              className="font-serif font-light text-charcoal leading-[1.05] mb-8 lg:mb-14
                         text-3xl md:text-5xl lg:text-[3.4rem] xl:text-[3.8rem]"
              {...fadeUp(0.2)}
            >
              Interior architecture.<br />
              <em>Not decoration.</em>
            </motion.h2>

            <motion.div
              className="space-y-6 text-warm-gray font-sans font-light text-[14px] lg:text-[15px] leading-[1.85]"
              {...fadeUp(0.3)}
            >
              <p>
                Most residential designers begin with furnishings and work inward. This studio begins
                with architecture — with plans, proportions, and the logic of the building itself —
                and resolves everything outward from there. Millwork, stone, textiles, and furniture
                are selected and detailed as part of a single drawing set, not sourced independently
                after the fact.
              </p>
              <p>
                The result is a home that reads as coherent. One where a door casing and a dining
                chair belong to the same thought.
              </p>
              <p>
                Over more than two decades of practice, our work as a Chicago interior architecture
                and design studio has focused on private residential commissions for clients who value
                quiet rigor over momentary display. The studio accepts a limited number of new
                projects each year.
              </p>
            </motion.div>

            {/* Studio biography */}
            <motion.div
              className="mt-10 lg:mt-14 pt-8 border-t border-limestone"
              {...fadeUp(0.4)}
            >
              <p className="font-sans font-light text-[13px] text-warm-gray/80 leading-[1.9] max-w-md">
                Scott Arthur Yerkey founded the studio after completing his training in interior
                architecture and design. For more than 24 years he has practiced a single discipline:
                the complete interior commission, resolved from drawings through installation, for
                clients who understand that a home of genuine quality must be designed as a unified
                whole — not assembled from parts.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="mt-10 lg:mt-14 pt-8 border-t border-limestone"
              {...fadeUp(0.5)}
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
      </div>

      {/* ── Part 2: Services ── */}
      <div className="editorial-container mt-24 lg:mt-48">

        <motion.div className="mb-12 lg:mb-20" {...fadeUp(0)}>
          <div className="flex items-center gap-5 mb-8">
            <span className="w-7 h-px bg-bronze shrink-0" />
            <span className="label-caps text-bronze tracking-[0.36em]">What We Do</span>
          </div>
          <h2 className="font-serif font-light text-charcoal leading-[1.05]
                         text-3xl md:text-5xl lg:text-[3.4rem] xl:text-[3.8rem] max-w-2xl">
            A complete interior commission,<br />
            <em>from first drawing to final installation.</em>
          </h2>
          <p className="mt-8 font-sans font-light text-[14px] lg:text-[15px] text-warm-gray leading-[1.85] max-w-xl">
            Every engagement is managed as a unified project — not a sequence of disconnected
            decisions. We do not offer partial-scope or procurement-only services.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 divide-y lg:divide-y-0 lg:divide-x divide-limestone/60">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.title}
              className="py-10 lg:py-0 lg:px-10 first:lg:pl-0 last:lg:pr-0 flex flex-col gap-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VP()}
              transition={{ duration: 1.0, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <span className="font-serif font-light text-limestone text-[2.5rem] leading-none select-none">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="w-5 h-px bg-bronze" />
              <h3 className="font-serif font-light text-charcoal text-lg lg:text-xl leading-[1.2]">
                {s.title}
              </h3>
              <p className="font-sans font-light text-[12px] lg:text-[13px] text-warm-gray leading-[1.9]">
                {s.body}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
