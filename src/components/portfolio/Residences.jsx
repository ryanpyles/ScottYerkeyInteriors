import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { VP } from './utils';
import { PROJECTS as ALL_PROJECTS } from '../../lib/supabase';

const PROJECTS = ALL_PROJECTS.map((p) => ({ ...p, image: p.cover }));

export default function Residences() {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section>

      {/* Section label */}
      <div className="editorial-container pt-32 pb-0">
        <motion.div
          className="flex items-center gap-5"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VP('-60px')}
          transition={{ duration: 1.0, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <span className="w-7 h-px bg-bronze shrink-0" />
          <span className="label-caps text-bronze tracking-[0.36em]">Selected Residences</span>
        </motion.div>
      </div>

      {/* Split viewport */}
      <div className="flex border-t border-limestone mt-16">

        {/* Left: parallax project entries */}
        <div className="w-full lg:w-1/2">
          {PROJECTS.map((project, i) => (
            <ProjectEntry
              key={project.id}
              project={project}
              onVisible={() => setActiveIdx(i)}
            />
          ))}
        </div>

        {/* Right: sticky cover photo filling exactly half the viewport */}
        <div className="hidden lg:block lg:w-1/2 sticky top-0 h-screen self-start overflow-hidden">
          <AnimatePresence mode="sync">
            <motion.div
              key={activeIdx}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.035 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.3, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <img
                src={PROJECTS[activeIdx].image}
                alt={PROJECTS[activeIdx].title}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
                onLoad={(e) => e.currentTarget.classList.add('loaded')}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-ivory/8 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-10 right-10 select-none pointer-events-none">
                <span className="font-serif font-light text-ivory/18 text-[9rem] leading-none">
                  {PROJECTS[activeIdx].id}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}

function ProjectEntry({ project, onVisible }) {
  const ref = useRef(null);

  // Parallax: content floats upward through its section as you scroll
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['10%', '-10%']);

  // Image-swap trigger
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) onVisible(); },
      { threshold: 0.28 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [onVisible]);

  return (
    <div
      ref={ref}
      className="relative min-h-[120vh] lg:min-h-[145vh] flex items-center border-b border-limestone/40"
    >

      {/* Mobile: stacked photo */}
      <div className="lg:hidden absolute top-0 inset-x-0 h-[48vw] overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          loading="lazy"
          onLoad={(e) => e.currentTarget.classList.add('loaded')}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-ivory" />
      </div>

      {/* Parallax text */}
      <motion.div
        style={{ y }}
        className="relative z-10 w-full px-8 md:px-14 lg:px-16 xl:px-24 pt-[52vw] lg:pt-0"
      >

        {/* Location label */}
        <p className="label-caps text-warm-gray/40 tracking-[0.36em] text-[8px] mb-10">
          {project.location}
        </p>

        {/* Project title */}
        <h3 className="font-serif font-light text-charcoal leading-[0.96]
                       max-w-xs
                       text-[2.6rem] md:text-[3rem] lg:text-[3.4rem] xl:text-[4rem] mb-10">
          {project.title}
        </h3>

        {/* Bronze rule */}
        <div className="w-8 h-px bg-bronze mb-10" />

        {/* Description */}
        <p className="font-sans font-light text-charcoal/50
                      text-[11px] leading-[1.8] tracking-[0.04em]
                      max-w-[260px] lg:max-w-[200px] mb-16">
          {project.description}
        </p>

        {/* CTA */}
        <Link
          to={`/projects/${project.slug}`}
          aria-label={`View project: ${project.title}`}
          className="flex items-center gap-4 cursor-pointer group w-fit min-h-[44px]"
        >
          <span className="label-caps text-[8px] tracking-[0.32em] text-charcoal/50
                           group-hover:text-bronze transition-colors duration-400">
            View Project
          </span>
          <span className="block h-px w-8 bg-charcoal/40
                           group-hover:bg-bronze group-hover:w-14
                           transition-all duration-500 ease-refined" />
        </Link>

      </motion.div>
    </div>
  );
}
