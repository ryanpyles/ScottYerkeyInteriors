import React, { useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useProjectNavigation } from '@/contexts/CaseStudyContext';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import PortfolioTabs from '@/components/case-study/PortfolioTabs';

const ProjectGalleryPage = () => {
  const { id } = useParams();
  const { caseStudiesData, nextProject, previousProject } = useProjectNavigation();
  const navigate = useNavigate();

  const project = caseStudiesData.find(p => p.id === id);

  useEffect(() => {
    if (!project) {
      navigate('/');
      return;
    }
    window.scrollTo(0, 0);
  }, [project, navigate, id]);

  const galleryItems = useMemo(() => {
    if (!project) return [];
    
    const rawImages = project.images || project.gallery || [];
    const imagesWithCover = [...rawImages];
    if (!imagesWithCover.length && project.coverImage) {
        imagesWithCover.push({ url: project.coverImage });
    }

    const items = [];
    
    // First element: Cover/Hero with main details overlay
    if (imagesWithCover[0]) {
        const details = [];
        if (project.client) details.push({ label: 'Client', value: project.client });
        if (project.scope) details.push({ label: 'Scope', value: project.scope });
        if (project.style) details.push({ label: 'Style', value: project.style });
        if (project.materials) details.push({ label: 'Materials', value: project.materials });

        items.push({
            image: project.coverImage || imagesWithCover[0].url || imagesWithCover[0],
            title: project.title,
            description: project.overview || project.description,
            details: details
        });
    }

    // Second element: Design Approach overlay
    if (imagesWithCover[1]) {
        items.push({
            image: imagesWithCover[1].url || imagesWithCover[1],
            title: project.designApproach ? "Design Approach" : null,
            description: project.designApproach || null,
        });
    }

    // Third element: Key features overlay
    if (imagesWithCover[2] && project.keyFeatures && project.keyFeatures.length > 0) {
        const featureString = project.keyFeatures.map((f, i) => `${i + 1}. ${f}`).join('  |  ');
        items.push({
            image: imagesWithCover[2].url || imagesWithCover[2],
            title: "Key Features",
            description: featureString,
        });
    } else if (imagesWithCover[2]) {
        items.push({ image: imagesWithCover[2].url || imagesWithCover[2] });
    }

    // Remaining standard image items
    for (let i = 3; i < imagesWithCover.length; i++) {
         items.push({ image: imagesWithCover[i].url || imagesWithCover[i] });
    }

    return items;
  }, [project]);

  if (!project) return null;

  return (
    <main className="bg-[#1B1B1B] min-h-screen relative w-full overflow-x-hidden">
      <Helmet>
        <title>{`${project.title} | Immersive Gallery | Scott Arthur Yerkey`}</title>
        <meta name="description" content={project.overview || project.description} />
      </Helmet>

      {/* Fixed Navigation Overlay */}
      <div className="fixed top-0 left-0 w-full z-[100] p-4 sm:p-6 flex justify-between items-center pointer-events-none">
        <nav className="pointer-events-auto flex gap-2 sm:gap-3 bg-black/20 backdrop-blur-md p-1.5 rounded-full border border-white/10 hover:bg-black/40 transition-colors" aria-label="Project Navigation">
          <button 
            onClick={() => previousProject(project.id)}
            className="p-2 sm:p-2.5 text-white hover:text-white/80 transition-colors focus-visible:ring-2 focus-visible:ring-white rounded-full outline-none"
            aria-label="View previous project"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
          </button>
          <button 
            onClick={() => nextProject(project.id)}
            className="p-2 sm:p-2.5 text-white hover:text-white/80 transition-colors focus-visible:ring-2 focus-visible:ring-white rounded-full outline-none"
            aria-label="View next project"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
          </button>
        </nav>

        <button 
          onClick={() => navigate('/')}
          className="pointer-events-auto p-2.5 sm:p-3 bg-black/20 backdrop-blur-md text-white hover:bg-black/40 rounded-full transition-colors border border-white/10 focus-visible:ring-2 focus-visible:ring-white outline-none"
          aria-label="Close gallery"
        >
          <X className="w-6 h-6 sm:w-7 sm:h-7" aria-hidden="true" />
        </button>
      </div>

      <PortfolioTabs residencesItems={galleryItems} />

      {/* Footer Navigation */}
      <div className="bg-[#F4F2EE] py-24 sm:py-32 flex flex-col items-center justify-center text-center px-4 relative z-20 border-t border-[#1B1B1B]/10">
        <button 
          onClick={() => nextProject(project.id)}
          className="group flex flex-col items-center hover:opacity-70 transition-opacity focus-visible:ring-2 focus-visible:ring-offset-8 focus-visible:ring-[#8C7A5A] rounded-sm outline-none p-4"
          aria-label="Continue exploring the next case study project"
        >
          <span className="text-xs sm:text-sm uppercase tracking-widest text-[#8C7A5A] mb-4 font-medium" aria-hidden="true">Next Project</span>
          <span className="text-3xl sm:text-4xl lg:text-5xl font-sans font-semibold text-[#1B1B1B] flex items-center gap-4">
            Continue Exploring
            <ChevronRight className="w-8 h-8 lg:w-10 lg:h-10 group-hover:translate-x-2 transition-transform" aria-hidden="true" />
          </span>
        </button>
      </div>
    </main>
  );
};

export default ProjectGalleryPage;