import React, { createContext, useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { caseStudiesData } from '@/data/caseStudiesData';

const CaseStudyContext = createContext();

export const CaseStudyProvider = ({ children }) => {
  const navigate = useNavigate();

  const openModal = useCallback((indexOrId) => {
    let project;
    if (typeof indexOrId === 'number') {
      project = caseStudiesData[indexOrId];
    } else {
      project = caseStudiesData.find(p => p.id === indexOrId);
    }
    
    if (project) {
      navigate(`/project/${project.id}`);
    }
  }, [navigate]);

  const closeModal = useCallback(() => {
    navigate('/');
  }, [navigate]);

  const nextProject = useCallback((currentId) => {
    const index = caseStudiesData.findIndex(p => p.id === currentId);
    if (index === -1) return;
    const nextIndex = (index + 1) % caseStudiesData.length;
    navigate(`/project/${caseStudiesData[nextIndex].id}`);
  }, [navigate]);

  const previousProject = useCallback((currentId) => {
    const index = caseStudiesData.findIndex(p => p.id === currentId);
    if (index === -1) return;
    const prevIndex = (index - 1 + caseStudiesData.length) % caseStudiesData.length;
    navigate(`/project/${caseStudiesData[prevIndex].id}`);
  }, [navigate]);

  const value = {
    openModal,
    closeModal,
    nextProject,
    previousProject,
    caseStudiesData,
    isOpen: false, // Legacy support
    currentProject: null // Legacy support
  };

  return (
    <CaseStudyContext.Provider value={value}>
      {children}
    </CaseStudyContext.Provider>
  );
};

export const useProjectNavigation = () => {
  const context = useContext(CaseStudyContext);
  if (context === undefined) {
    throw new Error('useProjectNavigation must be used within a CaseStudyProvider');
  }
  return context;
};