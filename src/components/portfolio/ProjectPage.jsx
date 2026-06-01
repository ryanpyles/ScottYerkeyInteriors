import { useEffect, useState, useCallback, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS } from '../../lib/supabase';
import Navigation from './Navigation';
import Footer from './Footer';
import { VP } from './utils';

export default function ProjectPage() {
  const { slug } = useParams();
  const project = PROJECTS.find((p) => p.slug === slug);
  const [lightbox, setLightbox] = useState(null); // index into project.gallery

  const closeLightbox = useCallback(() => setLightbox(null), []);
  const prevImage = useCallback(() => setLightbox((i) => (i - 1 + project.gallery.length) % project.gallery.length), [project]);
  const nextImage = useCallback(() => setLightbox((i) => (i + 1) % project.gallery.length), [project]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Keyboard nav + body scroll lock for lightbox
  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e) => {
      if (e.key === 'Escape')      closeLightbox();
      if (e.key === 'ArrowRight')  nextImage();
      if (e.key === 'ArrowLeft')   prevImage();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [lightbox, closeLightbox, nextImage, prevImage]);

  // Touch swipe for lightbox
  const touchStartX = useRef(null);
  const onTouchStart = useCallback((e) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);
  const onTouchEnd = useCallback((e) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 48) { dx < 0 ? nextImage() : prevImage(); }
    touchStartX.current = null;
  }, [nextImage, prevImage]);

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

  // Truncate description to ~155 chars for meta
  const metaDesc = project.description.length > 155
    ? project.description.slice(0, 152) + '…'
    : project.description;

  const canonicalUrl = `https://scottarthuryerkey.com/projects/${project.slug}`;

  return (
    <div className="bg-ivory text-charcoal overflow-x-clip">
      <Helmet>
        <title>{project.title} — Scott Arthur Yerkey Interiors</title>
        <meta name="description" content={metaDesc} />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph */}
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Scott Arthur Yerkey Interiors" />
        <meta property="og:title" content={`${project.title} — Scott Arthur Yerkey Interiors`} />
        <meta property="og:description" content={metaDesc} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={project.cover} />
        <meta property="og:image:alt" content={`${project.title} by Scott Arthur Yerkey — ${project.location}`} />
        <meta property="og:locale" content="en_US" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${project.title} — Scott Arthur Yerkey Interiors`} />
        <meta name="twitter:description" content={metaDesc} />
        <meta name="twitter:image" content={project.cover} />
        <meta name="twitter:image:alt" content={`${project.title} by Scott Arthur Yerkey — ${project.location}`} />

        {/* BreadcrumbList structured data */}
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://scottarthuryerkey.com/" },
            { "@type": "ListItem", "position": 2, "name": "Selected Residences", "item": "https://scottarthuryerkey.com/#residences" },
            { "@type": "ListItem", "position": 3, "name": project.title, "item": canonicalUrl }
          ]
        })}</script>

        {/* VisualArtwork structured data */}
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "VisualArtwork",
          "name": project.title,
          "description": project.description,
          "locationCreated": { "@type": "Place", "name": project.location },
          "dateCreated": project.year,
          "artMedium": "Interior Architecture & Design",
          "artist": {
            "@type": "Person",
            "name": "Scott Arthur Yerkey",
            "url": "https://scottarthuryerkey.com"
          },
          "image": project.cover,
          "url": canonicalUrl
        })}</script>
      </Helmet>

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
      <div className="editorial-container py-16 lg:py-36">

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
            <button
              key={i}
              onClick={() => setLightbox(i)}
              className="overflow-hidden bg-limestone/20 block w-full text-left group cursor-zoom-in"
              aria-label={`View image ${i + 1}`}
            >
              <img
                src={src}
                alt={`${project.title} — ${i + 1}`}
                className="w-full h-auto block transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-[1.03]"
                onLoad={(e) => e.currentTarget.classList.add('loaded')}
              />
            </button>
          ))}
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {lightbox !== null && (
            <motion.div
              className="fixed inset-0 z-[200] flex items-center justify-center bg-charcoal/92"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              onClick={closeLightbox}
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              {/* Image */}
              <motion.img
                key={lightbox}
                src={project.gallery[lightbox]}
                alt={`${project.title} — ${lightbox + 1}`}
                className="max-h-[90vh] max-w-[90vw] object-contain select-none"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                onClick={(e) => e.stopPropagation()}
              />

              {/* Prev — desktop only; mobile uses swipe */}
              {project.gallery.length > 1 && (
                <button
                  onClick={(e) => { e.stopPropagation(); prevImage(); }}
                  className="hidden sm:flex absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 items-center justify-center w-11 h-11 text-ivory/60 hover:text-ivory transition-colors duration-300"
                  aria-label="Previous image"
                >
                  <span className="block h-px w-8 bg-current rotate-[135deg] origin-right translate-y-[3px]" />
                  <span className="block h-px w-8 bg-current -rotate-[135deg] origin-right -translate-y-[3px]" />
                </button>
              )}

              {/* Next — desktop only; mobile uses swipe */}
              {project.gallery.length > 1 && (
                <button
                  onClick={(e) => { e.stopPropagation(); nextImage(); }}
                  className="hidden sm:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 items-center justify-center w-11 h-11 text-ivory/60 hover:text-ivory transition-colors duration-300"
                  aria-label="Next image"
                >
                  <span className="block h-px w-8 bg-current -rotate-[45deg] origin-left translate-y-[3px]" />
                  <span className="block h-px w-8 bg-current rotate-[45deg] origin-left -translate-y-[3px]" />
                </button>
              )}

              {/* Close */}
              <button
                onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
                className="absolute top-6 right-6 lg:top-8 lg:right-8 text-ivory/50 hover:text-ivory transition-colors duration-300 w-11 h-11 flex items-center justify-center"
                aria-label="Close"
              >
                <span className="block w-5 h-px bg-current rotate-45 translate-y-px" />
                <span className="block w-5 h-px bg-current -rotate-45 -translate-y-px absolute" />
              </button>

              {/* Bottom: counter + swipe hint on mobile */}
              <div className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none">
                <p className="label-caps-sm text-ivory/30 tracking-[0.3em]" style={{ fontSize: '8px' }}>
                  {lightbox + 1} / {project.gallery.length}
                </p>
                {project.gallery.length > 1 && (
                  <p className="sm:hidden label-caps-sm text-ivory/20 tracking-[0.25em]" style={{ fontSize: '7px' }}>
                    Swipe to navigate
                  </p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

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
