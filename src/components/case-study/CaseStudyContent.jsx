import React from 'react';

const CaseStudyContent = ({ project }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
      
      <div className="lg:col-span-8 space-y-12 sm:space-y-16">
        <section aria-labelledby="project-overview">
          <h2 id="project-overview" className="font-sans text-2xl sm:text-3xl font-medium text-[#1B1B1B] mb-6 tracking-tight">Project Overview</h2>
          <p className="text-base sm:text-lg lg:text-xl text-[#1B1B1B]/80 leading-relaxed font-sans">
            {project.overview || project.description}
          </p>
        </section>

        {project.designApproach && (
          <section aria-labelledby="design-approach">
            <h2 id="design-approach" className="font-sans text-2xl sm:text-3xl font-medium text-[#1B1B1B] mb-6 tracking-tight">Design Approach</h2>
            <p className="text-base sm:text-lg lg:text-xl text-[#1B1B1B]/80 leading-relaxed font-sans">
              {project.designApproach}
            </p>
          </section>
        )}

        {project.keyFeatures && project.keyFeatures.length > 0 && (
          <section aria-labelledby="key-features">
            <h2 id="key-features" className="font-sans text-2xl sm:text-3xl font-medium text-[#1B1B1B] mb-6 tracking-tight">Key Features</h2>
            <ul className="space-y-4">
              {project.keyFeatures.map((feature, i) => (
                <li key={i} className="text-base sm:text-lg lg:text-xl text-[#1B1B1B]/80 leading-relaxed font-sans flex items-start">
                  <span className="text-[#8C7A5A] mr-4 text-sm sm:text-base mt-1.5 font-medium min-w-[1.5rem]" aria-hidden="true">
                    {(i + 1).toString().padStart(2, '0')}
                  </span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>

      <aside className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-[#1B1B1B]/10 pt-12 lg:pt-0 lg:pl-12 space-y-8 sm:space-y-10" aria-label="Project Details">
        <div>
          <h3 className="text-xs uppercase tracking-widest text-[#1B1B1B]/60 mb-2 font-medium">Location</h3>
          <p className="text-base sm:text-lg text-[#1B1B1B] font-medium">{project.location}</p>
        </div>

        {project.client && (
          <div>
            <h3 className="text-xs uppercase tracking-widest text-[#1B1B1B]/60 mb-2 font-medium">Client</h3>
            <p className="text-base sm:text-lg text-[#1B1B1B] font-medium">{project.client}</p>
          </div>
        )}

        {project.scope && (
          <div>
            <h3 className="text-xs uppercase tracking-widest text-[#1B1B1B]/60 mb-2 font-medium">Scope</h3>
            <p className="text-base sm:text-lg text-[#1B1B1B] font-medium">{project.scope}</p>
          </div>
        )}

        {project.materials && (
          <div>
            <h3 className="text-xs uppercase tracking-widest text-[#1B1B1B]/60 mb-2 font-medium">Materials</h3>
            <p className="text-base sm:text-lg text-[#1B1B1B] font-medium leading-relaxed">{project.materials}</p>
          </div>
        )}

        {project.style && (
          <div>
            <h3 className="text-xs uppercase tracking-widest text-[#1B1B1B]/60 mb-2 font-medium">Style</h3>
            <p className="text-base sm:text-lg text-[#1B1B1B] font-medium">{project.style}</p>
          </div>
        )}
      </aside>

    </div>
  );
};

export default CaseStudyContent;