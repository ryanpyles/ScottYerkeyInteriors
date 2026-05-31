
import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { caseStudiesData } from '@/data/caseStudiesData';
import { useProjectNavigation } from '@/contexts/CaseStudyContext';

function useParallax(value, distance) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

const MobileProjectCard = ({ project, index, onOpenProject }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ 
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useParallax(scrollYProgress, 20); 

  return (
    <article 
      ref={ref}
      id={`${project.id}-mobile`}
      className="project-card flex flex-col justify-start pb-20 relative"
    >
      <div className="sticky top-[70px] z-[40] bg-[var(--warm-off-white)]/95 backdrop-blur-sm pt-4 pb-4 px-4 sm:px-8 shadow-sm w-full">
        <p className="text-brass font-normal tracking-wide uppercase text-xs sm:text-sm font-sans mb-1">
          {project.location}
        </p>
        <h3 className="font-serif font-normal text-2xl sm:text-3xl text-charcoal tracking-[-0.02em] leading-[1.1]">
          {project.title}
        </h3>
      </div>

      <div className="px-4 sm:px-8 pt-8 relative z-10 flex flex-col h-full w-full">
        <motion.button 
          initial={{ clipPath: "inset(100% 0 0 0)", opacity: 0 }}
          whileInView={{ clipPath: "inset(0% 0 0 0)", opacity: 1 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-[65vh] min-h-[400px] mb-8 relative overflow-hidden rounded-sm shadow-sm bg-warm-border cursor-pointer group focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-2 outline-none block"
          onClick={() => onOpenProject(index)}
          aria-label={`View full case study for ${project.title}`}
        >
          <motion.div style={{ y, willChange: "transform" }} className="w-full h-[115%] -top-[7.5%] absolute">
            <img 
              src={project.coverImage} 
              alt={`${project.title} - ${project.location}`}
              className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-105"
              loading="lazy"
            />
          </motion.div>
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 pointer-events-none" />
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-left relative z-10"
        >
          <p className="text-sm sm:text-base text-charcoal/70 leading-relaxed font-sans mb-6 font-light">
            {project.description}
          </p>
          
          <button
            onClick={() => onOpenProject(index)}
            className="inline-flex items-center text-charcoal font-normal group/btn font-sans text-xs sm:text-sm p-2 -ml-2 hover:text-brass transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brass rounded-sm outline-none tracking-widest uppercase"
          >
            View Project 
            <svg className="w-4 h-4 ml-2 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </motion.div>
      </div>
    </article>
  );
};

const SelectedWorkSection = () => {
  const [activeProject, setActiveProject] = useState(caseStudiesData[0].id);
  const sectionRef = useRef(null);
  const { openModal } = useProjectNavigation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveProject(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: '-40% 0px -40% 0px', 
        threshold: 0
      }
    );

    const projectElements = document.querySelectorAll('.project-card-desktop');
    projectElements.forEach((el) => observer.observe(el));

    return () => {
      projectElements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, []);

  return (
    <section ref={sectionRef} id="residences" className="relative bg-warm-off-white w-full min-h-screen">
      <div className="flex flex-col lg:flex-row w-full max-w-[2000px] mx-auto h-full">
        
        {/* Left Side: Scrollable Titles and Descriptions */}
        <div className="w-full lg:w-1/2 flex flex-col py-16 sm:py-24 lg:py-0 h-full">
          
          <div className="px-4 sm:px-8 lg:px-16 xl:px-24 lg:py-32 w-full max-w-2xl lg:ml-auto h-full">
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-16 lg:mb-32 text-center lg:text-left"
            >
              <h2 className="font-serif font-normal text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-charcoal mb-4 sm:mb-6 tracking-[-0.02em] leading-[1.1]">
                Selected<br className="hidden lg:block"/> Residences
              </h2>
              <p className="text-sm sm:text-base text-charcoal/80 font-sans font-light leading-relaxed">
                Residences shaped by proportion, texture, and disciplined restraint.
              </p>
            </motion.div>

            <div className="space-y-0 lg:space-y-0 h-full">
              {caseStudiesData.map((project, index) => (
                <React.Fragment key={project.id}>
                  {/* Mobile Layout */}
                  <div className="lg:hidden block w-full h-full">
                    <MobileProjectCard 
                      project={project} 
                      index={index} 
                      onOpenProject={openModal} 
                    />
                  </div>

                  {/* Desktop Layout */}
                  <article 
                    id={project.id}
                    className="project-card-desktop hidden lg:flex flex-col justify-center min-h-[70vh] py-12 w-full"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="text-left w-full"
                    >
                      <p className="text-brass font-normal tracking-wider uppercase text-xs font-sans mb-4">
                        {project.location}
                      </p>
                      <h3 className="font-serif font-normal text-4xl xl:text-5xl text-charcoal tracking-[-0.02em] leading-[1.1] mb-6">
                        {project.title}
                      </h3>
                      <div className="h-[1px] w-12 bg-charcoal/20 mb-8" aria-hidden="true" />
                      <p className="text-base text-charcoal/70 leading-relaxed font-sans font-light mb-10 max-w-lg">
                        {project.description}
                      </p>
                      
                      <button
                        onClick={() => openModal(index)}
                        className="inline-flex items-center text-charcoal font-normal group/btn font-sans text-xs tracking-widest uppercase p-2 pl-0 hover:text-brass transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brass rounded-sm outline-none"
                      >
                        View Project 
                        <svg className="w-4 h-4 ml-3 transition-transform duration-300 group-hover/btn:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </button>
                    </motion.div>
                  </article>
                </React.Fragment>
              ))}
            </div>
            
            <div className="hidden lg:block h-[30vh]" aria-hidden="true"></div>
          </div>
        </div>

        {/* Right Side: Sticky Full-Height Images with elegant scroll mask transition */}
        <div className="hidden lg:block w-1/2 h-[100vh] min-h-[100vh] sticky top-0 overflow-hidden bg-warm-border">
          <AnimatePresence>
            {caseStudiesData.map((project, index) => (
              activeProject === project.id && (
                <motion.button
                  key={`${project.id}-img`}
                  initial={{ clipPath: "inset(100% 0 0 0)", opacity: 0.5, scale: 1.05 }}
                  animate={{ clipPath: "inset(0% 0 0 0)", opacity: 1, scale: 1 }}
                  exit={{ clipPath: "inset(0 0 100% 0)", opacity: 0.5, scale: 1.02 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 w-full h-full min-h-[100vh] cursor-pointer block focus-visible:ring-inset focus-visible:ring-4 focus-visible:ring-brass outline-none group"
                  onClick={() => openModal(index)}
                  aria-label={`Open ${project.title} case study gallery`}
                >
                  <img
                    src={project.coverImage}
                    alt={`${project.title} - ${project.location}`}
                    className="w-full h-full min-h-[100vh] object-cover object-center transition-transform duration-[2s] group-hover:scale-105"
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 w-full h-full min-h-[100vh]" />
                  
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none w-full h-full min-h-[100vh]">
                    <span className="bg-white/95 backdrop-blur-sm text-charcoal px-8 py-3 rounded-full font-sans font-normal uppercase tracking-widest text-xs shadow-xl transform transition-transform duration-500 group-hover:scale-105">
                      View Project
                    </span>
                  </div>
                </motion.button>
              )
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};

export default SelectedWorkSection;
