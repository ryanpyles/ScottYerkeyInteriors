import React from 'react';

const CaseStudyHeader = ({ project }) => {
  return (
    <div className="mb-12 sm:mb-16 lg:mb-20">
      <p className="text-[#8C7A5A] font-medium tracking-widest uppercase text-xs sm:text-sm font-sans mb-4">
        {project.location}
      </p>
      <h1 className="font-sans font-semibold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-[#1B1B1B] tracking-tight leading-tight">
        {project.title}
      </h1>
    </div>
  );
};

export default CaseStudyHeader;