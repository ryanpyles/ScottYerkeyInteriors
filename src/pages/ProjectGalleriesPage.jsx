
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EditorialProjectSection from '@/components/EditorialProjectSection';
import { projects } from '@/data/projects'; // Using the structured data ensuring image utility mapping works flawlessly

const ProjectGalleriesPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Sort projects sequentially as defined in the data
  const sortedProjects = [...projects].sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Helmet>
        <title>Portfolio | Scott Arthur Yerkey Interiors</title>
        <meta name="description" content="Explore our complete archive of distinct residential spaces." />
      </Helmet>

      <Header />

      <main className="flex-grow pt-24 md:pt-32">
        {/* Page Title */}
        <section className="px-6 md:px-12 lg:px-24 mb-16 md:mb-24 text-center md:text-left max-w-[1800px] mx-auto">
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-foreground mb-6 tracking-tight">
            Selected Works
          </h1>
          <p className="font-sans text-sm md:text-base text-muted-foreground uppercase tracking-[0.2em]">
            An archive of distinct residential spaces
          </p>
        </section>

        {/* Editorial Project Sections */}
        <div className="w-full border-t border-border/40">
          {sortedProjects.map((project, index) => (
            <EditorialProjectSection 
              key={project.slug} 
              project={project} 
              index={index} 
            />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProjectGalleriesPage;
