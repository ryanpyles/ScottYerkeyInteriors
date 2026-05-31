
import React, { useMemo } from 'react';
import { projects } from '@/data/projects';
import ProjectCard from './ProjectCard';

const PortfolioGrid = ({ featuredOnly = false }) => {
  const displayProjects = useMemo(() => {
    let filtered = featuredOnly 
      ? projects.filter(p => p.featured) 
      : projects;
      
    return filtered.sort((a, b) => a.sortOrder - b.sortOrder);
  }, [featuredOnly]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
      {displayProjects.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </div>
  );
};

export default PortfolioGrid;
