
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getProjectImageUrl } from '@/lib/imageUtils';

const EditorialProjectSection = ({ project, index }) => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  // Subtle parallax effect on the image
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"]
  });
  
  // Image translates slightly slower than the scroll speed (factor ~0.2)
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  const heroUrl = getProjectImageUrl(project.folder, project.heroImage);

  return (
    <section 
      ref={containerRef}
      className="relative flex flex-col md:flex-row w-full min-h-screen border-b border-border/40 bg-background"
    >
      {/* Left Column: Text Content (Scrolls naturally) */}
      <div className="w-full md:w-[45%] lg:w-[40%] flex flex-col justify-center px-8 py-24 md:py-32 lg:p-24 md:min-h-[120vh]">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-xl mx-auto md:mx-0"
        >
          <span className="font-sans text-muted-foreground text-[10px] md:text-xs uppercase tracking-[0.3em] mb-8 block">
            0{index + 1} — {project.location}
          </span>
          
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-8 leading-tight">
            {project.title}
          </h2>
          
          <p className="font-sans text-base md:text-lg text-foreground/70 leading-loose mb-12 max-w-md">
            {project.description}
          </p>
          
          <Link 
            to={`/projects/${project.slug}`} 
            className="group inline-flex items-center font-sans text-xs uppercase tracking-[0.2em] text-foreground hover:text-muted-foreground transition-colors"
          >
            Explore Project
            <ArrowRight className="ml-4 w-4 h-4 transition-transform duration-500 ease-out group-hover:translate-x-2" />
          </Link>
        </motion.div>
      </div>

      {/* Right Column: Sticky Image */}
      <div className="w-full md:w-[55%] lg:w-[60%] h-[70vh] md:h-screen md:sticky md:top-0 overflow-hidden bg-muted relative">
        <motion.div 
          ref={imageRef}
          className="absolute inset-0 w-full h-[120%] -top-[10%]"
          style={{ y }}
        >
          <img 
            src={heroUrl} 
            alt={project.title} 
            className="w-full h-full object-cover object-center transition-transform duration-[2s] hover:scale-[1.02] ease-out"
            loading={index === 0 ? "eager" : "lazy"}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default EditorialProjectSection;
