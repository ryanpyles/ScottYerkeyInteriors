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

        {/* Left: project entries */}
        <div className="w-full lg:w-1/2">
          {PROJECTS.map((project, i) => (
            <ProjectEntry
              key={project.id}
              project={project}
              onVisible={() => setActiveIdx(i)}
            />
          ))}
        </div>

        {/* Right: sticky cover photo — desktop only */}
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
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    setIsDesktop(mq.matches);
    const handler = (e) => setIsDesktop(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Desktop parallax
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['10%', '-10%']);

  // Image-swap trigger (desktop right panel)
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
    <div ref={ref} className="relative border-b border-limestone/40">

      {/* ── MOBILE: full-viewport sticky image ──────────────────────────── */}
      <div className="lg:hidden sticky top-0 h-screen overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
          onLoad={(e) => e.currentTarget.classList.add('loaded')}
        />
        {/* Strong gradient so text is always legible regardless of image brightness */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(to top, rgba(28,28,26,0.97) 0%, rgba(28,28,26,0.82) 30%, rgba(28,28,26,0.35) 60%, transparent 100%)' }}
        />
      </div>

      {/* ── MOBILE: text scrolls up naturally over the stuck image ───────── */}
      <div className="lg:hidden relative z-20 px-8 pt-12 pb-28">
        <motion.p
          className="label-caps text-ivory/60 tracking-[0.36em] text-[8px] mb-10"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay: 0 }}
        >
          {project.location}
        </motion.p>
        <motion.h3
          className="font-serif font-light text-ivory leading-[0.96] text-[2.6rem] mb-10"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
        >
          {project.title}
        </motion.h3>
        <motion.div
          className="w-8 h-px bg-bronze mb-10"
          initial={{ scaleX: 0, originX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.25 }}
        />
        <motion.p
          className="font-sans font-light text-ivory/80 text-[14px] leading-[1.85] tracking-[0.03em] max-w-[300px] mb-16"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.45 }}
        >
          {project.description}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay: 0.6 }}
        >
          <Link
            to={`/projects/${project.slug}`}
            aria-label={`View project: ${project.title}`}
            className="flex items-center gap-4 cursor-pointer group w-fit min-h-[44px]"
          >
            <span className="label-caps text-[8px] tracking-[0.32em] text-ivory/70 group-hover:text-bronze transition-colors duration-400">
              View Project
            </span>
            <span className="block h-px w-8 bg-ivory/50 group-hover:bg-bronze group-hover:w-14 transition-all duration-500 ease-refined" />
          </Link>
        </motion.div>
      </div>

      {/* ── DESKTOP: parallax text, right panel swaps cover image ─────────── */}
      <motion.div
        style={{ y: isDesktop ? y : undefined }}
        className="hidden lg:flex items-center min-h-[145vh] w-full px-16 xl:px-24"
      >
        <div>
          <p className="label-caps text-warm-gray/40 tracking-[0.36em] text-[8px] mb-10">
            {project.location}
          </p>
          <h3 className="font-serif font-light text-charcoal leading-[0.96]
                         max-w-xs text-[3.4rem] xl:text-[4rem] mb-10">
            {project.title}
          </h3>
          <div className="w-8 h-px bg-bronze mb-10" />
          <p className="font-sans font-light text-charcoal/50 text-[11px] leading-[1.8]
                        tracking-[0.04em] max-w-[200px] mb-16">
            {project.description}
          </p>
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
        </div>
      </motion.div>

    </div>
  );
}
