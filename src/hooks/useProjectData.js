
import { useState, useEffect } from 'react';
import { projects } from '@/data/projects';

export const useProjectData = (slug) => {
  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    try {
      const foundProject = projects.find(p => p.slug === slug);
      if (foundProject) {
        setProject(foundProject);
      } else {
        setError('Project not found');
      }
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }, [slug]);

  return { project, isLoading, error };
};
