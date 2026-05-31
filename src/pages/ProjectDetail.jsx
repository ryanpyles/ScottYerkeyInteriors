
import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useProjectData } from '@/hooks/useProjectData';
import { getProjectImageUrl } from '@/lib/imageUtils';

const ProjectDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { project, isLoading, error } = useProjectData(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') navigate('/projects');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate, slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-foreground border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center flex-col">
          <h1 className="font-serif text-3xl mb-8">Project Not Found</h1>
          <Link to="/projects" className="font-sans text-xs uppercase tracking-[0.2em] border-b border-foreground pb-1">
            Return to Portfolio
          </Link>
        </div>
      </div>
    );
  }

  const heroUrl = getProjectImageUrl(project.folder, project.heroImage);
  const canonicalUrl = `https://scottarthuryerkey.com/projects/${project.slug}`;

  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Helmet>
        <title>{`${project.title} | Scott Arthur Yerkey`}</title>
        <meta name="description" content={project.description} />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>

      <Header />

      <main className="flex-grow pt-20 md:pt-24 pb-24 md:pb-32">
        {/* Full-width Hero Image */}
        <section className="w-full h-[60vh] md:h-[80vh] relative mb-16 md:mb-32 bg-muted">
          <motion.img 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            src={heroUrl}
            alt={`${project.title} Hero View`}
            className="w-full h-full object-cover object-center"
            fetchPriority="high"
          />
        </section>

        {/* Project Header Text */}
        <section className="max-w-[1200px] mx-auto px-6 md:px-12 text-center mb-24 md:mb-32">
          <span className="font-sans text-[10px] md:text-xs text-muted-foreground uppercase tracking-[0.3em] mb-6 block">
            {project.location}
          </span>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-foreground mb-12 tracking-tight leading-tight">
            {project.title}
          </h1>
          <p className="font-sans text-lg md:text-xl text-foreground/80 leading-[2] max-w-3xl mx-auto">
            {project.description}
          </p>
        </section>

        {/* Editorial Image Gallery */}
        <section className="max-w-[1600px] mx-auto px-6 md:px-12">
          <div className="columns-1 md:columns-2 gap-8 md:gap-16 space-y-8 md:space-y-16">
            {project.galleryImages.map((image, idx) => (
              <div key={idx} className="break-inside-avoid">
                <img
                  src={getProjectImageUrl(project.folder, image)}
                  alt={`${project.title} Detail ${idx + 1}`}
                  loading="lazy"
                  className="w-full h-auto object-cover transition-transform duration-[2s] ease-out hover:scale-[1.01]"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Navigation Footer */}
        <section className="max-w-[1200px] mx-auto px-6 md:px-12 text-center mt-32">
          <Link 
            to="/projects" 
            className="group inline-flex items-center font-sans text-xs uppercase tracking-[0.2em] text-foreground hover:text-muted-foreground transition-colors"
          >
            <ArrowLeft className="mr-4 w-4 h-4 transition-transform duration-500 ease-out group-hover:-translate-x-2" />
            Back to Selected Works
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ProjectDetail;
