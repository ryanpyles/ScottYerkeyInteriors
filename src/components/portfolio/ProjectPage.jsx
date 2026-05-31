import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PROJECTS } from '../../lib/supabase';
import Navigation from './Navigation';
import Footer from './Footer';
import { VP } from './utils';

export default function ProjectPage() {
  const { slug } = useParams();
  const project = PROJECTS.find((p) => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) {
    return (
      <div className="bg-ivory min-h-screen">
        <Navigation introComplete />
        <div className="editorial-container pt-32 lg:pt-48 pb-32 flex flex-col items-start gap-8">
          <p className="label-caps text-warm-gray/50 tracking-[0.36em] text-[8px]">404</p>
          <h1 className="font-serif font-light text-charcoal text-5xl md:text-6xl">
            Project not found.
          </h1>
          <Link
            to="/#residences"
            className="label-caps text-[8px] tracking-[0.32em] text-charcoal/50 hover:text-bronze transition-colors duration-400 flex items-center gap-4 min-h-[44px]"
          >
            <span className="block h-px w-8 bg-charcoal/40" />
            Selected Residences
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  // Related: 3 other projects (skip current)
  const related = PROJECTS.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <div className="bg-ivory text-charcoal overflow-x-clip">
      <Navigation introComplete />

      {/* ── Full-screen hero ── */}
      <div className="relative h-screen overflow-hidden">
        <motion.img
          src={project.cover}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ scale: 1.04 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.8, ease: [0.25, 0.1, 0.1, 1] }}
          onLoad={(e) => e.currentTarget.classList.add('loaded')}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-charcoal/30 pointer-events-none" />

        {/* Title overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <motion.div
            className="flex flex-col items-center gap-5"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <h1 className="font-serif font-light text-ivory leading-[0.95]
                           text-[9vw] sm:text-[7vw] md:text-[5.5vw] lg:text-[4.5vw] xl:text-[4vw]
                           max-w-3xl">
              {project.title}
            </h1>
            <p className="label-caps text-ivory/60 tracking-[0.38em] text-[8px] mt-2">
              {project.location} &ensp;&mdash;&ensp; {project.year}
            </p>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          className="absolute bottom-8 right-10 lg:right-14 z-10 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
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
      </div>

      {/* ── Editorial body ── */}
      <div className="editorial-container py-24 lg:py-36">

        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VP()}
          transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-20"
        >
          <Link
            to="/#residences"
            className="label-caps text-[8px] tracking-[0.34em] text-warm-gray/60 hover:text-bronze
                       transition-colors duration-400 flex items-center gap-4 w-fit min-h-[44px]"
          >
            <span className="block h-px w-6 bg-warm-gray/40" />
            Selected Residences
          </Link>
        </motion.div>

        {/* Two-column header */}
        <motion.div
          className="grid lg:grid-cols-2 gap-16 lg:gap-24 mb-20"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VP()}
          transition={{ duration: 1.1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Left: meta */}
          <div className="flex flex-col gap-6">
            <h2 className="font-serif font-light text-charcoal leading-[0.95]
                           text-4xl md:text-5xl lg:text-6xl">
              {project.title}
            </h2>
            <div className="flex flex-col gap-2 mt-2">
              <p className="label-caps text-[8px] tracking-[0.34em] text-warm-gray/50">
                {project.location}
              </p>
              <p className="label-caps text-[8px] tracking-[0.34em] text-warm-gray/50">
                {project.year}
              </p>
              <p className="label-caps text-[8px] tracking-[0.34em] text-warm-gray/50">
                {project.category}
              </p>
            </div>
          </div>

          {/* Right: description */}
          <div className="flex flex-col justify-center">
            <p className="font-sans font-light text-warm-gray leading-[1.9] text-[13px] md:text-[14px]">
              {project.description}
            </p>
          </div>
        </motion.div>

        {/* Bronze rule */}
        <div className="w-full h-px bg-bronze/30 mb-20" />

        {/* Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
          {project.gallery.map((src, i) => (
            <div key={i} className="overflow-hidden bg-limestone/20">
              <img
                src={src}
                alt={`${project.title} — ${i + 1}`}
                className="w-full h-auto block"
                onLoad={(e) => e.currentTarget.classList.add('loaded')}
              />
            </div>
          ))}
        </div>

        {/* Bronze rule */}
        <div className="w-full h-px bg-limestone mt-20 mb-20" />

        {/* Related projects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VP()}
          transition={{ duration: 1.0, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <p className="label-caps text-[8px] tracking-[0.36em] text-warm-gray/40 mb-12">
            More Residences
          </p>
          <div className="flex flex-col gap-8">
            {related.map((r) => (
              <Link
                key={r.slug}
                to={`/projects/${r.slug}`}
                className="group flex items-baseline justify-between border-b border-limestone pb-8 min-h-[44px]
                           hover:border-taupe transition-colors duration-500"
              >
                <div className="flex flex-col gap-1">
                  <span className="font-serif font-light text-charcoal text-2xl md:text-3xl
                                   group-hover:text-bronze transition-colors duration-400">
                    {r.title}
                  </span>
                  <span className="label-caps text-[8px] tracking-[0.3em] text-warm-gray/45">
                    {r.location}
                  </span>
                </div>
                <span className="label-caps text-[8px] tracking-[0.28em] text-warm-gray/35 shrink-0 ml-8">
                  {r.year}
                </span>
              </Link>
            ))}
          </div>
        </motion.div>

      </div>

      <Footer />
    </div>
  );
}
